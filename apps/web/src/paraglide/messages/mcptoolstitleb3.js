/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptoolstitleb3Inputs */



/**
* | output |
* | --- |
* | "One workflow." |
*
* @param {Mcptoolstitleb3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcptoolstitleb3 = /** @type {((inputs?: Mcptoolstitleb3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptoolstitleb3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Un flujo.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("一个流程。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ワークフローは 1 つ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("하나의 워크플로.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("一個流程。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Ein Arbeitsablauf.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Un flux de travail.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Один робочий процес.")
	return /** @type {LocalizedString} */ ("One workflow.")
});
export { mcptoolstitleb3 as "mcpToolsTitleB" }