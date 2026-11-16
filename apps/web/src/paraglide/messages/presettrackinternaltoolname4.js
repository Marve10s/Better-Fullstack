/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackinternaltoolname4Inputs */



/**
* | output |
* | --- |
* | "Internal Tool" |
*
* @param {Presettrackinternaltoolname4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presettrackinternaltoolname4 = /** @type {((inputs?: Presettrackinternaltoolname4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackinternaltoolname4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Herramienta interna")
	if (locale === "zh") return /** @type {LocalizedString} */ ("内部工具")
	if (locale === "ja") return /** @type {LocalizedString} */ ("内部ツール")
	if (locale === "ko") return /** @type {LocalizedString} */ ("내부 도구")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("內部工具")
	if (locale === "de") return /** @type {LocalizedString} */ ("Internes Tool")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Outil interne")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Внутрішній інструмент")
	return /** @type {LocalizedString} */ ("Internal Tool")
});
export { presettrackinternaltoolname4 as "presetTrackInternalToolName" }