/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptoolseyebrow2Inputs */

const en_mcptoolseyebrow2 = /** @type {(inputs: Mcptoolseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`toolbox`)
};

const es_mcptoolseyebrow2 = /** @type {(inputs: Mcptoolseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`herramientas`)
};

const zh_mcptoolseyebrow2 = /** @type {(inputs: Mcptoolseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`工具箱`)
};

/**
* | output |
* | --- |
* | "toolbox" |
*
* @param {Mcptoolseyebrow2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcptoolseyebrow2 = /** @type {((inputs?: Mcptoolseyebrow2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptoolseyebrow2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcptoolseyebrow2(inputs)
	if (locale === "es") return es_mcptoolseyebrow2(inputs)
	return zh_mcptoolseyebrow2(inputs)
});
export { mcptoolseyebrow2 as "mcpToolsEyebrow" }