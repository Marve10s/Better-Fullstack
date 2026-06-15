/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptoolschemadescription3Inputs */

const en_mcptoolschemadescription3 = /** @type {(inputs: Mcptoolschemadescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Valid options for any category, filterable by ecosystem`)
};

const es_mcptoolschemadescription3 = /** @type {(inputs: Mcptoolschemadescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Opciones válidas para cualquier categoría, filtrables por ecosistema`)
};

const zh_mcptoolschemadescription3 = /** @type {(inputs: Mcptoolschemadescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`任意类别的有效选项，可按生态筛选`)
};

/**
* | output |
* | --- |
* | "Valid options for any category, filterable by ecosystem" |
*
* @param {Mcptoolschemadescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcptoolschemadescription3 = /** @type {((inputs?: Mcptoolschemadescription3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptoolschemadescription3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcptoolschemadescription3(inputs)
	if (locale === "es") return es_mcptoolschemadescription3(inputs)
	return zh_mcptoolschemadescription3(inputs)
});
export { mcptoolschemadescription3 as "mcpToolSchemaDescription" }