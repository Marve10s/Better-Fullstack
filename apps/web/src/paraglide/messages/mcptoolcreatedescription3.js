/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptoolcreatedescription3Inputs */

const en_mcptoolcreatedescription3 = /** @type {(inputs: Mcptoolcreatedescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Scaffold a new project to disk`)
};

const es_mcptoolcreatedescription3 = /** @type {(inputs: Mcptoolcreatedescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Crea un proyecto nuevo en disco`)
};

const zh_mcptoolcreatedescription3 = /** @type {(inputs: Mcptoolcreatedescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`将新项目生成到磁盘`)
};

/**
* | output |
* | --- |
* | "Scaffold a new project to disk" |
*
* @param {Mcptoolcreatedescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcptoolcreatedescription3 = /** @type {((inputs?: Mcptoolcreatedescription3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptoolcreatedescription3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcptoolcreatedescription3(inputs)
	if (locale === "es") return es_mcptoolcreatedescription3(inputs)
	return zh_mcptoolcreatedescription3(inputs)
});
export { mcptoolcreatedescription3 as "mcpToolCreateDescription" }