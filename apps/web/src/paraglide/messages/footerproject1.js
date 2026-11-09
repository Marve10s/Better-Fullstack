/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footerproject1Inputs */



/**
* | output |
* | --- |
* | "Project" |
*
* @param {Footerproject1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const footerproject1 = /** @type {((inputs?: Footerproject1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footerproject1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Proyecto")
	if (locale === "zh") return /** @type {LocalizedString} */ ("项目")
	if (locale === "ja") return /** @type {LocalizedString} */ ("プロジェクト")
	if (locale === "ko") return /** @type {LocalizedString} */ ("프로젝트")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("專案")
	if (locale === "de") return /** @type {LocalizedString} */ ("Projekt")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Projet")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Проєкт")
	return /** @type {LocalizedString} */ ("Project")
});
export { footerproject1 as "footerProject" }