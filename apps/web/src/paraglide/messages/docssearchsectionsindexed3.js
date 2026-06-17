/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Docssearchsectionsindexed3Inputs */

const en_docssearchsectionsindexed3 = /** @type {(inputs: Docssearchsectionsindexed3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} sections indexed`)
};

const es_docssearchsectionsindexed3 = /** @type {(inputs: Docssearchsectionsindexed3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} secciones indexadas`)
};

const zh_docssearchsectionsindexed3 = /** @type {(inputs: Docssearchsectionsindexed3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已索引 ${i?.count} 个章节`)
};

const ja_docssearchsectionsindexed3 = /** @type {(inputs: Docssearchsectionsindexed3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} セクションのインデックスが作成されました`)
};

const ko_docssearchsectionsindexed3 = /** @type {(inputs: Docssearchsectionsindexed3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 섹션 색인이 생성됨`)
};

const zh_hant1_docssearchsectionsindexed3 = /** @type {(inputs: Docssearchsectionsindexed3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已索引 ${i?.count} 個章節`)
};

const de_docssearchsectionsindexed3 = /** @type {(inputs: Docssearchsectionsindexed3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} Abschnitte indiziert`)
};

const fr_docssearchsectionsindexed3 = /** @type {(inputs: Docssearchsectionsindexed3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} sections indexées`)
};

/**
* | output |
* | --- |
* | "{count} sections indexed" |
*
* @param {Docssearchsectionsindexed3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const docssearchsectionsindexed3 = /** @type {((inputs: Docssearchsectionsindexed3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssearchsectionsindexed3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docssearchsectionsindexed3(inputs)
	if (locale === "es") return es_docssearchsectionsindexed3(inputs)
	if (locale === "zh") return zh_docssearchsectionsindexed3(inputs)
	if (locale === "ja") return ja_docssearchsectionsindexed3(inputs)
	if (locale === "ko") return ko_docssearchsectionsindexed3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docssearchsectionsindexed3(inputs)
	if (locale === "de") return de_docssearchsectionsindexed3(inputs)
	return fr_docssearchsectionsindexed3(inputs)
});
export { docssearchsectionsindexed3 as "docsSearchSectionsIndexed" }