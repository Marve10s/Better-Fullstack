/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpviewbenchmark2Inputs */

const en_mcpviewbenchmark2 = /** @type {(inputs: Mcpviewbenchmark2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`View benchmark`)
};

const es_mcpviewbenchmark2 = /** @type {(inputs: Mcpviewbenchmark2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ver benchmark`)
};

const zh_mcpviewbenchmark2 = /** @type {(inputs: Mcpviewbenchmark2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`查看 benchmark`)
};

/**
* | output |
* | --- |
* | "View benchmark" |
*
* @param {Mcpviewbenchmark2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpviewbenchmark2 = /** @type {((inputs?: Mcpviewbenchmark2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpviewbenchmark2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpviewbenchmark2(inputs)
	if (locale === "es") return es_mcpviewbenchmark2(inputs)
	return zh_mcpviewbenchmark2(inputs)
});
export { mcpviewbenchmark2 as "mcpViewBenchmark" }