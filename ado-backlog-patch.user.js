// ==UserScript==
// @name        ADO | Backlog Patch
// @namespace   https://github.com/attn-xplor/userscripts
// @version     1.0.0
// @match       https://dev.azure.com/xplortechnologies/Nexus/_sprints/backlog/*
// @grant       GM.registerMenuCommand
// @grant       GM.setValue
// @grant       GM.getValue
// @author      Ismael J Lopez
// @description Performs DOM string replacements in the Sprint Backlog view of Azure DevOps.
// @require     https://raw.githubusercontent.com/LaNsHoR/native-json-editor/df52f26a908127f1f91cae9793aae6b754a2bbfb/json-editor.js
// @run-at      document-end
// ==/UserScript==

"use strict";

function waitFor(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    observer.observe(window.document.body, {
      childList: true,
      subtree: true,
    });
  });
}

async function patch(original, replacement) {
  await waitFor("table.backlog-tree");
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (node.textContent.includes(original)) {
      node.textContent = node.textContent.replaceAll(original, replacement);
    }
  }
}

GM.registerMenuCommand("Edit Patch", showModal);

function toDom(html) {
  const range = document.createRange();
  range.setStart(document.body, 0);
  return range.createContextualFragment(html);
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
      errorMsg.innerText = "";
      return;
    }
    try {
      JSON.parse(editor.raw_string);
      errormsg.textContent = "Invalid JSON (unknown error?)";
    } catch (error) {
      let msg = error.toString();
      msg = msg.replace("SyntaxError: JSON.parse: ", "");
      msg = msg[0].toUpperCase() + msg.slice(1);
      errorMsg.textContent = msg;
    }
  };

  const save = async () => {
    if (!editor.is_valid()) {
      alert("Invalid JSON!");
      return;
    }
    await GM.setValue("SPRINT_VIEW_PATCH", editor.json_value);
    dialog.close();
  };

  const initialValue = editor.raw_string;
  const cancel = () => {
    if (editor.raw_string !== initialValue) {
      if (!confirm("Discard unsaved changes?")) {
        return;
      }
    }
    dialog.close();
  };

  cancelButton.onclick = cancel;
  saveButton.onclick = save;

  dialog.onkeydown = (event) => {
    if (event.key === "s" && event.ctrlKey) {
      save();
      event.preventDefault();
    } else if (event.key === "Escape") {
      cancel();
    }
  };

  dialog.onclick = (e) => {
    const rect = dialog.getBoundingClientRect();
    if (
      e.clientY < rect.top ||
      e.clientY > rect.top + rect.height ||
      e.clientX < rect.left ||
      e.clientX > rect.left + rect.width
    ) {
      cancel();
    }
  };

  dialog.onclose = () => dialog.remove(); // whenever the dialog is closed, delete it from the DOM
  dialog.showModal();
  editor.shadowRoot.getElementById("editor").focus();
}

async function getPatch() {
  return await GM.getValue("SPRINT_VIEW_PATCH", {});
}

async function run() {
  const overrides = await getPatch();
  for (const [original, replacement] of Object.entries(overrides)) {
    patch(original, replacement);
  }
}

run();
