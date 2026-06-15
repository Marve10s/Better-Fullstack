/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homethatis2Inputs */

const en_homethatis2 = /** @type {(inputs: Homethatis2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`that's`)
};

const es_homethatis2 = /** @type {(inputs: Homethatis2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`eso es`)
};

const zh_homethatis2 = /** @type {(inputs: Homethatis2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`也就是`)
};

/**
* | output |
* | --- |
* | "that's" |
*
* @param {Homethatis2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homethatis2 = /** @type {((inputs?: Homethatis2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homethatis2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homethatis2(inputs)
	if (locale === "es") return es_homethatis2(inputs)
	return zh_homethatis2(inputs)
});
export { homethatis2 as "homeThatIs" }