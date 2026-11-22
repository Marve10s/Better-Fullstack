/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navopenmenu2Inputs */



/**
* | output |
* | --- |
* | "Open menu" |
*
* @param {Navopenmenu2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navopenmenu2 = /** @type {((inputs?: Navopenmenu2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navopenmenu2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Abrir menú")
	if (locale === "zh") return /** @type {LocalizedString} */ ("打开菜单")
	if (locale === "ja") return /** @type {LocalizedString} */ ("メニューを開く")
	if (locale === "ko") return /** @type {LocalizedString} */ ("메뉴 열기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("開啟選單")
	if (locale === "de") return /** @type {LocalizedString} */ ("Menü öffnen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Ouvrir le menu")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Відкрити меню")
	return /** @type {LocalizedString} */ ("Open menu")
});
export { navopenmenu2 as "navOpenMenu" }