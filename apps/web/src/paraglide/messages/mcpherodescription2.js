/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpherodescription2Inputs */

const en_mcpherodescription2 = /** @type {(inputs: Mcpherodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Give coding agents structured access to Better Fullstack. They can inspect options, validate combinations, preview file trees, and scaffold projects without guessing CLI flags.`)
};

const es_mcpherodescription2 = /** @type {(inputs: Mcpherodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Da a los agentes de programación acceso estructurado a Better Fullstack. Pueden inspeccionar opciones, validar combinaciones, previsualizar árboles de archivos y crear proyectos sin adivinar flags.`)
};

const zh_mcpherodescription2 = /** @type {(inputs: Mcpherodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`给编程代理结构化访问 Better Fullstack 的能力。它们可以查看选项、验证组合、预览文件树，并在不猜 CLI flags 的情况下生成项目。`)
};

/**
* | output |
* | --- |
* | "Give coding agents structured access to Better Fullstack. They can inspect options, validate combinations, preview file trees, and scaffold projects without ..." |
*
* @param {Mcpherodescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpherodescription2 = /** @type {((inputs?: Mcpherodescription2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpherodescription2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpherodescription2(inputs)
	if (locale === "es") return es_mcpherodescription2(inputs)
	return zh_mcpherodescription2(inputs)
});
export { mcpherodescription2 as "mcpHeroDescription" }