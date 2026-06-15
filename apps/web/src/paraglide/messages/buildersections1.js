/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildersections1Inputs */

const en_buildersections1 = /** @type {(inputs: Buildersections1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sections`)
};

const es_buildersections1 = /** @type {(inputs: Buildersections1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Secciones`)
};

const zh_buildersections1 = /** @type {(inputs: Buildersections1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`分区`)
};

/**
* | output |
* | --- |
* | "Sections" |
*
* @param {Buildersections1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const buildersections1 = /** @type {((inputs?: Buildersections1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildersections1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildersections1(inputs)
	if (locale === "es") return es_buildersections1(inputs)
	return zh_buildersections1(inputs)
});
export { buildersections1 as "builderSections" }