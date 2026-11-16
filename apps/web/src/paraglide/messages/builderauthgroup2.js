/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ecosystem: NonNullable<unknown> }} Builderauthgroup2Inputs */



/**
* | output |
* | --- |
* | "{ecosystem} Auth" |
*
* @param {Builderauthgroup2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderauthgroup2 = /** @type {((inputs: Builderauthgroup2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderauthgroup2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`Auth ${i?.ecosystem}`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`${i?.ecosystem} 认证`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.ecosystem} 認証`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`${i?.ecosystem} 인증`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`${i?.ecosystem} 認證`)
	if (locale === "de") return /** @type {LocalizedString} */ (`${i?.ecosystem} Auth`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`${i?.ecosystem} Authentification`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`${i?.ecosystem}: автентифікація`)
	return /** @type {LocalizedString} */ (`${i?.ecosystem} Auth`)
});
export { builderauthgroup2 as "builderAuthGroup" }