/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparegroupdeveloperexperience3Inputs */



/**
* | output |
* | --- |
* | "Developer Experience" |
*
* @param {Comparegroupdeveloperexperience3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const comparegroupdeveloperexperience3 = /** @type {((inputs?: Comparegroupdeveloperexperience3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparegroupdeveloperexperience3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Experiencia de desarrollo")
	if (locale === "zh") return /** @type {LocalizedString} */ ("开发体验")
	if (locale === "ja") return /** @type {LocalizedString} */ ("開発者のエクスペリエンス")
	if (locale === "ko") return /** @type {LocalizedString} */ ("개발자 경험")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("開發體驗")
	if (locale === "de") return /** @type {LocalizedString} */ ("Entwicklererfahrung")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Expérience du développeur")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Досвід розробника")
	return /** @type {LocalizedString} */ ("Developer Experience")
});
export { comparegroupdeveloperexperience3 as "compareGroupDeveloperExperience" }