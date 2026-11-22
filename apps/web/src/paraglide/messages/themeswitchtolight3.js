/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Themeswitchtolight3Inputs */



/**
* | output |
* | --- |
* | "Switch to light mode" |
*
* @param {Themeswitchtolight3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const themeswitchtolight3 = /** @type {((inputs?: Themeswitchtolight3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Themeswitchtolight3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Cambiar al modo claro")
	if (locale === "zh") return /** @type {LocalizedString} */ ("切换到浅色模式")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ライトモードに切り替える")
	if (locale === "ko") return /** @type {LocalizedString} */ ("밝은 모드로 전환")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("切換到淺色模式")
	if (locale === "de") return /** @type {LocalizedString} */ ("Wechseln Sie in den Lichtmodus")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Passer en mode clair")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Увімкнути світлу тему")
	return /** @type {LocalizedString} */ ("Switch to light mode")
});
export { themeswitchtolight3 as "themeSwitchToLight" }