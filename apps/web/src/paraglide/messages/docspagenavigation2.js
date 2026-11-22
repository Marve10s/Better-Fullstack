/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docspagenavigation2Inputs */



/**
* | output |
* | --- |
* | "Page navigation" |
*
* @param {Docspagenavigation2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docspagenavigation2 = /** @type {((inputs?: Docspagenavigation2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docspagenavigation2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Navegación de página")
	if (locale === "zh") return /** @type {LocalizedString} */ ("页面导航")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ページナビゲーション")
	if (locale === "ko") return /** @type {LocalizedString} */ ("페이지 탐색")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("頁面導航")
	if (locale === "de") return /** @type {LocalizedString} */ ("Seitennavigation")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Navigation dans les pages")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Навігація сторінкою")
	return /** @type {LocalizedString} */ ("Page navigation")
});
export { docspagenavigation2 as "docsPageNavigation" }