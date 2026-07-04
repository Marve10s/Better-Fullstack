/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsopennavigation2Inputs */

const en_docsopennavigation2 = /** @type {(inputs: Docsopennavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open docs navigation`)
};

const es_docsopennavigation2 = /** @type {(inputs: Docsopennavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abrir navegación de docs`)
};

const zh_docsopennavigation2 = /** @type {(inputs: Docsopennavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打开文档导航`)
};

const ja_docsopennavigation2 = /** @type {(inputs: Docsopennavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ドキュメントを開くナビゲーション`)
};

const ko_docsopennavigation2 = /** @type {(inputs: Docsopennavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`문서 탐색 열기`)
};

const zh_hant1_docsopennavigation2 = /** @type {(inputs: Docsopennavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`開啟文檔導航`)
};

const de_docsopennavigation2 = /** @type {(inputs: Docsopennavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Öffnen Sie die Dokumentennavigation`)
};

const fr_docsopennavigation2 = /** @type {(inputs: Docsopennavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ouvrir la navigation dans les documents`)
};

/**
* | output |
* | --- |
* | "Open docs navigation" |
*
* @param {Docsopennavigation2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const docsopennavigation2 = /** @type {((inputs?: Docsopennavigation2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsopennavigation2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docsopennavigation2(inputs)
	if (locale === "es") return es_docsopennavigation2(inputs)
	if (locale === "zh") return zh_docsopennavigation2(inputs)
	if (locale === "ja") return ja_docsopennavigation2(inputs)
	if (locale === "ko") return ko_docsopennavigation2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsopennavigation2(inputs)
	if (locale === "de") return de_docsopennavigation2(inputs)
	return fr_docsopennavigation2(inputs)
});
export { docsopennavigation2 as "docsOpenNavigation" }