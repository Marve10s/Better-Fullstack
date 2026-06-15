/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Compareprovidercount2Inputs */

const en_compareprovidercount2 = /** @type {(inputs: Compareprovidercount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} providers`)
};

const es_compareprovidercount2 = /** @type {(inputs: Compareprovidercount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} proveedores`)
};

const zh_compareprovidercount2 = /** @type {(inputs: Compareprovidercount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 个提供方`)
};

/**
* | output |
* | --- |
* | "{count} providers" |
*
* @param {Compareprovidercount2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const compareprovidercount2 = /** @type {((inputs: Compareprovidercount2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareprovidercount2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_compareprovidercount2(inputs)
	if (locale === "es") return es_compareprovidercount2(inputs)
	return zh_compareprovidercount2(inputs)
});
export { compareprovidercount2 as "compareProviderCount" }