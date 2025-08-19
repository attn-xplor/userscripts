# [Automatic override toggle](//github.com/attn-xplor/userscripts/raw/refs/heads/trunk/auto-overrides.user.js)
Automatically turns on Single Spa for any MFEs you are actively running locally. Uses the cached import map and checks if something is running on that port. Useful most of the time except for A-B testing, but that is why you can toggle it on/off in the first place.

# [Config Patch](//github.com/attn-xplor/userscripts/raw/refs/heads/trunk/config-patch.user.js)
Much like Network Overrides (supported by Chrome and Firefox), this script allows you overwrite properties within MerchantWebApplicationClientConfig. However, this user script does so as a *patch* - meaning you only have to specify properties you need overwritten. 

Cleaner than having to look through the entire config.

# [Okta Utils](//github.com/attn-xplor/userscripts/raw/refs/heads/trunk/okta-utils.user.js)
Copies your current Okta Access Token to your clipboard. Useful for Postman requests where you need a Bearer token.

# [Cache Utils](//github.com/attn-xplor/userscripts/raw/refs/heads/trunk/cache-utils.user.js)
Utilities for clearing the cache, but leaves Single Spa import overrides intact.