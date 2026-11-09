/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsactionsmenu2Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Abrir acciones de la documentación")
	if (locale === "zh") return /** @type {LocalizedString} */ ("打开文档操作")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ドキュメントの操作を開く")
	if (locale === "ko") return /** @type {LocalizedString} */ ("문서 작업 열기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("開啟文件操作")
	if (locale === "de") return /** @type {LocalizedString} */ ("Dokumentationsaktionen öffnen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Ouvrir les actions de la documentation")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Відкрити дії документації")
	return /** @type {LocalizedString} */ ("Open documentation actions")
});
export { docsactionsmenu2 as "docsActionsMenu" }