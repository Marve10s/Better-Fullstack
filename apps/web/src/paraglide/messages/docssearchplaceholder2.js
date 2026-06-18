/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssearchplaceholder2Inputs */

const en_docssearchplaceholder2 = /** @type {(inputs: Docssearchplaceholder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Search docs...`)
};

const es_docssearchplaceholder2 = /** @type {(inputs: Docssearchplaceholder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Buscar docs...`)
};

const zh_docssearchplaceholder2 = /** @type {(inputs: Docssearchplaceholder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`搜索文档...`)
};

const ja_docssearchplaceholder2 = /** @type {(inputs: Docssearchplaceholder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ドキュメントを検索...`)
};

const ko_docssearchplaceholder2 = /** @type {(inputs: Docssearchplaceholder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`문서 검색...`)
};

const zh_hant1_docssearchplaceholder2 = /** @type {(inputs: Docssearchplaceholder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`搜尋文件...`)
};

const de_docssearchplaceholder2 = /** @type {(inputs: Docssearchplaceholder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dokumente durchsuchen...`)
};

const fr_docssearchplaceholder2 = /** @type {(inputs: Docssearchplaceholder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rechercher des documents...`)
};

/**
* | output |
* | --- |
* | "Search docs..." |
*
* @param {Docssearchplaceholder2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const docssearchplaceholder2 = /** @type {((inputs?: Docssearchplaceholder2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssearchplaceholder2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docssearchplaceholder2(inputs)
	if (locale === "es") return es_docssearchplaceholder2(inputs)
	if (locale === "zh") return zh_docssearchplaceholder2(inputs)
	if (locale === "ja") return ja_docssearchplaceholder2(inputs)
	if (locale === "ko") return ko_docssearchplaceholder2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docssearchplaceholder2(inputs)
	if (locale === "de") return de_docssearchplaceholder2(inputs)
	return fr_docssearchplaceholder2(inputs)
});
export { docssearchplaceholder2 as "docsSearchPlaceholder" }