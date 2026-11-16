/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildernewfilter2Inputs */



/**
* | output |
* | --- |
* | "New in this release" |
*
* @param {Buildernewfilter2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildernewfilter2 = /** @type {((inputs?: Buildernewfilter2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildernewfilter2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Nuevo en esta versión")
	if (locale === "zh") return /** @type {LocalizedString} */ ("本次发布的新增内容")
	if (locale === "ja") return /** @type {LocalizedString} */ ("このリリースの新機能")
	if (locale === "ko") return /** @type {LocalizedString} */ ("이번 릴리스의 새 기능")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("本次發布的新內容")
	if (locale === "de") return /** @type {LocalizedString} */ ("Neu in diesem Release")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Nouveau dans cette version")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Нове в цьому релізі")
	return /** @type {LocalizedString} */ ("New in this release")
});
export { buildernewfilter2 as "builderNewFilter" }