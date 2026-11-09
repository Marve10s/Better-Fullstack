/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssearchactions2Inputs */



/**
* | output |
* | --- |
* | "Actions" |
*
* @param {Docssearchactions2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docssearchactions2 = /** @type {((inputs?: Docssearchactions2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssearchactions2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Acciones")
	if (locale === "zh") return /** @type {LocalizedString} */ ("操作")
	if (locale === "ja") return /** @type {LocalizedString} */ ("アクション")
	if (locale === "ko") return /** @type {LocalizedString} */ ("작업")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("操作")
	if (locale === "de") return /** @type {LocalizedString} */ ("Aktionen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Actions")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Дії")
	return /** @type {LocalizedString} */ ("Actions")
});
export { docssearchactions2 as "docsSearchActions" }