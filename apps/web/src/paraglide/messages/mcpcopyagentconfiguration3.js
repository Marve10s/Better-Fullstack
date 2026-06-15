/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ agent: NonNullable<unknown> }} Mcpcopyagentconfiguration3Inputs */

const en_mcpcopyagentconfiguration3 = /** @type {(inputs: Mcpcopyagentconfiguration3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Copy ${i?.agent} configuration`)
};

const es_mcpcopyagentconfiguration3 = /** @type {(inputs: Mcpcopyagentconfiguration3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Copiar configuración de ${i?.agent}`)
};

const zh_mcpcopyagentconfiguration3 = /** @type {(inputs: Mcpcopyagentconfiguration3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`复制 ${i?.agent} 配置`)
};

/**
* | output |
* | --- |
* | "Copy {agent} configuration" |
*
* @param {Mcpcopyagentconfiguration3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpcopyagentconfiguration3 = /** @type {((inputs: Mcpcopyagentconfiguration3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpcopyagentconfiguration3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpcopyagentconfiguration3(inputs)
	if (locale === "es") return es_mcpcopyagentconfiguration3(inputs)
	return zh_mcpcopyagentconfiguration3(inputs)
});
export { mcpcopyagentconfiguration3 as "mcpCopyAgentConfiguration" }