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
Utilities for clearing the cache, but leaves Single Spa import overrides intact.

### [HNK Utilities](//github.com/attn-xplor/userscripts/raw/refs/heads/trunk/hnk-utils.user.js)
Merchant Portal's merchant selector makes it hard to copy the currently-selected
merchant's DBA and/or HNK. This script copies that information to your clipboard.

### [Azure DevOps](//github.com/attn-xplor/userscripts/raw/refs/heads/trunk/azure-devops.user.js)
Copies the pipeline name and url as a markdown-friendly link to your clipboard. 
This is useful for our Merchant Portal MFE Pull Request templates.

### [ADO Backlog Patch](//github.com/attn-xplor/userscripts/raw/refs/heads/trunk/ado-backlog-patch.user.js)
Performs DOM string replacements in the Sprint Backlog view of Azure DevOps. This
allows you to minimize text on the screen, greatly simplifying the view.

### [Jira](//github.com/attn-xplor/userscripts/raw/refs/heads/trunk/jira.user.js)
Copies the ticket number (e.g., ITSM-12345) and url as a markdown-friendly link to your clipboard. 
This is useful for our Merchant Portal MFE Pull Request templates.