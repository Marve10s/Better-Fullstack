/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpresourcegettingstarteddescription4Inputs */

const en_mcpresourcegettingstarteddescription4 = /** @type {(inputs: Mcpresourcegettingstarteddescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Quick-start recipes per ecosystem`)
};

const es_mcpresourcegettingstarteddescription4 = /** @type {(inputs: Mcpresourcegettingstarteddescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Recetas quick-start por ecosistema`)
};

const zh_mcpresourcegettingstarteddescription4 = /** @type {(inputs: Mcpresourcegettingstarteddescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`按生态划分的 quick-start 配方`)
};

/**
* | output |
* | --- |
* | "Quick-start recipes per ecosystem" |
*
* @param {Mcpresourcegettingstarteddescription4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpresourcegettingstarteddescription4 = /** @type {((inputs?: Mcpresourcegettingstarteddescription4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpresourcegettingstarteddescription4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpresourcegettingstarteddescription4(inputs)
	if (locale === "es") return es_mcpresourcegettingstarteddescription4(inputs)
	return zh_mcpresourcegettingstarteddescription4(inputs)
});
export { mcpresourcegettingstarteddescription4 as "mcpResourceGettingStartedDescription" }