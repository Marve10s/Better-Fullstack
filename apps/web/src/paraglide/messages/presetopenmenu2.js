/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presetopenmenu2Inputs */



/**
* | output |
* | --- |
* | "Open preset menu" |
*
* @param {Presetopenmenu2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presetopenmenu2 = /** @type {((inputs?: Presetopenmenu2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetopenmenu2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Abrir menú de plantillas")
	if (locale === "zh") return /** @type {LocalizedString} */ ("打开预设菜单")
	if (locale === "ja") return /** @type {LocalizedString} */ ("プリセットメニューを開く")
	if (locale === "ko") return /** @type {LocalizedString} */ ("사전 설정 메뉴 열기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("開啟預設選單")
	if (locale === "de") return /** @type {LocalizedString} */ ("Voreingestelltes Menü öffnen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Ouvrir le menu prédéfini")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Відкрити меню пресетів")
	return /** @type {LocalizedString} */ ("Open preset menu")
});
export { presetopenmenu2 as "presetOpenMenu" }