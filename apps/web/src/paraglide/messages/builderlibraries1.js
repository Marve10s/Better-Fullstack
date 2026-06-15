/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderlibraries1Inputs */

const en_builderlibraries1 = /** @type {(inputs: Builderlibraries1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Libraries`)
};

const es_builderlibraries1 = /** @type {(inputs: Builderlibraries1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Librerías`)
};

const zh_builderlibraries1 = /** @type {(inputs: Builderlibraries1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`库`)
};

/**
* | output |
* | --- |
* | "Libraries" |
*
* @param {Builderlibraries1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderlibraries1 = /** @type {((inputs?: Builderlibraries1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderlibraries1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderlibraries1(inputs)
	if (locale === "es") return es_builderlibraries1(inputs)
	return zh_builderlibraries1(inputs)
});
export { builderlibraries1 as "builderLibraries" }