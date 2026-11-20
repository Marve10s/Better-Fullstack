/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparevisualwebbuilder3Inputs */



/**
* | output |
* | --- |
* | "Visual web builder" |
*
* @param {Comparevisualwebbuilder3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const comparevisualwebbuilder3 = /** @type {((inputs?: Comparevisualwebbuilder3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparevisualwebbuilder3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Constructor web visual")
	if (locale === "zh") return /** @type {LocalizedString} */ ("可视化 Web 构建器")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ビジュアルウェブビルダー")
	if (locale === "ko") return /** @type {LocalizedString} */ ("비주얼 웹 빌더")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("視覺化 Web 建構器")
	if (locale === "de") return /** @type {LocalizedString} */ ("Visueller Web-Builder")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Constructeur web visuel")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Візуальний вебконструктор")
	return /** @type {LocalizedString} */ ("Visual web builder")
});
export { comparevisualwebbuilder3 as "compareVisualWebBuilder" }