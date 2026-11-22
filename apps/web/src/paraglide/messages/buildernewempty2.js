/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ecosystem: NonNullable<unknown> }} Buildernewempty2Inputs */



/**
* | output |
* | --- |
* | "There are no additions from this release in {ecosystem}." |
*
* @param {Buildernewempty2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildernewempty2 = /** @type {((inputs: Buildernewempty2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildernewempty2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`No hay novedades de esta versión en ${i?.ecosystem}.`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`${i?.ecosystem} 中没有本次发布的新增内容。`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.ecosystem} にはこのリリースの追加項目はありません。`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`${i?.ecosystem}에는 이번 릴리스에서 추가된 항목이 없습니다.`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`${i?.ecosystem} 中沒有本次發布的新內容。`)
	if (locale === "de") return /** @type {LocalizedString} */ (`In ${i?.ecosystem} gibt es keine Neuerungen aus diesem Release.`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`Aucune nouveauté de cette version dans ${i?.ecosystem}.`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`У ${i?.ecosystem} немає новинок із цього релізу.`)
	return /** @type {LocalizedString} */ (`There are no additions from this release in ${i?.ecosystem}.`)
});
export { buildernewempty2 as "builderNewEmpty" }