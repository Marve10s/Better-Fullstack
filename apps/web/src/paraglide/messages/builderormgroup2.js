/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ecosystem: NonNullable<unknown> }} Builderormgroup2Inputs */



/**
* | output |
* | --- |
* | "{ecosystem} ORM" |
*
* @param {Builderormgroup2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderormgroup2 = /** @type {((inputs: Builderormgroup2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderormgroup2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`ORM ${i?.ecosystem}`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`${i?.ecosystem} ORM`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.ecosystem} ORM`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`${i?.ecosystem} ORM`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`${i?.ecosystem} ORM`)
	if (locale === "de") return /** @type {LocalizedString} */ (`${i?.ecosystem} ORM`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`${i?.ecosystem} ORM`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`${i?.ecosystem} ORM`)
	return /** @type {LocalizedString} */ (`${i?.ecosystem} ORM`)
});
export { builderormgroup2 as "builderOrmGroup" }