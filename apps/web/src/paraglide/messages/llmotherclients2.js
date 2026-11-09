/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmotherclients2Inputs */



/**
* | output |
* | --- |
* | "Others" |
*
* @param {Llmotherclients2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const llmotherclients2 = /** @type {((inputs?: Llmotherclients2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmotherclients2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Otros")
	if (locale === "zh") return /** @type {LocalizedString} */ ("其他")
	if (locale === "ja") return /** @type {LocalizedString} */ ("その他")
	if (locale === "ko") return /** @type {LocalizedString} */ ("기타")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("其他")
	if (locale === "de") return /** @type {LocalizedString} */ ("Weitere")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Autres")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Інші")
	return /** @type {LocalizedString} */ ("Others")
});
export { llmotherclients2 as "llmOtherClients" }