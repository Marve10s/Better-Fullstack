/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ section: NonNullable<unknown> }} Docsopennavigation2Inputs */

const en_docsopennavigation2 = /** @type {(inputs: Docsopennavigation2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Open ${i?.section} navigation`)
};

const es_docsopennavigation2 = /** @type {(inputs: Docsopennavigation2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Abrir navegación de ${i?.section}`)
};

const zh_docsopennavigation2 = /** @type {(inputs: Docsopennavigation2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`打开${i?.section}导航`)
};

const ja_docsopennavigation2 = /** @type {(inputs: Docsopennavigation2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.section}のナビゲーションを開く`)
};

const ko_docsopennavigation2 = /** @type {(inputs: Docsopennavigation2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.section} 탐색 열기`)
};

const zh_hant1_docsopennavigation2 = /** @type {(inputs: Docsopennavigation2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`開啟${i?.section}導覽`)
};

const de_docsopennavigation2 = /** @type {(inputs: Docsopennavigation2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.section}-Navigation öffnen`)
};

const fr_docsopennavigation2 = /** @type {(inputs: Docsopennavigation2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Ouvrir la navigation ${i?.section}`)
};

const uk_docsopennavigation2 = /** @type {(inputs: Docsopennavigation2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Відкрити навігацію: ${i?.section}`)
};

/**
* | output |
* | --- |
* | "Open {section} navigation" |
*
* @param {Docsopennavigation2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsopennavigation2 = /** @type {((inputs: Docsopennavigation2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsopennavigation2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsopennavigation2(inputs)
	if (locale === "zh") return zh_docsopennavigation2(inputs)
	if (locale === "ja") return ja_docsopennavigation2(inputs)
	if (locale === "ko") return ko_docsopennavigation2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsopennavigation2(inputs)
	if (locale === "de") return de_docsopennavigation2(inputs)
	if (locale === "fr") return fr_docsopennavigation2(inputs)
	if (locale === "uk") return uk_docsopennavigation2(inputs)
	return en_docsopennavigation2(inputs)
});
export { docsopennavigation2 as "docsOpenNavigation" }