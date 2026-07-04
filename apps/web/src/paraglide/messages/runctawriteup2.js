/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runctawriteup2Inputs */

const en_runctawriteup2 = /** @type {(inputs: Runctawriteup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Read the writeup`)
};

const es_runctawriteup2 = /** @type {(inputs: Runctawriteup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lee el artículo.`)
};

const zh_runctawriteup2 = /** @type {(inputs: Runctawriteup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`阅读全文`)
};

const ja_runctawriteup2 = /** @type {(inputs: Runctawriteup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`記事を読んでください`)
};

const ko_runctawriteup2 = /** @type {(inputs: Runctawriteup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`글을 읽어보세요`)
};

const zh_hant1_runctawriteup2 = /** @type {(inputs: Runctawriteup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`閱讀全文`)
};

const de_runctawriteup2 = /** @type {(inputs: Runctawriteup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lesen Sie den Artikel.`)
};

const fr_runctawriteup2 = /** @type {(inputs: Runctawriteup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lisez le compte rendu`)
};

/**
* | output |
* | --- |
* | "Read the writeup" |
*
* @param {Runctawriteup2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const runctawriteup2 = /** @type {((inputs?: Runctawriteup2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runctawriteup2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runctawriteup2(inputs)
	if (locale === "es") return es_runctawriteup2(inputs)
	if (locale === "zh") return zh_runctawriteup2(inputs)
	if (locale === "ja") return ja_runctawriteup2(inputs)
	if (locale === "ko") return ko_runctawriteup2(inputs)
	if (locale === "zh-Hant") return zh_hant1_runctawriteup2(inputs)
	if (locale === "de") return de_runctawriteup2(inputs)
	return fr_runctawriteup2(inputs)
});
export { runctawriteup2 as "runCtaWriteup" }