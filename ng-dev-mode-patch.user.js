// ==UserScript==
// @name        ngDevMode Patch
// @namespace   https://github.com/attn-xplor/userscripts
// @match       https://*.clearent.net/*
// @match       http://localhost:4200/*
// @version     1.0.0
// @author      Ismael J Lopez
// @run-at      document-start
// ==/UserScript==

"use strict";

unsafeWindow.ngDevMode ??= {};
