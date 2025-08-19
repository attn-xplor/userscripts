// ==UserScript==
// @name        HNK Utilities
// @namespace   https://github.com/attn-xplor/userscripts
// @match       https://my*.clearent.net/ui/*
// @match       http://localhost:4200/*
// @grant       GM.registerMenuCommand
// @grant       GM.setClipboard
// @version     1.0
// @author      Ismael J Lopez
// @description 8/19/2025, 12:08:00 PM
// ==/UserScript==

GM.registerMenuCommand('Copy HNK', () => {
  const el = document.getElementById('merchantData');
  const parts = el.textContent.split(' - ');
  const hnk = parts.at(-1);
  if (!hnk) {
    alert('Could not get HNK');
    return;
  }
  GM.setClipboard(hnk);
});

GM.registerMenuCommand('Copy DBA', () => {
  const el = document.getElementById('merchantData');
  const parts = el.textContent.split(' - ');
  const name = parts.slice(0, -1).join(' - ');
  if (!name) {
    alert('Could not get DBA');
    return;
  }
  GM.setClipboard(name);
});

GM.registerMenuCommand('Copy Name & HNK', () => {
  const el = document.getElementById('merchantData');
  const parts = el.textContent.split(' - ');
  const name = parts.slice(0, -1);
  const hnk = '`' + parts.at(-1) + '`';
  const newParts = [...name, hnk];
  const reconstructed = newParts.join(' - ');
  if (!reconstructed) {
    alert('Could not get element text');
    return;
  }
  GM.setClipboard(reconstructed);
});