/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildernewfilter2Inputs */

const en_buildernewfilter2 = /** @type {(inputs: Buildernewfilter2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`New in this release`)
};

const es_buildernewfilter2 = /** @type {(inputs: Buildernewfilter2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nuevo en esta versión`)
};

const zh_buildernewfilter2 = /** @type {(inputs: Buildernewfilter2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`本次发布的新增内容`)
};

const ja_buildernewfilter2 = /** @type {(inputs: Buildernewfilter2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`このリリースの新機能`)
};

const ko_buildernewfilter2 = /** @type {(inputs: Buildernewfilter2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이번 릴리스의 새 기능`)
};

const zh_hant1_buildernewfilter2 = /** @type {(inputs: Buildernewfilter2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`本次發布的新內容`)
};

const de_buildernewfilter2 = /** @type {(inputs: Buildernewfilter2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Neu in diesem Release`)
};

const fr_buildernewfilter2 = /** @type {(inputs: Buildernewfilter2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nouveau dans cette version`)
};

const uk_buildernewfilter2 = /** @type {(inputs: Buildernewfilter2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Нове в цьому релізі`)
};

/**
* | output |
* | --- |
* | "New in this release" |
*
* @param {Buildernewfilter2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildernewfilter2 = /** @type {((inputs?: Buildernewfilter2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildernewfilter2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildernewfilter2(inputs)
	if (locale === "zh") return zh_buildernewfilter2(inputs)
	if (locale === "ja") return ja_buildernewfilter2(inputs)
	if (locale === "ko") return ko_buildernewfilter2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildernewfilter2(inputs)
	if (locale === "de") return de_buildernewfilter2(inputs)
	if (locale === "fr") return fr_buildernewfilter2(inputs)
	if (locale === "uk") return uk_buildernewfilter2(inputs)
	return en_buildernewfilter2(inputs)
});
export { buildernewfilter2 as "builderNewFilter" }