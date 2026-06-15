/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navdocs1Inputs */

const en_navdocs1 = /** @type {(inputs: Navdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Docs`)
};

const es_navdocs1 = /** @type {(inputs: Navdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Docs`)
};

const zh_navdocs1 = /** @type {(inputs: Navdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`文档`)
};

/**
* | output |
* | --- |
* | "Docs" |
*
* @param {Navdocs1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const navdocs1 = /** @type {((inputs?: Navdocs1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navdocs1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navdocs1(inputs)
	if (locale === "es") return es_navdocs1(inputs)
	return zh_navdocs1(inputs)
});
export { navdocs1 as "navDocs" }