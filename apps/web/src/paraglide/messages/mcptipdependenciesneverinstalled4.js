/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptipdependenciesneverinstalled4Inputs */

const en_mcptipdependenciesneverinstalled4 = /** @type {(inputs: Mcptipdependenciesneverinstalled4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dependencies are never installed: your agent will tell you the install command`)
};

const es_mcptipdependenciesneverinstalled4 = /** @type {(inputs: Mcptipdependenciesneverinstalled4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Las dependencias nunca se instalan: tu agente te dirá el comando de instalación`)
};

const zh_mcptipdependenciesneverinstalled4 = /** @type {(inputs: Mcptipdependenciesneverinstalled4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`依赖永远不会自动安装：你的代理会告诉你安装命令`)
};

/**
* | output |
* | --- |
* | "Dependencies are never installed: your agent will tell you the install command" |
*
* @param {Mcptipdependenciesneverinstalled4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcptipdependenciesneverinstalled4 = /** @type {((inputs?: Mcptipdependenciesneverinstalled4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptipdependenciesneverinstalled4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcptipdependenciesneverinstalled4(inputs)
	if (locale === "es") return es_mcptipdependenciesneverinstalled4(inputs)
	return zh_mcptipdependenciesneverinstalled4(inputs)
});
export { mcptipdependenciesneverinstalled4 as "mcpTipDependenciesNeverInstalled" }