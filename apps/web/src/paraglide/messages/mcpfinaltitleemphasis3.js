/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpfinaltitleemphasis3Inputs */



/**
* | output |
* | --- |
* | "prompt-only." |
*
* @param {Mcpfinaltitleemphasis3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpfinaltitleemphasis3 = /** @type {((inputs?: Mcpfinaltitleemphasis3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpfinaltitleemphasis3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("solo prompt.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("纯 prompt 快 2.6×。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("2.6倍高速。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("프롬프트 전용.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("純 prompt 快 2.6×。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Nur per Prompt.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("invite uniquement.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("prompt-only.")
	return /** @type {LocalizedString} */ ("prompt-only.")
});
export { mcpfinaltitleemphasis3 as "mcpFinalTitleEmphasis" }