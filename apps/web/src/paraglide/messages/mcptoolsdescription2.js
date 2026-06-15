/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptoolsdescription2Inputs */

const en_mcptoolsdescription2 = /** @type {(inputs: Mcptoolsdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The server exposes narrow, typed tools for guidance, schema lookup, compatibility checks, dry runs, creation, and adding features.`)
};

const es_mcptoolsdescription2 = /** @type {(inputs: Mcptoolsdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`El servidor expone herramientas tipadas y pequeñas para guía, esquema, compatibilidad, dry runs, creación y añadir funciones.`)
};

const zh_mcptoolsdescription2 = /** @type {(inputs: Mcptoolsdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`服务器提供聚焦且有类型的工具，用于指南、schema 查询、兼容性检查、dry run、创建和添加功能。`)
};

/**
* | output |
* | --- |
* | "The server exposes narrow, typed tools for guidance, schema lookup, compatibility checks, dry runs, creation, and adding features." |
*
* @param {Mcptoolsdescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcptoolsdescription2 = /** @type {((inputs?: Mcptoolsdescription2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptoolsdescription2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcptoolsdescription2(inputs)
	if (locale === "es") return es_mcptoolsdescription2(inputs)
	return zh_mcptoolsdescription2(inputs)
});
export { mcptoolsdescription2 as "mcpToolsDescription" }