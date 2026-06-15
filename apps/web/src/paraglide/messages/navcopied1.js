/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navcopied1Inputs */

const en_navcopied1 = /** @type {(inputs: Navcopied1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copied`)
};

const es_navcopied1 = /** @type {(inputs: Navcopied1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copiado`)
};

const zh_navcopied1 = /** @type {(inputs: Navcopied1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已复制`)
};

/**
* | output |
* | --- |
* | "Copied" |
*
* @param {Navcopied1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const navcopied1 = /** @type {((inputs?: Navcopied1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navcopied1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navcopied1(inputs)
	if (locale === "es") return es_navcopied1(inputs)
	return zh_navcopied1(inputs)
});
export { navcopied1 as "navCopied" }