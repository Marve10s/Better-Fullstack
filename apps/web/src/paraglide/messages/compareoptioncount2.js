/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Compareoptioncount2Inputs */

const en_compareoptioncount2 = /** @type {(inputs: Compareoptioncount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} options`)
};

const es_compareoptioncount2 = /** @type {(inputs: Compareoptioncount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} opciones`)
};

const zh_compareoptioncount2 = /** @type {(inputs: Compareoptioncount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 个选项`)
};

/**
* | output |
* | --- |
* | "{count} options" |
*
* @param {Compareoptioncount2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const compareoptioncount2 = /** @type {((inputs: Compareoptioncount2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareoptioncount2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_compareoptioncount2(inputs)
	if (locale === "es") return es_compareoptioncount2(inputs)
	return zh_compareoptioncount2(inputs)
});
export { compareoptioncount2 as "compareOptionCount" }