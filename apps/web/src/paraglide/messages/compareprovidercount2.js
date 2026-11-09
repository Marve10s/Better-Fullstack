/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Compareprovidercount2Inputs */



/**
* | output |
* | --- |
* | "{count} providers" |
*
* @param {Compareprovidercount2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const compareprovidercount2 = /** @type {((inputs: Compareprovidercount2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareprovidercount2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`${i?.count} proveedores`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`${i?.count} 个提供方`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.count} プロバイダー`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`${i?.count} 제공자`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`${i?.count} 個提供方`)
	if (locale === "de") return /** @type {LocalizedString} */ (`${i?.count} Anbieter`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`${i?.count} fournisseurs`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`${i?.count} провайдерів`)
	return /** @type {LocalizedString} */ (`${i?.count} providers`)
});
export { compareprovidercount2 as "compareProviderCount" }