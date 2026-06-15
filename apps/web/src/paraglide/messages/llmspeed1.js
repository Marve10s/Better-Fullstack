/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmspeed1Inputs */

const en_llmspeed1 = /** @type {(inputs: Llmspeed1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Speed`)
};

const es_llmspeed1 = /** @type {(inputs: Llmspeed1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Velocidad`)
};

const zh_llmspeed1 = /** @type {(inputs: Llmspeed1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`速度`)
};

/**
* | output |
* | --- |
* | "Speed" |
*
* @param {Llmspeed1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const llmspeed1 = /** @type {((inputs?: Llmspeed1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmspeed1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmspeed1(inputs)
	if (locale === "es") return es_llmspeed1(inputs)
	return zh_llmspeed1(inputs)
});
export { llmspeed1 as "llmSpeed" }