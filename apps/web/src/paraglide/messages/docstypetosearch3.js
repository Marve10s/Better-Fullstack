/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docstypetosearch3Inputs */

const en_docstypetosearch3 = /** @type {(inputs: Docstypetosearch3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Type to search`)
};

const es_docstypetosearch3 = /** @type {(inputs: Docstypetosearch3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Escribe para buscar`)
};

const zh_docstypetosearch3 = /** @type {(inputs: Docstypetosearch3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`输入内容开始搜索`)
};

const ja_docstypetosearch3 = /** @type {(inputs: Docstypetosearch3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`入力して検索します`)
};

const ko_docstypetosearch3 = /** @type {(inputs: Docstypetosearch3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`검색하려면 입력하세요.`)
};

const zh_hant1_docstypetosearch3 = /** @type {(inputs: Docstypetosearch3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`輸入內容開始搜尋`)
};

const de_docstypetosearch3 = /** @type {(inputs: Docstypetosearch3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Geben Sie ein, um zu suchen`)
};

const fr_docstypetosearch3 = /** @type {(inputs: Docstypetosearch3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tapez pour rechercher`)
};

/**
* | output |
* | --- |
* | "Type to search" |
*
* @param {Docstypetosearch3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const docstypetosearch3 = /** @type {((inputs?: Docstypetosearch3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docstypetosearch3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docstypetosearch3(inputs)
	if (locale === "es") return es_docstypetosearch3(inputs)
	if (locale === "zh") return zh_docstypetosearch3(inputs)
	if (locale === "ja") return ja_docstypetosearch3(inputs)
	if (locale === "ko") return ko_docstypetosearch3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docstypetosearch3(inputs)
	if (locale === "de") return de_docstypetosearch3(inputs)
	return fr_docstypetosearch3(inputs)
});
export { docstypetosearch3 as "docsTypeToSearch" }