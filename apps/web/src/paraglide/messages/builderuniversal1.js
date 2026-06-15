/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderuniversal1Inputs */

const en_builderuniversal1 = /** @type {(inputs: Builderuniversal1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Universal`)
};

const es_builderuniversal1 = /** @type {(inputs: Builderuniversal1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Universal`)
};

const zh_builderuniversal1 = /** @type {(inputs: Builderuniversal1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`通用`)
};

/**
* | output |
* | --- |
* | "Universal" |
*
* @param {Builderuniversal1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderuniversal1 = /** @type {((inputs?: Builderuniversal1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderuniversal1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderuniversal1(inputs)
	if (locale === "es") return es_builderuniversal1(inputs)
	return zh_builderuniversal1(inputs)
});
export { builderuniversal1 as "builderUniversal" }