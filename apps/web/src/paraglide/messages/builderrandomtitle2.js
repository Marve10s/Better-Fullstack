/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrandomtitle2Inputs */

const en_builderrandomtitle2 = /** @type {(inputs: Builderrandomtitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generate a random stack`)
};

const es_builderrandomtitle2 = /** @type {(inputs: Builderrandomtitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generar un stack aleatorio`)
};

const zh_builderrandomtitle2 = /** @type {(inputs: Builderrandomtitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成随机 stack`)
};

/**
* | output |
* | --- |
* | "Generate a random stack" |
*
* @param {Builderrandomtitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderrandomtitle2 = /** @type {((inputs?: Builderrandomtitle2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrandomtitle2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderrandomtitle2(inputs)
	if (locale === "es") return es_builderrandomtitle2(inputs)
	return zh_builderrandomtitle2(inputs)
});
export { builderrandomtitle2 as "builderRandomTitle" }