/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Buildershowmore2Inputs */

const en_buildershowmore2 = /** @type {(inputs: Buildershowmore2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Show ${i?.count} more`)
};

const es_buildershowmore2 = /** @type {(inputs: Buildershowmore2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Mostrar ${i?.count} más`)
};

const zh_buildershowmore2 = /** @type {(inputs: Buildershowmore2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`再显示 ${i?.count} 个`)
};

const ja_buildershowmore2 = /** @type {(inputs: Buildershowmore2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`あと ${i?.count} 件を表示`)
};

const ko_buildershowmore2 = /** @type {(inputs: Buildershowmore2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count}개 더 보기`)
};

const zh_hant1_buildershowmore2 = /** @type {(inputs: Buildershowmore2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`再顯示 ${i?.count} 個`)
};

const de_buildershowmore2 = /** @type {(inputs: Buildershowmore2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} weitere anzeigen`)
};

const fr_buildershowmore2 = /** @type {(inputs: Buildershowmore2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Afficher ${i?.count} de plus`)
};

const uk_buildershowmore2 = /** @type {(inputs: Buildershowmore2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Показати ще ${i?.count}`)
};

/**
* | output |
* | --- |
* | "Show {count} more" |
*
* @param {Buildershowmore2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildershowmore2 = /** @type {((inputs: Buildershowmore2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildershowmore2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildershowmore2(inputs)
	if (locale === "zh") return zh_buildershowmore2(inputs)
	if (locale === "ja") return ja_buildershowmore2(inputs)
	if (locale === "ko") return ko_buildershowmore2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildershowmore2(inputs)
	if (locale === "de") return de_buildershowmore2(inputs)
	if (locale === "fr") return fr_buildershowmore2(inputs)
	if (locale === "uk") return uk_buildershowmore2(inputs)
	return en_buildershowmore2(inputs)
});
export { buildershowmore2 as "builderShowMore" }