/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homebecomepatron2Inputs */

const en_homebecomepatron2 = /** @type {(inputs: Homebecomepatron2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Become a patron`)
};

const es_homebecomepatron2 = /** @type {(inputs: Homebecomepatron2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Hazte patron`)
};

const zh_homebecomepatron2 = /** @type {(inputs: Homebecomepatron2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`成为赞助者`)
};

/**
* | output |
* | --- |
* | "Become a patron" |
*
* @param {Homebecomepatron2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homebecomepatron2 = /** @type {((inputs?: Homebecomepatron2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homebecomepatron2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homebecomepatron2(inputs)
	if (locale === "es") return es_homebecomepatron2(inputs)
	return zh_homebecomepatron2(inputs)
});
export { homebecomepatron2 as "homeBecomePatron" }