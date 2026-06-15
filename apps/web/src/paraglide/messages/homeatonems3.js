/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeatonems3Inputs */

const en_homeatonems3 = /** @type {(inputs: Homeatonems3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`at 1ms per test`)
};

const es_homeatonems3 = /** @type {(inputs: Homeatonems3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`a 1ms por prueba`)
};

const zh_homeatonems3 = /** @type {(inputs: Homeatonems3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每次测试 1ms`)
};

/**
* | output |
* | --- |
* | "at 1ms per test" |
*
* @param {Homeatonems3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homeatonems3 = /** @type {((inputs?: Homeatonems3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeatonems3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homeatonems3(inputs)
	if (locale === "es") return es_homeatonems3(inputs)
	return zh_homeatonems3(inputs)
});
export { homeatonems3 as "homeAtOneMs" }