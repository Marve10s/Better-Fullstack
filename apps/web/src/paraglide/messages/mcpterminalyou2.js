/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpterminalyou2Inputs */

const en_mcpterminalyou2 = /** @type {(inputs: Mcpterminalyou2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`you:`)
};

const es_mcpterminalyou2 = /** @type {(inputs: Mcpterminalyou2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`tú:`)
};

const zh_mcpterminalyou2 = /** @type {(inputs: Mcpterminalyou2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`你：`)
};

/**
* | output |
* | --- |
* | "you:" |
*
* @param {Mcpterminalyou2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpterminalyou2 = /** @type {((inputs?: Mcpterminalyou2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpterminalyou2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpterminalyou2(inputs)
	if (locale === "es") return es_mcpterminalyou2(inputs)
	return zh_mcpterminalyou2(inputs)
});
export { mcpterminalyou2 as "mcpTerminalYou" }