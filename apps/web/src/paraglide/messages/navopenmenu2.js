/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navopenmenu2Inputs */

const en_navopenmenu2 = /** @type {(inputs: Navopenmenu2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open menu`)
};

const es_navopenmenu2 = /** @type {(inputs: Navopenmenu2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abrir menú`)
};

const zh_navopenmenu2 = /** @type {(inputs: Navopenmenu2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打开菜单`)
};

/**
* | output |
* | --- |
* | "Open menu" |
*
* @param {Navopenmenu2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const navopenmenu2 = /** @type {((inputs?: Navopenmenu2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navopenmenu2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navopenmenu2(inputs)
	if (locale === "es") return es_navopenmenu2(inputs)
	return zh_navopenmenu2(inputs)
});
export { navopenmenu2 as "navOpenMenu" }