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

const ja_compareprovidercount2 = /** @type {(inputs: Compareprovidercount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} プロバイダー`)
};

const ko_compareprovidercount2 = /** @type {(inputs: Compareprovidercount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 제공자`)
};

const zh_hant1_compareprovidercount2 = /** @type {(inputs: Compareprovidercount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 個提供方`)
};

const de_compareprovidercount2 = /** @type {(inputs: Compareprovidercount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} Anbieter`)
};

const fr_compareprovidercount2 = /** @type {(inputs: Compareprovidercount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} fournisseurs`)
};

/**
* | output |
* | --- |
* | "{count} providers" |
*
* @param {Compareprovidercount2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const compareprovidercount2 = /** @type {((inputs: Compareprovidercount2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareprovidercount2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_compareprovidercount2(inputs)
	if (locale === "es") return es_compareprovidercount2(inputs)
	if (locale === "zh") return zh_compareprovidercount2(inputs)
	if (locale === "ja") return ja_compareprovidercount2(inputs)
	if (locale === "ko") return ko_compareprovidercount2(inputs)
	if (locale === "zh-Hant") return zh_hant1_compareprovidercount2(inputs)
	if (locale === "de") return de_compareprovidercount2(inputs)
	return fr_compareprovidercount2(inputs)
});
export { compareprovidercount2 as "compareProviderCount" }