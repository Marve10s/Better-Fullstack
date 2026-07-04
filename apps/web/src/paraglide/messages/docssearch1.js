/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssearch1Inputs */

const en_docssearch1 = /** @type {(inputs: Docssearch1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Search docs`)
};

const es_docssearch1 = /** @type {(inputs: Docssearch1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Buscar docs`)
};

const zh_docssearch1 = /** @type {(inputs: Docssearch1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`搜索文档`)
};

const ja_docssearch1 = /** @type {(inputs: Docssearch1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ドキュメントの検索`)
};

const ko_docssearch1 = /** @type {(inputs: Docssearch1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`문서 검색`)
};

const zh_hant1_docssearch1 = /** @type {(inputs: Docssearch1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`搜尋文檔`)
};

const de_docssearch1 = /** @type {(inputs: Docssearch1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dokumente durchsuchen`)
};

const fr_docssearch1 = /** @type {(inputs: Docssearch1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rechercher des documents`)
};

/**
* | output |
* | --- |
* | "Search docs" |
*
* @param {Docssearch1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const docssearch1 = /** @type {((inputs?: Docssearch1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssearch1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docssearch1(inputs)
	if (locale === "es") return es_docssearch1(inputs)
	if (locale === "zh") return zh_docssearch1(inputs)
	if (locale === "ja") return ja_docssearch1(inputs)
	if (locale === "ko") return ko_docssearch1(inputs)
	if (locale === "zh-Hant") return zh_hant1_docssearch1(inputs)
	if (locale === "de") return de_docssearch1(inputs)
	return fr_docssearch1(inputs)
});
export { docssearch1 as "docsSearch" }