/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Themeswitchtodark3Inputs */



/**
* | output |
* | --- |
* | "Switch to dark mode" |
*
* @param {Themeswitchtodark3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const themeswitchtodark3 = /** @type {((inputs?: Themeswitchtodark3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Themeswitchtodark3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Cambiar al modo oscuro")
	if (locale === "zh") return /** @type {LocalizedString} */ ("切换到深色模式")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ダークモードに切り替える")
	if (locale === "ko") return /** @type {LocalizedString} */ ("어두운 모드로 전환")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("切換到深色模式")
	if (locale === "de") return /** @type {LocalizedString} */ ("Wechseln Sie in den Dunkelmodus")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Passer en mode sombre")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Увімкнути темну тему")
	return /** @type {LocalizedString} */ ("Switch to dark mode")
});
export { themeswitchtodark3 as "themeSwitchToDark" }