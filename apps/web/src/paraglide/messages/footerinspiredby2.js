/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footerinspiredby2Inputs */

const en_footerinspiredby2 = /** @type {(inputs: Footerinspiredby2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Originally inspired by`)
};

const es_footerinspiredby2 = /** @type {(inputs: Footerinspiredby2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Inspirado originalmente por`)
};

const zh_footerinspiredby2 = /** @type {(inputs: Footerinspiredby2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最初灵感来自`)
};

/**
* | output |
* | --- |
* | "Originally inspired by" |
*
* @param {Footerinspiredby2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const footerinspiredby2 = /** @type {((inputs?: Footerinspiredby2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footerinspiredby2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_footerinspiredby2(inputs)
	if (locale === "es") return es_footerinspiredby2(inputs)
	return zh_footerinspiredby2(inputs)
});
export { footerinspiredby2 as "footerInspiredBy" }