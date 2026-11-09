/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ecosystem: NonNullable<unknown> }} Builderbackendgroup2Inputs */



/**
* | output |
* | --- |
* | "{ecosystem} Backend" |
*
* @param {Builderbackendgroup2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderbackendgroup2 = /** @type {((inputs: Builderbackendgroup2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderbackendgroup2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`Backend ${i?.ecosystem}`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`${i?.ecosystem} 后端`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.ecosystem} バックエンド`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`${i?.ecosystem} 백엔드`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`${i?.ecosystem} 後端`)
	if (locale === "de") return /** @type {LocalizedString} */ (`${i?.ecosystem} Backend`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`${i?.ecosystem} Back-end`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`${i?.ecosystem}: бекенд`)
	return /** @type {LocalizedString} */ (`${i?.ecosystem} Backend`)
});
export { builderbackendgroup2 as "builderBackendGroup" }