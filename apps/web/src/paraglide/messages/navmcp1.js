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

const ja_navmcp1 = /** @type {(inputs: Navmcp1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`MCP`)
};

const ko_navmcp1 = /** @type {(inputs: Navmcp1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`MCP`)
};

const zh_hant1_navmcp1 = /** @type {(inputs: Navmcp1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`MCP`)
};

const de_navmcp1 = /** @type {(inputs: Navmcp1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`MCP`)
};

const fr_navmcp1 = /** @type {(inputs: Navmcp1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`MCP`)
};

const uk_navmcp1 = /** @type {(inputs: Navmcp1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`MCP`)
};

/**
* | output |
* | --- |
* | "MCP" |
*
* @param {Navmcp1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navmcp1 = /** @type {((inputs?: Navmcp1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navmcp1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navmcp1(inputs)
	if (locale === "es") return es_navmcp1(inputs)
	if (locale === "zh") return zh_navmcp1(inputs)
	if (locale === "ja") return ja_navmcp1(inputs)
	if (locale === "ko") return ko_navmcp1(inputs)
	if (locale === "zh-Hant") return zh_hant1_navmcp1(inputs)
	if (locale === "de") return de_navmcp1(inputs)
	if (locale === "fr") return fr_navmcp1(inputs)
	return uk_navmcp1(inputs)
});
export { navmcp1 as "navMcp" }