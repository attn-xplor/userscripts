// ==UserScript==
// @name        Azure DevOps
// @namespace   https://github.com/attn-xplor/userscripts
// @match       https://dev.azure.com/xplortechnologies/Nexus/_build/results*
// @grant       GM.registerMenuCommand
// @grant       GM.setClipboard
// @version     1.0.0
// @author      Ismael Lopez
// ==/UserScript==

GM.registerMenuCommand('Get Markdown Link', () => {
  const pipeline = document.querySelector('.bolt-header-title span')?.outerText;
  const url = window.location.href;
  const markdown = `[${pipeline}](${url})`;
  GM.setClipboard(markdown);
});