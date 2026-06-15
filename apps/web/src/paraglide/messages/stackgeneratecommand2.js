/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Stackgeneratecommand2Inputs */

const en_stackgeneratecommand2 = /** @type {(inputs: Stackgeneratecommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generate command`)
};

const es_stackgeneratecommand2 = /** @type {(inputs: Stackgeneratecommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generar comando`)
};

const zh_stackgeneratecommand2 = /** @type {(inputs: Stackgeneratecommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成命令`)
};

/**
* | output |
* | --- |
* | "Generate command" |
*
* @param {Stackgeneratecommand2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const stackgeneratecommand2 = /** @type {((inputs?: Stackgeneratecommand2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Stackgeneratecommand2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_stackgeneratecommand2(inputs)
	if (locale === "es") return es_stackgeneratecommand2(inputs)
	return zh_stackgeneratecommand2(inputs)
});
export { stackgeneratecommand2 as "stackGenerateCommand" }