/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildermoreactions2Inputs */

const en_buildermoreactions2 = /** @type {(inputs: Buildermoreactions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`More actions`)
};

const es_buildermoreactions2 = /** @type {(inputs: Buildermoreactions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Más acciones`)
};

const zh_buildermoreactions2 = /** @type {(inputs: Buildermoreactions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更多操作`)
};

/**
* | output |
* | --- |
* | "More actions" |
*
* @param {Buildermoreactions2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const buildermoreactions2 = /** @type {((inputs?: Buildermoreactions2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildermoreactions2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildermoreactions2(inputs)
	if (locale === "es") return es_buildermoreactions2(inputs)
	return zh_buildermoreactions2(inputs)
});
export { buildermoreactions2 as "builderMoreActions" }