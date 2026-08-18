/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmotherclients2Inputs */

const en_llmotherclients2 = /** @type {(inputs: Llmotherclients2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Others`)
};

const es_llmotherclients2 = /** @type {(inputs: Llmotherclients2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Otros`)
};

const zh_llmotherclients2 = /** @type {(inputs: Llmotherclients2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`其他`)
};

const ja_llmotherclients2 = /** @type {(inputs: Llmotherclients2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`その他`)
};

const ko_llmotherclients2 = /** @type {(inputs: Llmotherclients2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`기타`)
};

const zh_hant1_llmotherclients2 = /** @type {(inputs: Llmotherclients2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`其他`)
};

const de_llmotherclients2 = /** @type {(inputs: Llmotherclients2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Weitere`)
};

const fr_llmotherclients2 = /** @type {(inputs: Llmotherclients2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Autres`)
};

const uk_llmotherclients2 = /** @type {(inputs: Llmotherclients2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Інші`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_llmotherclients2(inputs)
	if (locale === "zh") return zh_llmotherclients2(inputs)
	if (locale === "ja") return ja_llmotherclients2(inputs)
	if (locale === "ko") return ko_llmotherclients2(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmotherclients2(inputs)
	if (locale === "de") return de_llmotherclients2(inputs)
	if (locale === "fr") return fr_llmotherclients2(inputs)
	if (locale === "uk") return uk_llmotherclients2(inputs)
	return en_llmotherclients2(inputs)
});
export { llmotherclients2 as "llmOtherClients" }