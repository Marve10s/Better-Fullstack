/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navopendocsmenu3Inputs */



/**
* | output |
* | --- |
* | "Open documentation menu" |
*
* @param {Navopendocsmenu3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navopendocsmenu3 = /** @type {((inputs?: Navopendocsmenu3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navopendocsmenu3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Abrir menú de documentación")
	if (locale === "zh") return /** @type {LocalizedString} */ ("打开文档菜单")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ドキュメントメニューを開く")
	if (locale === "ko") return /** @type {LocalizedString} */ ("문서 메뉴 열기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("開啟文件選單")
	if (locale === "de") return /** @type {LocalizedString} */ ("Dokumentationsmenü öffnen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Ouvrir le menu Documentation")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Відкрити меню документації")
	return /** @type {LocalizedString} */ ("Open documentation menu")
});
export { navopendocsmenu3 as "navOpenDocsMenu" }