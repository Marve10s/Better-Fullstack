/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navblog1Inputs */

const en_navblog1 = /** @type {(inputs: Navblog1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Blog`)
};

const es_navblog1 = /** @type {(inputs: Navblog1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Blog`)
};

const zh_navblog1 = /** @type {(inputs: Navblog1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`博客`)
};

/**
* | output |
* | --- |
* | "Blog" |
*
* @param {Navblog1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const navblog1 = /** @type {((inputs?: Navblog1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navblog1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navblog1(inputs)
	if (locale === "es") return es_navblog1(inputs)
	return zh_navblog1(inputs)
});
export { navblog1 as "navBlog" }