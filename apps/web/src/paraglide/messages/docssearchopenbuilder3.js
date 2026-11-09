/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssearchopenbuilder3Inputs */



/**
* | output |
* | --- |
* | "Open Stack Builder" |
*
* @param {Docssearchopenbuilder3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docssearchopenbuilder3 = /** @type {((inputs?: Docssearchopenbuilder3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssearchopenbuilder3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Abrir Stack Builder")
	if (locale === "zh") return /** @type {LocalizedString} */ ("打开 Stack Builder")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Stack Builder を開く")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Stack Builder 열기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("開啟 Stack Builder")
	if (locale === "de") return /** @type {LocalizedString} */ ("Stack Builder öffnen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Ouvrir le Stack Builder")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Відкрити Stack Builder")
	return /** @type {LocalizedString} */ ("Open Stack Builder")
});
export { docssearchopenbuilder3 as "docsSearchOpenBuilder" }