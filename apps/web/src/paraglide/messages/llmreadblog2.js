/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmreadblog2Inputs */

const en_llmreadblog2 = /** @type {(inputs: Llmreadblog2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Read the blog`)
};

const es_llmreadblog2 = /** @type {(inputs: Llmreadblog2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Leer el blog`)
};

const zh_llmreadblog2 = /** @type {(inputs: Llmreadblog2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`阅读博客`)
};

const ja_llmreadblog2 = /** @type {(inputs: Llmreadblog2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ブログを読む`)
};

const ko_llmreadblog2 = /** @type {(inputs: Llmreadblog2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`블로그 읽기`)
};

const zh_hant1_llmreadblog2 = /** @type {(inputs: Llmreadblog2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`閱讀部落格`)
};

const de_llmreadblog2 = /** @type {(inputs: Llmreadblog2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lesen Sie den Blog`)
};

const fr_llmreadblog2 = /** @type {(inputs: Llmreadblog2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lire le blog`)
};

/**
* | output |
* | --- |
* | "Read the blog" |
*
* @param {Llmreadblog2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const llmreadblog2 = /** @type {((inputs?: Llmreadblog2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmreadblog2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmreadblog2(inputs)
	if (locale === "es") return es_llmreadblog2(inputs)
	if (locale === "zh") return zh_llmreadblog2(inputs)
	if (locale === "ja") return ja_llmreadblog2(inputs)
	if (locale === "ko") return ko_llmreadblog2(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmreadblog2(inputs)
	if (locale === "de") return de_llmreadblog2(inputs)
	return fr_llmreadblog2(inputs)
});
export { llmreadblog2 as "llmReadBlog" }