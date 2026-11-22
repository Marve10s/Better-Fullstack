/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Docssearchsectionsindexed3Inputs */



/**
* | output |
* | --- |
* | "{count} sections indexed" |
*
* @param {Docssearchsectionsindexed3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docssearchsectionsindexed3 = /** @type {((inputs: Docssearchsectionsindexed3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssearchsectionsindexed3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`${i?.count} secciones indexadas`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`已索引 ${i?.count} 个章节`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.count} セクションのインデックスが作成されました`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`${i?.count} 섹션 색인이 생성됨`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`已索引 ${i?.count} 個章節`)
	if (locale === "de") return /** @type {LocalizedString} */ (`${i?.count} Abschnitte indiziert`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`${i?.count} sections indexées`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`${i?.count} розділів проіндексовано`)
	return /** @type {LocalizedString} */ (`${i?.count} sections indexed`)
});
export { docssearchsectionsindexed3 as "docsSearchSectionsIndexed" }