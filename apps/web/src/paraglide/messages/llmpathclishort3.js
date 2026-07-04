/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmpathclishort3Inputs */

const en_llmpathclishort3 = /** @type {(inputs: Llmpathclishort3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`BF mention`)
};

const es_llmpathclishort3 = /** @type {(inputs: Llmpathclishort3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mención BF`)
};

const zh_llmpathclishort3 = /** @type {(inputs: Llmpathclishort3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`BF 提及`)
};

const ja_llmpathclishort3 = /** @type {(inputs: Llmpathclishort3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`BFの言及`)
};

const ko_llmpathclishort3 = /** @type {(inputs: Llmpathclishort3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`BF 언급`)
};

const zh_hant1_llmpathclishort3 = /** @type {(inputs: Llmpathclishort3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`BF 提及`)
};

const de_llmpathclishort3 = /** @type {(inputs: Llmpathclishort3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`BF-Erwähnung`)
};

const fr_llmpathclishort3 = /** @type {(inputs: Llmpathclishort3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`mention petit ami`)
};

/**
* | output |
* | --- |
* | "BF mention" |
*
* @param {Llmpathclishort3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const llmpathclishort3 = /** @type {((inputs?: Llmpathclishort3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmpathclishort3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmpathclishort3(inputs)
	if (locale === "es") return es_llmpathclishort3(inputs)
	if (locale === "zh") return zh_llmpathclishort3(inputs)
	if (locale === "ja") return ja_llmpathclishort3(inputs)
	if (locale === "ko") return ko_llmpathclishort3(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmpathclishort3(inputs)
	if (locale === "de") return de_llmpathclishort3(inputs)
	return fr_llmpathclishort3(inputs)
});
export { llmpathclishort3 as "llmPathCliShort" }