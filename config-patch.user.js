// ==UserScript==
// @name        Config Patch
// @namespace   https://github.com/attn-xplor/userscripts
// @match       https://my-qa.clearent.net/*
// @match       https://my.clearent.net/*
// @match       http://localhost:4200/*
// @grant       GM.registerMenuCommand
// @grant       GM.setValue
// @grant       GM.getValue
// @version     1.1.1
// @author      Andrew Neth
// @run-at      document-start
// @require     https://raw.githubusercontent.com/LaNsHoR/native-json-editor/df52f26a908127f1f91cae9793aae6b754a2bbfb/json-editor.js
// ==/UserScript==

'use strict';

GM.registerMenuCommand('Edit patch data', showModal);

function toDom(html) {
  const range = document.createRange();
  range.setStart(document.body, 0);
  return range.createContextualFragment(html);
}

async function getPatch() {
  return await GM.getValue('CONFIG_PATCH', {});
}

async function showModal() {
  const dialog = toDom(`
    <dialog style="width: 50vw; max-height: 80vh; padding: 1em; border: none; box-shadow: 0px 5px 35px 10px #0000007f; border-radius: 5px;">
      <json-editor spellcheck="false" style="width: 100%; height: auto; margin-bottom: 0.5em; border-radius: 5px;"></json-editor>
      <div style="display: flex; gap: 0.5em;">
        <span style="color: red; flex-grow: 1;"></span>
        <button>Cancel</button>
        <button>Save</button>
      </div>
    </dialog>
  `).firstElementChild;

  // The `editor.json_value` assignment doesn't work until the dialog is inserted,
  // but we wait until the very end to actually .show() the dialog.
  document.body.appendChild(dialog);

  const editor = dialog.firstElementChild;
  const [errorMsg, cancelButton, saveButton] = dialog.lastElementChild.children;

  editor.json_value = await getPatch();

  editor.onkeyup = () => {
    if (editor.is_valid()) {
      errorMsg.innerText = '';
      return;
    }
    try {
      JSON.parse(editor.raw_string);
      errormsg.textContent = 'Invalid JSON (unknown error?)';
    } catch (error) {
      let msg = error.toString();
      msg = msg.replace('SyntaxError: JSON.parse: ', '');
      msg = msg[0].toUpperCase() + msg.slice(1);
      errorMsg.textContent = msg;
    }
  };

  const save = async () => {
    if (!editor.is_valid()) {
      alert('Invalid JSON!');
      return;
    }
    await GM.setValue('CONFIG_PATCH', editor.json_value);
    dialog.close();
  };

  const initialValue = editor.raw_string;
  const cancel = () => {
    if (editor.raw_string !== initialValue) {
      if (!confirm('Discard unsaved changes?')) {
        return;
      }
    }
    dialog.close();
  };

  cancelButton.onclick = cancel;
  saveButton.onclick = save;

  dialog.onkeydown = (event) => {
    if (event.key === 's' && event.ctrlKey) {
      save();
      event.preventDefault();
    } else if (event.key === 'Escape') {
      cancel();
    }
  };

  dialog.onclick = (e) => {
    const rect = dialog.getBoundingClientRect();
    if (
      e.clientY < rect.top || e.clientY > rect.top + rect.height ||
      e.clientX < rect.left || e.clientX > rect.left + rect.width
    ) {
      cancel();
    }
  };

  dialog.onclose = () => dialog.remove(); // whenever the dialog is closed, delete it from the DOM
  dialog.showModal();
  editor.shadowRoot.getElementById('editor').focus();
}

function typeOf(v) {
  if (Array.isArray(v)) return 'array';
  if (v === null) return 'null';
  return typeof v;
}

function merge(original, patch, path) {
  const oType = typeOf(original);
  const pType = typeOf(patch);

  if (oType === 'array' && pType === 'object') {
    let merged = [...original];
    if (Array.isArray(patch.prepend)) {
      merged = [...patch.prepend, ...merged];
    }
    if (Array.isArray(patch.append)) {
      merged = [...merged, ...patch.append];
    }
    return merged;
  }

  if (oType === 'object' && pType === 'object') {
    const merged = {};
    const keys = new Set([...Object.keys(original), ...Object.keys(patch)]);
    for (const key of keys) {
      if (Object.hasOwn(original, key) && Object.hasOwn(patch, key)) {
        merged[key] = merge(original[key], patch[key], [...path, key]);
      } else if (Object.hasOwn(original, key)) {
        merged[key] = original[key];
      } else {
        merged[key] = patch[key];
      }
    }
    return merged;
  }

  return patch;
}

const actualFetch = window.fetch;
unsafeWindow.fetch = async (...args) => {
  const response = await actualFetch(...args);
  if (typeof args[0] !== 'object' || !args[0].url.endsWith('ClientConfig.json')) {
    return response;
  }

  const original = await response.json();
  let body;
  try {
    const patch = await getPatch();
    body = merge(original, patch, []);
  } catch (e) {
    console.error('[DEV] Failed to apply config patch', e);
    body = original;
  }

  // Reconstruct the response because we already consumed the body of the original response object.
  const { status, statusText, headers } = response;
  const options = { status, statusText, headers };
  return new Response(JSON.stringify(body), options);
}
