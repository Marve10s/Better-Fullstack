/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssearchopen2Inputs */



/**
* | output |
* | --- |
* | "Open" |
*
* @param {Docssearchopen2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docssearchopen2 = /** @type {((inputs?: Docssearchopen2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssearchopen2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Abrir")
	if (locale === "zh") return /** @type {LocalizedString} */ ("打开")
	if (locale === "ja") return /** @type {LocalizedString} */ ("開ける")
	if (locale === "ko") return /** @type {LocalizedString} */ ("열기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("打開")
	if (locale === "de") return /** @type {LocalizedString} */ ("Öffnen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Ouvrir")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Відкрити")
	return /** @type {LocalizedString} */ ("Open")
});
export { docssearchopen2 as "docsSearchOpen" }