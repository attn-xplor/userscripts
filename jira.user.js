// ==UserScript==
// @name        Jira
// @namespace   https://github.com/attn-xplor/userscripts
// @match       https://xplortechnologies.atlassian.net/browse/ITSM-*
// @grant       GM.registerMenuCommand
// @grant       GM.setClipboard
// @version     1.0.0
// @author      Ismael Lopez
// ==/UserScript==

GM.registerMenuCommand('Get Markdown Link', () => {
  const ticket = window.location.pathname.split('/').at(-1);
  const url = window.location.href;
  const markdown = `[${ticket}](${url})`;
  GM.setClipboard(markdown);
});