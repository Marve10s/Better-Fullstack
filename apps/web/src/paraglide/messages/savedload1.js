/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedload1Inputs */

const en_savedload1 = /** @type {(inputs: Savedload1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Load`)
};

const es_savedload1 = /** @type {(inputs: Savedload1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cargar`)
};

const zh_savedload1 = /** @type {(inputs: Savedload1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`加载`)
};

/**
* | output |
* | --- |
* | "Load" |
*
* @param {Savedload1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const savedload1 = /** @type {((inputs?: Savedload1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedload1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedload1(inputs)
	if (locale === "es") return es_savedload1(inputs)
	return zh_savedload1(inputs)
});
export { savedload1 as "savedLoad" }