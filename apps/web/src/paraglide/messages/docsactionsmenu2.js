/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsactionsmenu2Inputs */

const en_docsactionsmenu2 = /** @type {(inputs: Docsactionsmenu2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open documentation actions`)
};

const es_docsactionsmenu2 = /** @type {(inputs: Docsactionsmenu2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abrir acciones de la documentación`)
};

const zh_docsactionsmenu2 = /** @type {(inputs: Docsactionsmenu2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打开文档操作`)
};

const ja_docsactionsmenu2 = /** @type {(inputs: Docsactionsmenu2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ドキュメントの操作を開く`)
};

const ko_docsactionsmenu2 = /** @type {(inputs: Docsactionsmenu2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`문서 작업 열기`)
};

const zh_hant1_docsactionsmenu2 = /** @type {(inputs: Docsactionsmenu2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`開啟文件操作`)
};

const de_docsactionsmenu2 = /** @type {(inputs: Docsactionsmenu2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dokumentationsaktionen öffnen`)
};

const fr_docsactionsmenu2 = /** @type {(inputs: Docsactionsmenu2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ouvrir les actions de la documentation`)
};

const uk_docsactionsmenu2 = /** @type {(inputs: Docsactionsmenu2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Відкрити дії документації`)
};

/**
* | output |
* | --- |
* | "Open documentation actions" |
*
* @param {Docsactionsmenu2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsactionsmenu2 = /** @type {((inputs?: Docsactionsmenu2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsactionsmenu2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsactionsmenu2(inputs)
	if (locale === "zh") return zh_docsactionsmenu2(inputs)
	if (locale === "ja") return ja_docsactionsmenu2(inputs)
	if (locale === "ko") return ko_docsactionsmenu2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsactionsmenu2(inputs)
	if (locale === "de") return de_docsactionsmenu2(inputs)
	if (locale === "fr") return fr_docsactionsmenu2(inputs)
	if (locale === "uk") return uk_docsactionsmenu2(inputs)
	return en_docsactionsmenu2(inputs)
});
export { docsactionsmenu2 as "docsActionsMenu" }