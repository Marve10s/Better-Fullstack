/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedproject1Inputs */



/**
* | output |
* | --- |
* | "Project" |
*
* @param {Savedproject1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const savedproject1 = /** @type {((inputs?: Savedproject1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedproject1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
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
export { savedproject1 as "savedProject" }