/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homelikedonx3Inputs */

const en_homelikedonx3 = /** @type {(inputs: Homelikedonx3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`liked on x`)
};

const es_homelikedonx3 = /** @type {(inputs: Homelikedonx3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`likes en x`)
};

const zh_homelikedonx3 = /** @type {(inputs: Homelikedonx3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`X 上的点赞`)
};

/**
* | output |
* | --- |
* | "liked on x" |
*
* @param {Homelikedonx3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homelikedonx3 = /** @type {((inputs?: Homelikedonx3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homelikedonx3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homelikedonx3(inputs)
	if (locale === "es") return es_homelikedonx3(inputs)
	return zh_homelikedonx3(inputs)
});
export { homelikedonx3 as "homeLikedOnX" }