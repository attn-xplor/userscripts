// ==UserScript==
// @name        Okta Token
// @namespace   https://github.com/attn-xplor/userscripts
// @match       https://my*.clearent.net/ui/*
// @match       http://localhost:4200/*
// @grant       GM.registerMenuCommand
// @grant       GM.setClipboard
// @author      Ismael Lopez
// @version     1.0
// ==/UserScript==

GM.registerMenuCommand('Copy Token', () => {
  const key = (window.location.hostname === 'my.clearent.net')
    ? 'oidc.user:https://auth.clearent.net/oauth2/aus4ulyubshD7M0yf697:0oa6ggt30dFSxSVxX697'
    : 'oidc.user:https://auth-sb.clearent.net/oauth2/aus3a1kavt9qzEcsz1d7:0oa3a1ic7mGSRLqrZ1d7';
  const value = sessionStorage.getItem(key);
  if (!value) {
    alert(`Key '${key}' not found in session storage`);
    return;
  }
  GM.setClipboard(JSON.parse(value).access_token);
});