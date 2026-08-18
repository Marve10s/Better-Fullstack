/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ target: NonNullable<unknown> }} Llmpasteinto2Inputs */

const en_llmpasteinto2 = /** @type {(inputs: Llmpasteinto2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`paste into ${i?.target}`)
};

const es_llmpasteinto2 = /** @type {(inputs: Llmpasteinto2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`pega en ${i?.target}`)
};

const zh_llmpasteinto2 = /** @type {(inputs: Llmpasteinto2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`粘贴到 ${i?.target}`)
};

const ja_llmpasteinto2 = /** @type {(inputs: Llmpasteinto2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.target} に貼り付け`)
};

const ko_llmpasteinto2 = /** @type {(inputs: Llmpasteinto2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.target}에 붙여넣기`)
};

const zh_hant1_llmpasteinto2 = /** @type {(inputs: Llmpasteinto2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`貼到 ${i?.target}`)
};

const de_llmpasteinto2 = /** @type {(inputs: Llmpasteinto2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`einfügen in ${i?.target}`)
};

const fr_llmpasteinto2 = /** @type {(inputs: Llmpasteinto2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`collez dans ${i?.target}`)
};

const uk_llmpasteinto2 = /** @type {(inputs: Llmpasteinto2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`вставте у ${i?.target}`)
};

/**
* | output |
* | --- |
* | "paste into {target}" |
*
* @param {Llmpasteinto2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const llmpasteinto2 = /** @type {((inputs: Llmpasteinto2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmpasteinto2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_llmpasteinto2(inputs)
	if (locale === "zh") return zh_llmpasteinto2(inputs)
	if (locale === "ja") return ja_llmpasteinto2(inputs)
	if (locale === "ko") return ko_llmpasteinto2(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmpasteinto2(inputs)
	if (locale === "de") return de_llmpasteinto2(inputs)
	if (locale === "fr") return fr_llmpasteinto2(inputs)
	if (locale === "uk") return uk_llmpasteinto2(inputs)
	return en_llmpasteinto2(inputs)
});
export { llmpasteinto2 as "llmPasteInto" }