/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrandom1Inputs */

const en_builderrandom1 = /** @type {(inputs: Builderrandom1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Random`)
};

const es_builderrandom1 = /** @type {(inputs: Builderrandom1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aleatorio`)
};

const zh_builderrandom1 = /** @type {(inputs: Builderrandom1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`随机`)
};

/**
* | output |
* | --- |
* | "Random" |
*
* @param {Builderrandom1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderrandom1 = /** @type {((inputs?: Builderrandom1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrandom1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderrandom1(inputs)
	if (locale === "es") return es_builderrandom1(inputs)
	return zh_builderrandom1(inputs)
});
export { builderrandom1 as "builderRandom" }