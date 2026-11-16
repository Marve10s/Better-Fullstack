/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Uicloseall2Inputs */



/**
* | output |
* | --- |
* | "Close all" |
*
* @param {Uicloseall2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const uicloseall2 = /** @type {((inputs?: Uicloseall2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Uicloseall2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Cerrar todo")
	if (locale === "zh") return /** @type {LocalizedString} */ ("全部关闭")
	if (locale === "ja") return /** @type {LocalizedString} */ ("すべて閉じる")
	if (locale === "ko") return /** @type {LocalizedString} */ ("모두 닫기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("全部關閉")
	if (locale === "de") return /** @type {LocalizedString} */ ("Alle schließen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Tout fermer")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Закрити всі")
	return /** @type {LocalizedString} */ ("Close all")
});
export { uicloseall2 as "uiCloseAll" }