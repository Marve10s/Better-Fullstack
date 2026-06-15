/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecontributorseyebrow2Inputs */

const en_homecontributorseyebrow2 = /** @type {(inputs: Homecontributorseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`contributors`)
};

const es_homecontributorseyebrow2 = /** @type {(inputs: Homecontributorseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`contribuidores`)
};

const zh_homecontributorseyebrow2 = /** @type {(inputs: Homecontributorseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`贡献者`)
};

/**
* | output |
* | --- |
* | "contributors" |
*
* @param {Homecontributorseyebrow2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homecontributorseyebrow2 = /** @type {((inputs?: Homecontributorseyebrow2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecontributorseyebrow2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homecontributorseyebrow2(inputs)
	if (locale === "es") return es_homecontributorseyebrow2(inputs)
	return zh_homecontributorseyebrow2(inputs)
});
export { homecontributorseyebrow2 as "homeContributorsEyebrow" }