/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderenabled1Inputs */

const en_builderenabled1 = /** @type {(inputs: Builderenabled1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enabled`)
};

const es_builderenabled1 = /** @type {(inputs: Builderenabled1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Activado`)
};

const zh_builderenabled1 = /** @type {(inputs: Builderenabled1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已启用`)
};

/**
* | output |
* | --- |
* | "Enabled" |
*
* @param {Builderenabled1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderenabled1 = /** @type {((inputs?: Builderenabled1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderenabled1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderenabled1(inputs)
	if (locale === "es") return es_builderenabled1(inputs)
	return zh_builderenabled1(inputs)
});
export { builderenabled1 as "builderEnabled" }