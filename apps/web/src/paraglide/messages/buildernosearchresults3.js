/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ query: NonNullable<unknown> }} Buildernosearchresults3Inputs */

const en_buildernosearchresults3 = /** @type {(inputs: Buildernosearchresults3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`No libraries or sections match "${i?.query}".`)
};

const es_buildernosearchresults3 = /** @type {(inputs: Buildernosearchresults3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Ninguna biblioteca o sección coincide con «${i?.query}».`)
};

const zh_buildernosearchresults3 = /** @type {(inputs: Buildernosearchresults3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`没有与“${i?.query}”匹配的库或分类。`)
};

const ja_buildernosearchresults3 = /** @type {(inputs: Buildernosearchresults3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`「${i?.query}」に一致するライブラリまたはセクションはありません。`)
};

const ko_buildernosearchresults3 = /** @type {(inputs: Buildernosearchresults3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`"${i?.query}"와 일치하는 라이브러리 또는 섹션이 없습니다.`)
};

const zh_hant1_buildernosearchresults3 = /** @type {(inputs: Buildernosearchresults3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`沒有與「${i?.query}」相符的程式庫或分類。`)
};

const de_buildernosearchresults3 = /** @type {(inputs: Buildernosearchresults3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Keine Bibliotheken oder Bereiche entsprechen „${i?.query}“.`)
};

const fr_buildernosearchresults3 = /** @type {(inputs: Buildernosearchresults3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Aucune bibliothèque ou section ne correspond à « ${i?.query} ».`)
};

const uk_buildernosearchresults3 = /** @type {(inputs: Buildernosearchresults3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Немає бібліотек або розділів, що відповідають «${i?.query}».`)
};

/**
* | output |
* | --- |
* | "No libraries or sections match \"{query}\"." |
*
* @param {Buildernosearchresults3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildernosearchresults3 = /** @type {((inputs: Buildernosearchresults3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildernosearchresults3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildernosearchresults3(inputs)
	if (locale === "es") return es_buildernosearchresults3(inputs)
	if (locale === "zh") return zh_buildernosearchresults3(inputs)
	if (locale === "ja") return ja_buildernosearchresults3(inputs)
	if (locale === "ko") return ko_buildernosearchresults3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildernosearchresults3(inputs)
	if (locale === "de") return de_buildernosearchresults3(inputs)
	if (locale === "fr") return fr_buildernosearchresults3(inputs)
	return uk_buildernosearchresults3(inputs)
});
export { buildernosearchresults3 as "builderNoSearchResults" }