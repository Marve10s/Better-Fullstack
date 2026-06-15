/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Hometestimonialseyebrow2Inputs */

const en_hometestimonialseyebrow2 = /** @type {(inputs: Hometestimonialseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`on the record`)
};

const es_hometestimonialseyebrow2 = /** @type {(inputs: Hometestimonialseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`en público`)
};

const zh_hometestimonialseyebrow2 = /** @type {(inputs: Hometestimonialseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`公开评价`)
};

/**
* | output |
* | --- |
* | "on the record" |
*
* @param {Hometestimonialseyebrow2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const hometestimonialseyebrow2 = /** @type {((inputs?: Hometestimonialseyebrow2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Hometestimonialseyebrow2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_hometestimonialseyebrow2(inputs)
	if (locale === "es") return es_hometestimonialseyebrow2(inputs)
	return zh_hometestimonialseyebrow2(inputs)
});
export { hometestimonialseyebrow2 as "homeTestimonialsEyebrow" }