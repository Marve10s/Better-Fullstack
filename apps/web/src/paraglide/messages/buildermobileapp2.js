/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildermobileapp2Inputs */

const en_buildermobileapp2 = /** @type {(inputs: Buildermobileapp2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mobile App`)
};

const es_buildermobileapp2 = /** @type {(inputs: Buildermobileapp2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`App móvil`)
};

const zh_buildermobileapp2 = /** @type {(inputs: Buildermobileapp2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`移动应用`)
};

/**
* | output |
* | --- |
* | "Mobile App" |
*
* @param {Buildermobileapp2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const buildermobileapp2 = /** @type {((inputs?: Buildermobileapp2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildermobileapp2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildermobileapp2(inputs)
	if (locale === "es") return es_buildermobileapp2(inputs)
	return zh_buildermobileapp2(inputs)
});
export { buildermobileapp2 as "builderMobileApp" }