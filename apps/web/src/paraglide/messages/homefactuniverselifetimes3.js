/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ mantissa: NonNullable<unknown>, exponent: NonNullable<unknown> }} Homefactuniverselifetimes3Inputs */

const en_homefactuniverselifetimes3 = /** @type {(inputs: Homefactuniverselifetimes3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.mantissa} × 10^${i?.exponent} universe lifetimes to test all combinations`)
};

const es_homefactuniverselifetimes3 = /** @type {(inputs: Homefactuniverselifetimes3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.mantissa} × 10^${i?.exponent} vidas del universo para probar todas las combinaciones`)
};

const zh_homefactuniverselifetimes3 = /** @type {(inputs: Homefactuniverselifetimes3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`测试所有组合需要 ${i?.mantissa} × 10^${i?.exponent} 个宇宙寿命`)
};

/**
* | output |
* | --- |
* | "{mantissa} × 10^{exponent} universe lifetimes to test all combinations" |
*
* @param {Homefactuniverselifetimes3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homefactuniverselifetimes3 = /** @type {((inputs: Homefactuniverselifetimes3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homefactuniverselifetimes3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homefactuniverselifetimes3(inputs)
	if (locale === "es") return es_homefactuniverselifetimes3(inputs)
	return zh_homefactuniverselifetimes3(inputs)
});
export { homefactuniverselifetimes3 as "homeFactUniverseLifetimes" }