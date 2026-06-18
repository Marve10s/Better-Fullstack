/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docspagenavigation2Inputs */

const en_docspagenavigation2 = /** @type {(inputs: Docspagenavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Page navigation`)
};

const es_docspagenavigation2 = /** @type {(inputs: Docspagenavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Navegación de página`)
};

const zh_docspagenavigation2 = /** @type {(inputs: Docspagenavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`页面导航`)
};

const ja_docspagenavigation2 = /** @type {(inputs: Docspagenavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ページナビゲーション`)
};

const ko_docspagenavigation2 = /** @type {(inputs: Docspagenavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`페이지 탐색`)
};

const zh_hant1_docspagenavigation2 = /** @type {(inputs: Docspagenavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`頁面導航`)
};

const de_docspagenavigation2 = /** @type {(inputs: Docspagenavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Seitennavigation`)
};

const fr_docspagenavigation2 = /** @type {(inputs: Docspagenavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Navigation dans les pages`)
};

/**
* | output |
* | --- |
* | "Page navigation" |
*
* @param {Docspagenavigation2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const docspagenavigation2 = /** @type {((inputs?: Docspagenavigation2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docspagenavigation2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docspagenavigation2(inputs)
	if (locale === "es") return es_docspagenavigation2(inputs)
	if (locale === "zh") return zh_docspagenavigation2(inputs)
	if (locale === "ja") return ja_docspagenavigation2(inputs)
	if (locale === "ko") return ko_docspagenavigation2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docspagenavigation2(inputs)
	if (locale === "de") return de_docspagenavigation2(inputs)
	return fr_docspagenavigation2(inputs)
});
export { docspagenavigation2 as "docsPageNavigation" }