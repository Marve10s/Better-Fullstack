/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homereadywhenyouare4Inputs */

const en_homereadywhenyouare4 = /** @type {(inputs: Homereadywhenyouare4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ready when you are`)
};

const es_homereadywhenyouare4 = /** @type {(inputs: Homereadywhenyouare4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`listo cuando tú lo estés`)
};

const zh_homereadywhenyouare4 = /** @type {(inputs: Homereadywhenyouare4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`随时就绪`)
};

/**
* | output |
* | --- |
* | "ready when you are" |
*
* @param {Homereadywhenyouare4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homereadywhenyouare4 = /** @type {((inputs?: Homereadywhenyouare4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homereadywhenyouare4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homereadywhenyouare4(inputs)
	if (locale === "es") return es_homereadywhenyouare4(inputs)
	return zh_homereadywhenyouare4(inputs)
});
export { homereadywhenyouare4 as "homeReadyWhenYouAre" }