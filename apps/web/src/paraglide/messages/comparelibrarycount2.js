/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Comparelibrarycount2Inputs */

const en_comparelibrarycount2 = /** @type {(inputs: Comparelibrarycount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} libraries`)
};

const es_comparelibrarycount2 = /** @type {(inputs: Comparelibrarycount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} librerías`)
};

const zh_comparelibrarycount2 = /** @type {(inputs: Comparelibrarycount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 个库`)
};

/**
* | output |
* | --- |
* | "{count} libraries" |
*
* @param {Comparelibrarycount2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const comparelibrarycount2 = /** @type {((inputs: Comparelibrarycount2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparelibrarycount2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparelibrarycount2(inputs)
	if (locale === "es") return es_comparelibrarycount2(inputs)
	return zh_comparelibrarycount2(inputs)
});
export { comparelibrarycount2 as "compareLibraryCount" }