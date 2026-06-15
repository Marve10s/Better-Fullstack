/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ mantissa: NonNullable<unknown>, exponent: NonNullable<unknown> }} Homefactsand2Inputs */

const en_homefactsand2 = /** @type {(inputs: Homefactsand2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.mantissa} × 10^${i?.exponent}× more combinations than grains of sand in the observable universe`)
};

const es_homefactsand2 = /** @type {(inputs: Homefactsand2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.mantissa} × 10^${i?.exponent}× más combinaciones que granos de arena en el universo observable`)
};

const zh_homefactsand2 = /** @type {(inputs: Homefactsand2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`组合数比可观测宇宙中的沙粒多 ${i?.mantissa} × 10^${i?.exponent}×`)
};

/**
* | output |
* | --- |
* | "{mantissa} × 10^{exponent}× more combinations than grains of sand in the observable universe" |
*
* @param {Homefactsand2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homefactsand2 = /** @type {((inputs: Homefactsand2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homefactsand2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homefactsand2(inputs)
	if (locale === "es") return es_homefactsand2(inputs)
	return zh_homefactsand2(inputs)
});
export { homefactsand2 as "homeFactSand" }