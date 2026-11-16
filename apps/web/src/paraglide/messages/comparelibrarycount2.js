/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Comparelibrarycount2Inputs */



/**
* | output |
* | --- |
* | "{count} libraries" |
*
* @param {Comparelibrarycount2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const comparelibrarycount2 = /** @type {((inputs: Comparelibrarycount2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparelibrarycount2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`${i?.count} librerías`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`${i?.count} 个库`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.count} ライブラリ`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`${i?.count} 라이브러리`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`${i?.count} 個庫`)
	if (locale === "de") return /** @type {LocalizedString} */ (`${i?.count} Bibliotheken`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`${i?.count} bibliothèques`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`${i?.count} бібліотек`)
	return /** @type {LocalizedString} */ (`${i?.count} libraries`)
});
export { comparelibrarycount2 as "compareLibraryCount" }