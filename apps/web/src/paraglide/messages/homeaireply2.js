/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeaireply2Inputs */



/**
* | output |
* | --- |
* | "Same AI, with our MCP:" |
*
* @param {Homeaireply2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homeaireply2 = /** @type {((inputs?: Homeaireply2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeaireply2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("La misma IA, con nuestro MCP:")
	if (locale === "zh") return /** @type {LocalizedString} */ ("同样的 AI，加上我们的 MCP：")
	if (locale === "ja") return /** @type {LocalizedString} */ ("同じ AI に、私たちの MCP を足すと：")
	if (locale === "ko") return /** @type {LocalizedString} */ ("같은 AI에 우리 MCP를 더하면:")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("同樣的 AI，加上我們的 MCP：")
	if (locale === "de") return /** @type {LocalizedString} */ ("Dieselbe KI, mit unserem MCP:")
	if (locale === "fr") return /** @type {LocalizedString} */ ("La même IA, avec notre MCP :")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Той самий ШІ, з нашим MCP:")
	return /** @type {LocalizedString} */ ("Same AI, with our MCP:")
});
export { homeaireply2 as "homeAiReply" }