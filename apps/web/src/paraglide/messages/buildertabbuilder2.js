/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildertabbuilder2Inputs */

const en_buildertabbuilder2 = /** @type {(inputs: Buildertabbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Builder`)
};

const es_buildertabbuilder2 = /** @type {(inputs: Buildertabbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Constructor`)
};

const zh_buildertabbuilder2 = /** @type {(inputs: Buildertabbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`构建器`)
};

/**
* | output |
* | --- |
* | "Builder" |
*
* @param {Buildertabbuilder2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const buildertabbuilder2 = /** @type {((inputs?: Buildertabbuilder2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildertabbuilder2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildertabbuilder2(inputs)
	if (locale === "es") return es_buildertabbuilder2(inputs)
	return zh_buildertabbuilder2(inputs)
});
export { buildertabbuilder2 as "builderTabBuilder" }