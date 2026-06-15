/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footerpopularguides2Inputs */

const en_footerpopularguides2 = /** @type {(inputs: Footerpopularguides2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Popular guides`)
};

const es_footerpopularguides2 = /** @type {(inputs: Footerpopularguides2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Guías populares`)
};

const zh_footerpopularguides2 = /** @type {(inputs: Footerpopularguides2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`热门指南`)
};

/**
* | output |
* | --- |
* | "Popular guides" |
*
* @param {Footerpopularguides2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const footerpopularguides2 = /** @type {((inputs?: Footerpopularguides2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footerpopularguides2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_footerpopularguides2(inputs)
	if (locale === "es") return es_footerpopularguides2(inputs)
	return zh_footerpopularguides2(inputs)
});
export { footerpopularguides2 as "footerPopularGuides" }