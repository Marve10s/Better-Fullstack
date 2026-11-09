/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ecosystem: NonNullable<unknown> }} Builderfrontendgroup2Inputs */



/**
* | output |
* | --- |
* | "{ecosystem} Frontend" |
*
* @param {Builderfrontendgroup2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderfrontendgroup2 = /** @type {((inputs: Builderfrontendgroup2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderfrontendgroup2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`Frontend ${i?.ecosystem}`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`${i?.ecosystem} 前端`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.ecosystem} フロントエンド`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`${i?.ecosystem} 프런트엔드`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`${i?.ecosystem} 前端`)
	if (locale === "de") return /** @type {LocalizedString} */ (`${i?.ecosystem} Frontend`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`${i?.ecosystem} Frontend`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`${i?.ecosystem}: фронтенд`)
	return /** @type {LocalizedString} */ (`${i?.ecosystem} Frontend`)
});
export { builderfrontendgroup2 as "builderFrontendGroup" }