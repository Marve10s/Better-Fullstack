/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderpreviousstep2Inputs */

const en_builderpreviousstep2 = /** @type {(inputs: Builderpreviousstep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Previous step`)
};

const es_builderpreviousstep2 = /** @type {(inputs: Builderpreviousstep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Paso anterior`)
};

const zh_builderpreviousstep2 = /** @type {(inputs: Builderpreviousstep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上一步`)
};

/**
* | output |
* | --- |
* | "Previous step" |
*
* @param {Builderpreviousstep2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderpreviousstep2 = /** @type {((inputs?: Builderpreviousstep2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviousstep2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderpreviousstep2(inputs)
	if (locale === "es") return es_builderpreviousstep2(inputs)
	return zh_builderpreviousstep2(inputs)
});
export { builderpreviousstep2 as "builderPreviousStep" }