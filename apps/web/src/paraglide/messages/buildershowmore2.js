/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Buildershowmore2Inputs */



/**
* | output |
* | --- |
* | "Show {count} more" |
*
* @param {Buildershowmore2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildershowmore2 = /** @type {((inputs: Buildershowmore2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildershowmore2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`Mostrar ${i?.count} más`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`再显示 ${i?.count} 个`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`あと ${i?.count} 件を表示`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`${i?.count}개 더 보기`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`再顯示 ${i?.count} 個`)
	if (locale === "de") return /** @type {LocalizedString} */ (`${i?.count} weitere anzeigen`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`Afficher ${i?.count} de plus`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`Показати ще ${i?.count}`)
	return /** @type {LocalizedString} */ (`Show ${i?.count} more`)
});
export { buildershowmore2 as "builderShowMore" }