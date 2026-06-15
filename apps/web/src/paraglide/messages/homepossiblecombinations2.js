/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homepossiblecombinations2Inputs */

const en_homepossiblecombinations2 = /** @type {(inputs: Homepossiblecombinations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`possible project combinations`)
};

const es_homepossiblecombinations2 = /** @type {(inputs: Homepossiblecombinations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`combinaciones posibles de proyectos`)
};

const zh_homepossiblecombinations2 = /** @type {(inputs: Homepossiblecombinations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可能的项目组合`)
};

/**
* | output |
* | --- |
* | "possible project combinations" |
*
* @param {Homepossiblecombinations2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homepossiblecombinations2 = /** @type {((inputs?: Homepossiblecombinations2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homepossiblecombinations2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homepossiblecombinations2(inputs)
	if (locale === "es") return es_homepossiblecombinations2(inputs)
	return zh_homepossiblecombinations2(inputs)
});
export { homepossiblecombinations2 as "homePossibleCombinations" }