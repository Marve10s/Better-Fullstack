/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogoprototooling6Inputs */



/**
* | output |
* | --- |
* | "Go protobuf tooling." |
*
* @param {Docsclisummarygogoprototooling6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarygogoprototooling6 = /** @type {((inputs?: Docsclisummarygogoprototooling6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarygogoprototooling6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Herramientas protobuf Go.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Go protobuf 工具。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Go の protobuf ツール。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Go protobuf 도구.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Go protobuf 工具。")
	if (locale === "de") return /** @type {LocalizedString} */ ("protobuf-Werkzeuge für Go.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Outils protobuf Go.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Інструменти protobuf для Go.")
	return /** @type {LocalizedString} */ ("Go protobuf tooling.")
});
export { docsclisummarygogoprototooling6 as "docsCliSummaryGoGoProtoTooling" }