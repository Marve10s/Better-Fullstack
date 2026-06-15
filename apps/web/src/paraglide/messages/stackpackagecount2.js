/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Stackpackagecount2Inputs */

const en_stackpackagecount2 = /** @type {(inputs: Stackpackagecount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} packages`)
};

const es_stackpackagecount2 = /** @type {(inputs: Stackpackagecount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} paquetes`)
};

const zh_stackpackagecount2 = /** @type {(inputs: Stackpackagecount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 个包`)
};

/**
* | output |
* | --- |
* | "{count} packages" |
*
* @param {Stackpackagecount2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const stackpackagecount2 = /** @type {((inputs: Stackpackagecount2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Stackpackagecount2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_stackpackagecount2(inputs)
	if (locale === "es") return es_stackpackagecount2(inputs)
	return zh_stackpackagecount2(inputs)
});
export { stackpackagecount2 as "stackPackageCount" }