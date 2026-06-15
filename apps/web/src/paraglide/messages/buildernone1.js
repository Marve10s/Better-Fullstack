/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildernone1Inputs */

const en_buildernone1 = /** @type {(inputs: Buildernone1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`None`)
};

const es_buildernone1 = /** @type {(inputs: Buildernone1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ninguno`)
};

const zh_buildernone1 = /** @type {(inputs: Buildernone1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`无`)
};

/**
* | output |
* | --- |
* | "None" |
*
* @param {Buildernone1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const buildernone1 = /** @type {((inputs?: Buildernone1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildernone1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildernone1(inputs)
	if (locale === "es") return es_buildernone1(inputs)
	return zh_buildernone1(inputs)
});
export { buildernone1 as "builderNone" }