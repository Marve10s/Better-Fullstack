/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navcompare1Inputs */

const en_navcompare1 = /** @type {(inputs: Navcompare1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Compare`)
};

const es_navcompare1 = /** @type {(inputs: Navcompare1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Comparar`)
};

const zh_navcompare1 = /** @type {(inputs: Navcompare1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`比较`)
};

/**
* | output |
* | --- |
* | "Compare" |
*
* @param {Navcompare1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const navcompare1 = /** @type {((inputs?: Navcompare1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navcompare1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navcompare1(inputs)
	if (locale === "es") return es_navcompare1(inputs)
	return zh_navcompare1(inputs)
});
export { navcompare1 as "navCompare" }