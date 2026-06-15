/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpinstallfor2Inputs */

const en_mcpinstallfor2 = /** @type {(inputs: Mcpinstallfor2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Install for`)
};

const es_mcpinstallfor2 = /** @type {(inputs: Mcpinstallfor2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Instalar para`)
};

const zh_mcpinstallfor2 = /** @type {(inputs: Mcpinstallfor2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`安装到`)
};

/**
* | output |
* | --- |
* | "Install for" |
*
* @param {Mcpinstallfor2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpinstallfor2 = /** @type {((inputs?: Mcpinstallfor2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpinstallfor2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpinstallfor2(inputs)
	if (locale === "es") return es_mcpinstallfor2(inputs)
	return zh_mcpinstallfor2(inputs)
});
export { mcpinstallfor2 as "mcpInstallFor" }