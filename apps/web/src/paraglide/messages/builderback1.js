/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderback1Inputs */

const en_builderback1 = /** @type {(inputs: Builderback1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Back`)
};

const es_builderback1 = /** @type {(inputs: Builderback1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Atrás`)
};

const zh_builderback1 = /** @type {(inputs: Builderback1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`返回`)
};

/**
* | output |
* | --- |
* | "Back" |
*
* @param {Builderback1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderback1 = /** @type {((inputs?: Builderback1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderback1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderback1(inputs)
	if (locale === "es") return es_builderback1(inputs)
	return zh_builderback1(inputs)
});
export { builderback1 as "builderBack" }