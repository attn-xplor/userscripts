# Xplor User Scripts

## Overview
Make your day a little easier. Once you have Violentmonkey installed, click on the links below to load an "Install" page for each user script.

## Requirements
Get the Violentmonkey userscript manager here: https://violentmonkey.github.io/get-it/
**Firefox is strongly recommended** due to its continued support for Manifest V2. Your mileage may vary with Chromium-based browsers other than Google Chrome.

## Scripts

### [Automatic override toggle](//github.com/attn-xplor/userscripts/raw/refs/heads/trunk/auto-overrides.user.js)
Automatically turns on Single Spa for any MFEs you are actively running locally. Uses the cached import map and checks if something is running on that port. Useful most of the time except for A-B testing, but that is why you can toggle it on/off in the first place.

### [Config Patch](//github.com/attn-xplor/userscripts/raw/refs/heads/trunk/config-patch.user.js)
Much like Network Overrides (supported by Chrome and Firefox), this script allows you overwrite properties within MerchantWebApplicationClientConfig. However, this user script does so as a *patch* - meaning you only have to specify properties you need overwritten. 

Cleaner than having to look through the entire config.

#### Usage
On any `*.clearent.net` subdomain, Violentmonkey's extension menu will have an `Edit patch data` menu item under the `Config Patch` heading.
This opens a modal where you can edit a JSON document that serves as the "patch".

The userscript will *merge* your patch with the main config: properties from the patch will replace values in the normal config when both are present.
(Sub-objects get merged recursively.)

### [Okta Utilities](//github.com/attn-xplor/userscripts/raw/refs/heads/trunk/okta-utils.user.js)
Copies your current Okta Access Token to your clipboard. Useful for Postman requests where you need a Bearer token.

### [Cache Utilities](//github.com/attn-xplor/userscripts/raw/refs/heads/trunk/cache-utils.user.js)
Utilities for clearing browser storage while leaving your module federation
application overrides (`MOD_FED_APPLICATION_OVERRIDES`) and TanStack Query Devtools
preferences intact. Use `Edit Local Exclusions` from the Violentmonkey menu to
preserve additional `localStorage` keys.

### [HNK Utilities](//github.com/attn-xplor/userscripts/raw/refs/heads/trunk/hnk-utils.user.js)
Merchant Portal's merchant selector makes it hard to copy the currently-selected
merchant's DBA and/or HNK. This script copies that information to your clipboard.

### [Jira](//github.com/attn-xplor/userscripts/raw/refs/heads/trunk/jira.user.js)
Copies the ticket number (e.g., ITSM-12345) and url as a markdown-friendly link to your clipboard. 
This is useful for our Merchant Portal MFE Pull Request templates.

### [Merchant Portal Debug Overlay](//github.com/attn-xplor/userscripts/raw/refs/heads/trunk/mp-debug-overlay.user.js)
A live debug overlay for Merchant Portal (`localhost:4200` and
`*.clearent.net`). It is meant to grow with whatever metrics or cache
state we need on-screen; today it only covers virtual-terminal (VT)
token information — the current need.

The VT view reads the selected terminal from the `xplor.*` session and
local storage caches (and compares them against the legacy cache
entries still written alongside them).

#### Usage
Drag the overlay to move it. Click it to cycle views: **compact** (`E`
expiry / `S` stale countdowns), **detail** (terminal name, expiry,
stale, and cache age), and **panel** (selected terminal, expandable
terminal list, timers, and legacy-cache match checks).

Position and view mode are remembered in `localStorage`. The status
dot turns amber under two minutes remaining and red once expired.