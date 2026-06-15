/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildergroupedaddons2Inputs */

const en_buildergroupedaddons2 = /** @type {(inputs: Buildergroupedaddons2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Grouped add-ons:`)
};

const es_buildergroupedaddons2 = /** @type {(inputs: Buildergroupedaddons2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add-ons agrupados:`)
};

const zh_buildergroupedaddons2 = /** @type {(inputs: Buildergroupedaddons2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`分组 add-ons：`)
};

/**
* | output |
* | --- |
* | "Grouped add-ons:" |
*
* @param {Buildergroupedaddons2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const buildergroupedaddons2 = /** @type {((inputs?: Buildergroupedaddons2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildergroupedaddons2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildergroupedaddons2(inputs)
	if (locale === "es") return es_buildergroupedaddons2(inputs)
	return zh_buildergroupedaddons2(inputs)
});
export { buildergroupedaddons2 as "builderGroupedAddons" }