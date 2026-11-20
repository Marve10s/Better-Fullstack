/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryreactnativemobileui6Inputs */



/**
* | output |
* | --- |
* | "Mobile UI kit." |
*
* @param {Docsclisummaryreactnativemobileui6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryreactnativemobileui6 = /** @type {((inputs?: Docsclisummaryreactnativemobileui6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryreactnativemobileui6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Kit de interfaz móvil.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("移动端 UI 套件。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("モバイル UI キット。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("모바일 UI 키트.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("行動裝置 UI 套件。")
	if (locale === "de") return /** @type {LocalizedString} */ ("UI-Kit für mobile Apps.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Kit d’interface mobile.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Набір компонентів мобільного інтерфейсу.")
	return /** @type {LocalizedString} */ ("Mobile UI kit.")
});
export { docsclisummaryreactnativemobileui6 as "docsCliSummaryReactNativeMobileUi" }