/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20261001highlightdocs3Inputs */

const en_changelogrelease20261001highlightdocs3 = /** @type {(inputs: Changelogrelease20261001highlightdocs3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Docs and guides match the new site`)
};

const es_changelogrelease20261001highlightdocs3 = /** @type {(inputs: Changelogrelease20261001highlightdocs3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`La documentación y las guías combinan con el nuevo sitio`)
};

const zh_changelogrelease20261001highlightdocs3 = /** @type {(inputs: Changelogrelease20261001highlightdocs3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`文档和指南采用新网站设计`)
};

const ja_changelogrelease20261001highlightdocs3 = /** @type {(inputs: Changelogrelease20261001highlightdocs3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ドキュメントとガイドが新しいサイトデザインに`)
};

const ko_changelogrelease20261001highlightdocs3 = /** @type {(inputs: Changelogrelease20261001highlightdocs3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`문서와 가이드가 새 사이트 디자인에 맞춰졌습니다`)
};

const zh_hant1_changelogrelease20261001highlightdocs3 = /** @type {(inputs: Changelogrelease20261001highlightdocs3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`文件與指南採用新網站設計`)
};

const de_changelogrelease20261001highlightdocs3 = /** @type {(inputs: Changelogrelease20261001highlightdocs3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Docs und Guides passen zur neuen Website`)
};

const fr_changelogrelease20261001highlightdocs3 = /** @type {(inputs: Changelogrelease20261001highlightdocs3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`La documentation et les guides suivent le nouveau site`)
};

const uk_changelogrelease20261001highlightdocs3 = /** @type {(inputs: Changelogrelease20261001highlightdocs3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Документація й посібники в стилі нового сайту`)
};

/**
* | output |
* | --- |
* | "Docs and guides match the new site" |
*
* @param {Changelogrelease20261001highlightdocs3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changelogrelease20261001highlightdocs3 = /** @type {((inputs?: Changelogrelease20261001highlightdocs3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20261001highlightdocs3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_changelogrelease20261001highlightdocs3(inputs)
	if (locale === "zh") return zh_changelogrelease20261001highlightdocs3(inputs)
	if (locale === "ja") return ja_changelogrelease20261001highlightdocs3(inputs)
	if (locale === "ko") return ko_changelogrelease20261001highlightdocs3(inputs)
	if (locale === "zh-Hant") return zh_hant1_changelogrelease20261001highlightdocs3(inputs)
	if (locale === "de") return de_changelogrelease20261001highlightdocs3(inputs)
	if (locale === "fr") return fr_changelogrelease20261001highlightdocs3(inputs)
	if (locale === "uk") return uk_changelogrelease20261001highlightdocs3(inputs)
	return en_changelogrelease20261001highlightdocs3(inputs)
});
export { changelogrelease20261001highlightdocs3 as "changelogRelease20261001HighlightDocs" }