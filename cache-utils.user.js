// ==UserScript==
// @name        Cache Utilities
// @namespace   https://github.com/attn-xplor/userscripts
// @match       https://my*.clearent.net/ui/*
// @match       http://localhost:4200/*
// @grant       GM.registerMenuCommand
// @version     1.1
// @author      Ismael Lopez
// ==/UserScript==

GM.registerMenuCommand('Clear Session', () => {
  sessionStorage.clear();
});

GM.registerMenuCommand('Clear Local', () => {
  clearLocalCache();
});

GM.registerMenuCommand('Clear All', () => {
  sessionStorage.clear();
  clearLocalCache();
});

function clearLocalCache() {
  try {
    const exclusions = [
      'import-map-override:merchant-home-header',
      'import-map-override:merchant-home-virtual-terminal',
      'import-map-override:merchant-virtual-terminal',
      'import-map-override:merchant-web-application',
      'import-map-override:merchant-ticketing-automation-ui',
      'import-map-override:notification-preferences-ui',
      'import-map-overrides-disabled',
      'TanstackQueryDevtools.open',
      'TanstackQueryDevtools.pip_open',
      'TanstackQueryDevtools.theme_preference',
    ];

    const mem = [];
    for (const key of exclusions) {
      const value = localStorage.getItem(key);
      if (value) {
        mem.push({key: key, value: value});
      }
    }

    localStorage.clear();

    for (const {key, value} of mem) {
      localStorage.setItem(key, value);
    }
  } catch (error) {
    console.error(error);
  }
}