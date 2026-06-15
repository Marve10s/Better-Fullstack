/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpworkflowdescription2Inputs */

const en_mcpworkflowdescription2 = /** @type {(inputs: Mcpworkflowdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Agents use the same schema and compatibility rules as the web builder, so generated commands match what users can configure visually.`)
};

const es_mcpworkflowdescription2 = /** @type {(inputs: Mcpworkflowdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Los agentes usan el mismo esquema y reglas de compatibilidad que el constructor web.`)
};

const zh_mcpworkflowdescription2 = /** @type {(inputs: Mcpworkflowdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理使用与网页构建器相同的 schema 和兼容性规则，因此生成的命令会与可视化配置保持一致。`)
};

/**
* | output |
* | --- |
* | "Agents use the same schema and compatibility rules as the web builder, so generated commands match what users can configure visually." |
*
* @param {Mcpworkflowdescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpworkflowdescription2 = /** @type {((inputs?: Mcpworkflowdescription2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpworkflowdescription2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpworkflowdescription2(inputs)
	if (locale === "es") return es_mcpworkflowdescription2(inputs)
	return zh_mcpworkflowdescription2(inputs)
});
export { mcpworkflowdescription2 as "mcpWorkflowDescription" }