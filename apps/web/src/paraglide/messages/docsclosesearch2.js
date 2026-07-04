/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclosesearch2Inputs */

const en_docsclosesearch2 = /** @type {(inputs: Docsclosesearch2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Close search`)
};

const es_docsclosesearch2 = /** @type {(inputs: Docsclosesearch2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cerrar búsqueda`)
};

const zh_docsclosesearch2 = /** @type {(inputs: Docsclosesearch2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关闭搜索`)
};

const ja_docsclosesearch2 = /** @type {(inputs: Docsclosesearch2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`検索を閉じる`)
};

const ko_docsclosesearch2 = /** @type {(inputs: Docsclosesearch2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`검색 닫기`)
};

const zh_hant1_docsclosesearch2 = /** @type {(inputs: Docsclosesearch2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`關閉搜尋`)
};

const de_docsclosesearch2 = /** @type {(inputs: Docsclosesearch2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Suche schließen`)
};

const fr_docsclosesearch2 = /** @type {(inputs: Docsclosesearch2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fermer la recherche`)
};

/**
* | output |
* | --- |
* | "Close search" |
*
* @param {Docsclosesearch2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const docsclosesearch2 = /** @type {((inputs?: Docsclosesearch2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclosesearch2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docsclosesearch2(inputs)
	if (locale === "es") return es_docsclosesearch2(inputs)
	if (locale === "zh") return zh_docsclosesearch2(inputs)
	if (locale === "ja") return ja_docsclosesearch2(inputs)
	if (locale === "ko") return ko_docsclosesearch2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclosesearch2(inputs)
	if (locale === "de") return de_docsclosesearch2(inputs)
	return fr_docsclosesearch2(inputs)
});
export { docsclosesearch2 as "docsCloseSearch" }