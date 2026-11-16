/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Themetoggle1Inputs */



/**
* | output |
* | --- |
* | "Toggle theme" |
*
* @param {Themetoggle1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const themetoggle1 = /** @type {((inputs?: Themetoggle1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Themetoggle1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Cambiar tema")
	if (locale === "zh") return /** @type {LocalizedString} */ ("切换主题")
	if (locale === "ja") return /** @type {LocalizedString} */ ("テーマの切り替え")
	if (locale === "ko") return /** @type {LocalizedString} */ ("테마 전환")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("切換主題")
	if (locale === "de") return /** @type {LocalizedString} */ ("Design umschalten")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Changer de thème")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Перемкнути тему")
	return /** @type {LocalizedString} */ ("Toggle theme")
});
export { themetoggle1 as "themeToggle" }