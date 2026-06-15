/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navmcp1Inputs */

const en_navmcp1 = /** @type {(inputs: Navmcp1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`MCP`)
};

const es_navmcp1 = /** @type {(inputs: Navmcp1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`MCP`)
};

const zh_navmcp1 = /** @type {(inputs: Navmcp1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`MCP`)
};

/**
* | output |
* | --- |
* | "MCP" |
*
* @param {Navmcp1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const navmcp1 = /** @type {((inputs?: Navmcp1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navmcp1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navmcp1(inputs)
	if (locale === "es") return es_navmcp1(inputs)
	return zh_navmcp1(inputs)
});
export { navmcp1 as "navMcp" }