/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeinfinite1Inputs */

const en_homeinfinite1 = /** @type {(inputs: Homeinfinite1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Infinite`)
};

const es_homeinfinite1 = /** @type {(inputs: Homeinfinite1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Posibilidades`)
};

const zh_homeinfinite1 = /** @type {(inputs: Homeinfinite1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`无限`)
};

/**
* | output |
* | --- |
* | "Infinite" |
*
* @param {Homeinfinite1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homeinfinite1 = /** @type {((inputs?: Homeinfinite1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeinfinite1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homeinfinite1(inputs)
	if (locale === "es") return es_homeinfinite1(inputs)
	return zh_homeinfinite1(inputs)
});
export { homeinfinite1 as "homeInfinite" }