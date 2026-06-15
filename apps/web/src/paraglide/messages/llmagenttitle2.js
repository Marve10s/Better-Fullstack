/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmagenttitle2Inputs */

const en_llmagenttitle2 = /** @type {(inputs: Llmagenttitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Give your agent the fast path.`)
};

const es_llmagenttitle2 = /** @type {(inputs: Llmagenttitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dale a tu agente la ruta rápida.`)
};

const zh_llmagenttitle2 = /** @type {(inputs: Llmagenttitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`给你的代理一条快路径。`)
};

/**
* | output |
* | --- |
* | "Give your agent the fast path." |
*
* @param {Llmagenttitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const llmagenttitle2 = /** @type {((inputs?: Llmagenttitle2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmagenttitle2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmagenttitle2(inputs)
	if (locale === "es") return es_llmagenttitle2(inputs)
	return zh_llmagenttitle2(inputs)
});
export { llmagenttitle2 as "llmAgentTitle" }