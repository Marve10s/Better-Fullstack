/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpdocs1Inputs */

const en_mcpdocs1 = /** @type {(inputs: Mcpdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Docs`)
};

const es_mcpdocs1 = /** @type {(inputs: Mcpdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Docs`)
};

const zh_mcpdocs1 = /** @type {(inputs: Mcpdocs1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`文档`)
};

/**
* | output |
* | --- |
* | "Docs" |
*
* @param {Mcpdocs1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpdocs1 = /** @type {((inputs?: Mcpdocs1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpdocs1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpdocs1(inputs)
	if (locale === "es") return es_mcpdocs1(inputs)
	return zh_mcpdocs1(inputs)
});
export { mcpdocs1 as "mcpDocs" }