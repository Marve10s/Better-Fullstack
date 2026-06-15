/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptoolplanadditiondescription4Inputs */

const en_mcptoolplanadditiondescription4 = /** @type {(inputs: Mcptoolplanadditiondescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Validate proposed addons for an existing project`)
};

const es_mcptoolplanadditiondescription4 = /** @type {(inputs: Mcptoolplanadditiondescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Valida addons propuestos para un proyecto existente`)
};

const zh_mcptoolplanadditiondescription4 = /** @type {(inputs: Mcptoolplanadditiondescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`验证现有项目的拟添加 addons`)
};

/**
* | output |
* | --- |
* | "Validate proposed addons for an existing project" |
*
* @param {Mcptoolplanadditiondescription4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcptoolplanadditiondescription4 = /** @type {((inputs?: Mcptoolplanadditiondescription4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptoolplanadditiondescription4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcptoolplanadditiondescription4(inputs)
	if (locale === "es") return es_mcptoolplanadditiondescription4(inputs)
	return zh_mcptoolplanadditiondescription4(inputs)
});
export { mcptoolplanadditiondescription4 as "mcpToolPlanAdditionDescription" }