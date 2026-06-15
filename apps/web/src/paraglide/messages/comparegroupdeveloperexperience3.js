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

/**
* | output |
* | --- |
* | "Developer Experience" |
*
* @param {Comparegroupdeveloperexperience3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const comparegroupdeveloperexperience3 = /** @type {((inputs?: Comparegroupdeveloperexperience3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparegroupdeveloperexperience3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparegroupdeveloperexperience3(inputs)
	if (locale === "es") return es_comparegroupdeveloperexperience3(inputs)
	return zh_comparegroupdeveloperexperience3(inputs)
});
export { comparegroupdeveloperexperience3 as "compareGroupDeveloperExperience" }