/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparegroupdeveloperexperience3Inputs */

const en_comparegroupdeveloperexperience3 = /** @type {(inputs: Comparegroupdeveloperexperience3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Developer Experience`)
};

const es_comparegroupdeveloperexperience3 = /** @type {(inputs: Comparegroupdeveloperexperience3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Experiencia de desarrollo`)
};

const zh_comparegroupdeveloperexperience3 = /** @type {(inputs: Comparegroupdeveloperexperience3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`开发体验`)
};

const ja_comparegroupdeveloperexperience3 = /** @type {(inputs: Comparegroupdeveloperexperience3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`開発者のエクスペリエンス`)
};

const ko_comparegroupdeveloperexperience3 = /** @type {(inputs: Comparegroupdeveloperexperience3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`개발자 경험`)
};

const zh_hant1_comparegroupdeveloperexperience3 = /** @type {(inputs: Comparegroupdeveloperexperience3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`開發體驗`)
};

const de_comparegroupdeveloperexperience3 = /** @type {(inputs: Comparegroupdeveloperexperience3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Entwicklererfahrung`)
};

const fr_comparegroupdeveloperexperience3 = /** @type {(inputs: Comparegroupdeveloperexperience3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Expérience du développeur`)
};

const uk_comparegroupdeveloperexperience3 = /** @type {(inputs: Comparegroupdeveloperexperience3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Досвід розробника`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparegroupdeveloperexperience3(inputs)
	if (locale === "es") return es_comparegroupdeveloperexperience3(inputs)
	if (locale === "zh") return zh_comparegroupdeveloperexperience3(inputs)
	if (locale === "ja") return ja_comparegroupdeveloperexperience3(inputs)
	if (locale === "ko") return ko_comparegroupdeveloperexperience3(inputs)
	if (locale === "zh-Hant") return zh_hant1_comparegroupdeveloperexperience3(inputs)
	if (locale === "de") return de_comparegroupdeveloperexperience3(inputs)
	if (locale === "fr") return fr_comparegroupdeveloperexperience3(inputs)
	return uk_comparegroupdeveloperexperience3(inputs)
});
export { comparegroupdeveloperexperience3 as "compareGroupDeveloperExperience" }