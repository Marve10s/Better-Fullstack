/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmpathclidetail3Inputs */

const en_llmpathclidetail3 = /** @type {(inputs: Llmpathclidetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`agent composes the Better-Fullstack CLI command`)
};

const es_llmpathclidetail3 = /** @type {(inputs: Llmpathclidetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`el agente compone el comando CLI de Better-Fullstack`)
};

const zh_llmpathclidetail3 = /** @type {(inputs: Llmpathclidetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理组合 Better-Fullstack CLI 命令`)
};

/**
* | output |
* | --- |
* | "agent composes the Better-Fullstack CLI command" |
*
* @param {Llmpathclidetail3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const llmpathclidetail3 = /** @type {((inputs?: Llmpathclidetail3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmpathclidetail3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmpathclidetail3(inputs)
	if (locale === "es") return es_llmpathclidetail3(inputs)
	return zh_llmpathclidetail3(inputs)
});
export { llmpathclidetail3 as "llmPathCliDetail" }