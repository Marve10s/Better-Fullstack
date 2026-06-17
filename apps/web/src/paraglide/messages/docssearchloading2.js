/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssearchloading2Inputs */

const en_docssearchloading2 = /** @type {(inputs: Docssearchloading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Loading search...`)
};

const es_docssearchloading2 = /** @type {(inputs: Docssearchloading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cargando búsqueda...`)
};

const zh_docssearchloading2 = /** @type {(inputs: Docssearchloading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在加载搜索...`)
};

const ja_docssearchloading2 = /** @type {(inputs: Docssearchloading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`検索を読み込み中...`)
};

const ko_docssearchloading2 = /** @type {(inputs: Docssearchloading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`검색 로드 중...`)
};

const zh_hant1_docssearchloading2 = /** @type {(inputs: Docssearchloading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在加載搜尋...`)
};

const de_docssearchloading2 = /** @type {(inputs: Docssearchloading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Suche wird geladen...`)
};

const fr_docssearchloading2 = /** @type {(inputs: Docssearchloading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Chargement de la recherche...`)
};

/**
* | output |
* | --- |
* | "Loading search..." |
*
* @param {Docssearchloading2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const docssearchloading2 = /** @type {((inputs?: Docssearchloading2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssearchloading2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docssearchloading2(inputs)
	if (locale === "es") return es_docssearchloading2(inputs)
	if (locale === "zh") return zh_docssearchloading2(inputs)
	if (locale === "ja") return ja_docssearchloading2(inputs)
	if (locale === "ko") return ko_docssearchloading2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docssearchloading2(inputs)
	if (locale === "de") return de_docssearchloading2(inputs)
	return fr_docssearchloading2(inputs)
});
export { docssearchloading2 as "docsSearchLoading" }