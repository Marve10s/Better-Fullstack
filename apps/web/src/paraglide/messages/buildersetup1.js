/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildersetup1Inputs */

const en_buildersetup1 = /** @type {(inputs: Buildersetup1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`setup`)
};

const es_buildersetup1 = /** @type {(inputs: Buildersetup1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`configuración`)
};

const zh_buildersetup1 = /** @type {(inputs: Buildersetup1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`设置`)
};

/**
* | output |
* | --- |
* | "setup" |
*
* @param {Buildersetup1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const buildersetup1 = /** @type {((inputs?: Buildersetup1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildersetup1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildersetup1(inputs)
	if (locale === "es") return es_buildersetup1(inputs)
	return zh_buildersetup1(inputs)
});
export { buildersetup1 as "builderSetup" }