/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ agent: NonNullable<unknown> }} Llmcopyagentsetupcommand4Inputs */

const en_llmcopyagentsetupcommand4 = /** @type {(inputs: Llmcopyagentsetupcommand4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Copy ${i?.agent} setup command`)
};

const es_llmcopyagentsetupcommand4 = /** @type {(inputs: Llmcopyagentsetupcommand4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Copiar comando de configuración de ${i?.agent}`)
};

const zh_llmcopyagentsetupcommand4 = /** @type {(inputs: Llmcopyagentsetupcommand4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`复制 ${i?.agent} 设置命令`)
};

/**
* | output |
* | --- |
* | "Copy {agent} setup command" |
*
* @param {Llmcopyagentsetupcommand4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const llmcopyagentsetupcommand4 = /** @type {((inputs: Llmcopyagentsetupcommand4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmcopyagentsetupcommand4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmcopyagentsetupcommand4(inputs)
	if (locale === "es") return es_llmcopyagentsetupcommand4(inputs)
	return zh_llmcopyagentsetupcommand4(inputs)
});
export { llmcopyagentsetupcommand4 as "llmCopyAgentSetupCommand" }