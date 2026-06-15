/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpstatreadableresources3Inputs */

const en_mcpstatreadableresources3 = /** @type {(inputs: Mcpstatreadableresources3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`readable resources`)
};

const es_mcpstatreadableresources3 = /** @type {(inputs: Mcpstatreadableresources3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`recursos legibles`)
};

const zh_mcpstatreadableresources3 = /** @type {(inputs: Mcpstatreadableresources3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可读资源`)
};

/**
* | output |
* | --- |
* | "readable resources" |
*
* @param {Mcpstatreadableresources3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpstatreadableresources3 = /** @type {((inputs?: Mcpstatreadableresources3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpstatreadableresources3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpstatreadableresources3(inputs)
	if (locale === "es") return es_mcpstatreadableresources3(inputs)
	return zh_mcpstatreadableresources3(inputs)
});
export { mcpstatreadableresources3 as "mcpStatReadableResources" }