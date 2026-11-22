/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Compareormcount2Inputs */



/**
* | output |
* | --- |
* | "{count} ORMs" |
*
* @param {Compareormcount2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const compareormcount2 = /** @type {((inputs: Compareormcount2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareormcount2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`${i?.count} ORMs`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`${i?.count} 个 ORM`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.count} ORM`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`${i?.count} ORM`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`${i?.count} 個 ORM`)
	if (locale === "de") return /** @type {LocalizedString} */ (`${i?.count} ORMs`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`${i?.count} ORM`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`${i?.count} ORM`)
	return /** @type {LocalizedString} */ (`${i?.count} ORMs`)
});
export { compareormcount2 as "compareOrmCount" }