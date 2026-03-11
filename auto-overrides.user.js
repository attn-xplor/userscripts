// ==UserScript==
// @name        Automatic override toggle
// @namespace   https://github.com/attn-xplor/userscripts
// @match       https://*.clearent.net/*
// @version     1.1.2
// @author      Andrew Neth
// ==/UserScript==

const imo = unsafeWindow.importMapOverrides;

async function checkMfe([mfe, url]) {
  const isEnabled = !imo.isDisabled(mfe);

  let isRunning;
  try {
    await fetch(url);
    isRunning = true;
  } catch (e) {
    isRunning = false;
  }

  if (isRunning != isEnabled) {
    isRunning ? imo.enableOverride(mfe) : imo.disableOverride(mfe);
    return true;
  } else {
    return false;
  }
}

async function main() {
  const importMap = imo.getOverrideMap(true);
  const promises = Object.entries(importMap.imports).map(checkMfe);
  const outcomes = await Promise.allSettled(promises);
  if (outcomes.some(o => o.value)) {
    location.reload();
  }
}

if (!!imo) {
  main();
}
