/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Comparedatabasecount2Inputs */

const en_comparedatabasecount2 = /** @type {(inputs: Comparedatabasecount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} databases`)
};

const es_comparedatabasecount2 = /** @type {(inputs: Comparedatabasecount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} bases de datos`)
};

const zh_comparedatabasecount2 = /** @type {(inputs: Comparedatabasecount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 个数据库`)
};

/**
* | output |
* | --- |
* | "{count} databases" |
*
* @param {Comparedatabasecount2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const comparedatabasecount2 = /** @type {((inputs: Comparedatabasecount2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparedatabasecount2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparedatabasecount2(inputs)
	if (locale === "es") return es_comparedatabasecount2(inputs)
	return zh_comparedatabasecount2(inputs)
});
export { comparedatabasecount2 as "compareDatabaseCount" }