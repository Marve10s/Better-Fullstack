/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpterminalheader2Inputs */

const en_mcpterminalheader2 = /** @type {(inputs: Mcpterminalheader2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`agent session`)
};

const es_mcpterminalheader2 = /** @type {(inputs: Mcpterminalheader2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`sesión del agente`)
};

const zh_mcpterminalheader2 = /** @type {(inputs: Mcpterminalheader2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理会话`)
};

/**
* | output |
* | --- |
* | "agent session" |
*
* @param {Mcpterminalheader2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpterminalheader2 = /** @type {((inputs?: Mcpterminalheader2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpterminalheader2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpterminalheader2(inputs)
	if (locale === "es") return es_mcpterminalheader2(inputs)
	return zh_mcpterminalheader2(inputs)
});
export { mcpterminalheader2 as "mcpTerminalHeader" }