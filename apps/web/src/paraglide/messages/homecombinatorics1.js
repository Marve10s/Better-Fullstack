/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecombinatorics1Inputs */

const en_homecombinatorics1 = /** @type {(inputs: Homecombinatorics1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`combinatorics`)
};

const es_homecombinatorics1 = /** @type {(inputs: Homecombinatorics1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`combinatoria`)
};

const zh_homecombinatorics1 = /** @type {(inputs: Homecombinatorics1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`组合数量`)
};

/**
* | output |
* | --- |
* | "combinatorics" |
*
* @param {Homecombinatorics1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homecombinatorics1 = /** @type {((inputs?: Homecombinatorics1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecombinatorics1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homecombinatorics1(inputs)
	if (locale === "es") return es_homecombinatorics1(inputs)
	return zh_homecombinatorics1(inputs)
});
export { homecombinatorics1 as "homeCombinatorics" }