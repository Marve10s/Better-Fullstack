/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compareormsupport2Inputs */



/**
* | output |
* | --- |
* | "ORM support (Drizzle, Prisma, etc.)" |
*
* @param {Compareormsupport2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const compareormsupport2 = /** @type {((inputs?: Compareormsupport2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareormsupport2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Soporte ORM (Drizzle, Prisma, etc.)")
	if (locale === "zh") return /** @type {LocalizedString} */ ("ORM 支持（Drizzle、Prisma 等）")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ORM サポート (Drizzle、Prisma など)")
	if (locale === "ko") return /** @type {LocalizedString} */ ("ORM 지원(Drizzle, Prisma 등)")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("ORM 支援（Drizzle、Prisma 等）")
	if (locale === "de") return /** @type {LocalizedString} */ ("ORM-Unterstützung (Drizzle, Prisma usw.)")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Prise en charge ORM (Drizzle, Prisma, etc.)")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Підтримка ORM (Drizzle, Prisma тощо)")
	return /** @type {LocalizedString} */ ("ORM support (Drizzle, Prisma, etc.)")
});
export { compareormsupport2 as "compareOrmSupport" }