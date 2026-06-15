/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderdisabled1Inputs */

const en_builderdisabled1 = /** @type {(inputs: Builderdisabled1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Disabled`)
};

const es_builderdisabled1 = /** @type {(inputs: Builderdisabled1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Desactivado`)
};

const zh_builderdisabled1 = /** @type {(inputs: Builderdisabled1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已禁用`)
};

/**
* | output |
* | --- |
* | "Disabled" |
*
* @param {Builderdisabled1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderdisabled1 = /** @type {((inputs?: Builderdisabled1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderdisabled1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderdisabled1(inputs)
	if (locale === "es") return es_builderdisabled1(inputs)
	return zh_builderdisabled1(inputs)
});
export { builderdisabled1 as "builderDisabled" }