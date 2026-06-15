/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderdefault1Inputs */

const en_builderdefault1 = /** @type {(inputs: Builderdefault1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Default`)
};

const es_builderdefault1 = /** @type {(inputs: Builderdefault1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Predeterminado`)
};

const zh_builderdefault1 = /** @type {(inputs: Builderdefault1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`默认`)
};

/**
* | output |
* | --- |
* | "Default" |
*
* @param {Builderdefault1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderdefault1 = /** @type {((inputs?: Builderdefault1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderdefault1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderdefault1(inputs)
	if (locale === "es") return es_builderdefault1(inputs)
	return zh_builderdefault1(inputs)
});
export { builderdefault1 as "builderDefault" }