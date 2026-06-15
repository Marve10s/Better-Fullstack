/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navbuilder1Inputs */

const en_navbuilder1 = /** @type {(inputs: Navbuilder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Builder`)
};

const es_navbuilder1 = /** @type {(inputs: Navbuilder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Constructor`)
};

const zh_navbuilder1 = /** @type {(inputs: Navbuilder1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`构建器`)
};

/**
* | output |
* | --- |
* | "Builder" |
*
* @param {Navbuilder1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const navbuilder1 = /** @type {((inputs?: Navbuilder1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navbuilder1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navbuilder1(inputs)
	if (locale === "es") return es_navbuilder1(inputs)
	return zh_navbuilder1(inputs)
});
export { navbuilder1 as "navBuilder" }