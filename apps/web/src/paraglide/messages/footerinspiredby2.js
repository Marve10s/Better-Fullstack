/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footerinspiredby2Inputs */

const en_footerinspiredby2 = /** @type {(inputs: Footerinspiredby2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Originally forked from`)
};

const es_footerinspiredby2 = /** @type {(inputs: Footerinspiredby2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bifurcado originalmente de`)
};

const zh_footerinspiredby2 = /** @type {(inputs: Footerinspiredby2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最初分叉自`)
};

const ja_footerinspiredby2 = /** @type {(inputs: Footerinspiredby2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`元々フォークしたプロジェクト:`)
};

const ko_footerinspiredby2 = /** @type {(inputs: Footerinspiredby2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`원래 다음 프로젝트에서 포크됨:`)
};

const zh_hant1_footerinspiredby2 = /** @type {(inputs: Footerinspiredby2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最初分叉自`)
};

const de_footerinspiredby2 = /** @type {(inputs: Footerinspiredby2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ursprünglich geforkt von`)
};

const fr_footerinspiredby2 = /** @type {(inputs: Footerinspiredby2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Initialement forké depuis`)
};

const uk_footerinspiredby2 = /** @type {(inputs: Footerinspiredby2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Спочатку розгалужено з`)
};

/**
* | output |
* | --- |
* | "Originally forked from" |
*
* @param {Footerinspiredby2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const footerinspiredby2 = /** @type {((inputs?: Footerinspiredby2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footerinspiredby2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_footerinspiredby2(inputs)
	if (locale === "zh") return zh_footerinspiredby2(inputs)
	if (locale === "ja") return ja_footerinspiredby2(inputs)
	if (locale === "ko") return ko_footerinspiredby2(inputs)
	if (locale === "zh-Hant") return zh_hant1_footerinspiredby2(inputs)
	if (locale === "de") return de_footerinspiredby2(inputs)
	if (locale === "fr") return fr_footerinspiredby2(inputs)
	if (locale === "uk") return uk_footerinspiredby2(inputs)
	return en_footerinspiredby2(inputs)
});
export { footerinspiredby2 as "footerInspiredBy" }