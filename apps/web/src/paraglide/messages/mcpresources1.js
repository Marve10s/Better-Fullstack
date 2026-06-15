/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpresources1Inputs */

const en_mcpresources1 = /** @type {(inputs: Mcpresources1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`readable resources`)
};

const es_mcpresources1 = /** @type {(inputs: Mcpresources1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`recursos legibles`)
};

const zh_mcpresources1 = /** @type {(inputs: Mcpresources1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可读资源`)
};

/**
* | output |
* | --- |
* | "readable resources" |
*
* @param {Mcpresources1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpresources1 = /** @type {((inputs?: Mcpresources1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpresources1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpresources1(inputs)
	if (locale === "es") return es_mcpresources1(inputs)
	return zh_mcpresources1(inputs)
});
export { mcpresources1 as "mcpResources" }