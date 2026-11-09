/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ query: NonNullable<unknown> }} Buildernosearchresults3Inputs */



/**
* | output |
* | --- |
* | "No libraries or sections match \"{query}\"." |
*
* @param {Buildernosearchresults3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildernosearchresults3 = /** @type {((inputs: Buildernosearchresults3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildernosearchresults3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`Ninguna biblioteca o sección coincide con «${i?.query}».`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`没有与“${i?.query}”匹配的库或分类。`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`「${i?.query}」に一致するライブラリまたはセクションはありません。`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`"${i?.query}"와 일치하는 라이브러리 또는 섹션이 없습니다.`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`沒有與「${i?.query}」相符的程式庫或分類。`)
	if (locale === "de") return /** @type {LocalizedString} */ (`Keine Bibliotheken oder Bereiche entsprechen „${i?.query}“.`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`Aucune bibliothèque ou section ne correspond à « ${i?.query} ».`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`Немає бібліотек або розділів, що відповідають «${i?.query}».`)
	return /** @type {LocalizedString} */ (`No libraries or sections match "${i?.query}".`)
});
export { buildernosearchresults3 as "builderNoSearchResults" }