/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ target: NonNullable<unknown> }} Llmpasteinto2Inputs */



/**
* | output |
* | --- |
* | "paste into {target}" |
*
* @param {Llmpasteinto2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const llmpasteinto2 = /** @type {((inputs: Llmpasteinto2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmpasteinto2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`pega en ${i?.target}`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`粘贴到 ${i?.target}`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.target} に貼り付け`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`${i?.target}에 붙여넣기`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`貼到 ${i?.target}`)
	if (locale === "de") return /** @type {LocalizedString} */ (`einfügen in ${i?.target}`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`collez dans ${i?.target}`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`вставте у ${i?.target}`)
	return /** @type {LocalizedString} */ (`paste into ${i?.target}`)
});
export { llmpasteinto2 as "llmPasteInto" }