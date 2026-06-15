/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navhome1Inputs */

const en_navhome1 = /** @type {(inputs: Navhome1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better Fullstack home`)
};

const es_navhome1 = /** @type {(inputs: Navhome1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Inicio de Better Fullstack`)
};

const zh_navhome1 = /** @type {(inputs: Navhome1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better Fullstack 首页`)
};

/**
* | output |
* | --- |
* | "Better Fullstack home" |
*
* @param {Navhome1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const navhome1 = /** @type {((inputs?: Navhome1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navhome1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navhome1(inputs)
	if (locale === "es") return es_navhome1(inputs)
	return zh_navhome1(inputs)
});
export { navhome1 as "navHome" }