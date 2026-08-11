/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ecosystem: NonNullable<unknown> }} Buildernewempty2Inputs */

const en_buildernewempty2 = /** @type {(inputs: Buildernewempty2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`There are no additions from this release in ${i?.ecosystem}.`)
};

const es_buildernewempty2 = /** @type {(inputs: Buildernewempty2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`No hay novedades de esta versión en ${i?.ecosystem}.`)
};

const zh_buildernewempty2 = /** @type {(inputs: Buildernewempty2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} 中没有本次发布的新增内容。`)
};

const ja_buildernewempty2 = /** @type {(inputs: Buildernewempty2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} にはこのリリースの追加項目はありません。`)
};

const ko_buildernewempty2 = /** @type {(inputs: Buildernewempty2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem}에는 이번 릴리스에서 추가된 항목이 없습니다.`)
};

const zh_hant1_buildernewempty2 = /** @type {(inputs: Buildernewempty2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} 中沒有本次發布的新內容。`)
};

const de_buildernewempty2 = /** @type {(inputs: Buildernewempty2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`In ${i?.ecosystem} gibt es keine Neuerungen aus diesem Release.`)
};

const fr_buildernewempty2 = /** @type {(inputs: Buildernewempty2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Aucune nouveauté de cette version dans ${i?.ecosystem}.`)
};

const uk_buildernewempty2 = /** @type {(inputs: Buildernewempty2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`У ${i?.ecosystem} немає новинок із цього релізу.`)
};

/**
* | output |
* | --- |
* | "There are no additions from this release in {ecosystem}." |
*
* @param {Buildernewempty2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildernewempty2 = /** @type {((inputs: Buildernewempty2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildernewempty2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildernewempty2(inputs)
	if (locale === "zh") return zh_buildernewempty2(inputs)
	if (locale === "ja") return ja_buildernewempty2(inputs)
	if (locale === "ko") return ko_buildernewempty2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildernewempty2(inputs)
	if (locale === "de") return de_buildernewempty2(inputs)
	if (locale === "fr") return fr_buildernewempty2(inputs)
	if (locale === "uk") return uk_buildernewempty2(inputs)
	return en_buildernewempty2(inputs)
});
export { buildernewempty2 as "builderNewEmpty" }