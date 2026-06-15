/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildernext1Inputs */

const en_buildernext1 = /** @type {(inputs: Buildernext1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next`)
};

const es_buildernext1 = /** @type {(inputs: Buildernext1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Siguiente`)
};

const zh_buildernext1 = /** @type {(inputs: Buildernext1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`下一步`)
};

/**
* | output |
* | --- |
* | "Next" |
*
* @param {Buildernext1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const buildernext1 = /** @type {((inputs?: Buildernext1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildernext1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildernext1(inputs)
	if (locale === "es") return es_buildernext1(inputs)
	return zh_buildernext1(inputs)
});
export { buildernext1 as "builderNext" }