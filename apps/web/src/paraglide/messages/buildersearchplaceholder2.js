/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ecosystem: NonNullable<unknown> }} Buildersearchplaceholder2Inputs */



/**
* | output |
* | --- |
* | "Search {ecosystem}…" |
*
* @param {Buildersearchplaceholder2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildersearchplaceholder2 = /** @type {((inputs: Buildersearchplaceholder2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildersearchplaceholder2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`Buscar en ${i?.ecosystem}…`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`搜索 ${i?.ecosystem}…`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.ecosystem} を検索…`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`${i?.ecosystem} 검색…`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`搜尋 ${i?.ecosystem}…`)
	if (locale === "de") return /** @type {LocalizedString} */ (`${i?.ecosystem} durchsuchen…`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`Rechercher dans ${i?.ecosystem}…`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`Пошук у ${i?.ecosystem}…`)
	return /** @type {LocalizedString} */ (`Search ${i?.ecosystem}…`)
});
export { buildersearchplaceholder2 as "builderSearchPlaceholder" }