/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homereactions1Inputs */

const en_homereactions1 = /** @type {(inputs: Homereactions1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`+ reactions`)
};

const es_homereactions1 = /** @type {(inputs: Homereactions1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`+ reacciones`)
};

const zh_homereactions1 = /** @type {(inputs: Homereactions1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`+ 条互动`)
};

/**
* | output |
* | --- |
* | "+ reactions" |
*
* @param {Homereactions1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homereactions1 = /** @type {((inputs?: Homereactions1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homereactions1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homereactions1(inputs)
	if (locale === "es") return es_homereactions1(inputs)
	return zh_homereactions1(inputs)
});
export { homereactions1 as "homeReactions" }