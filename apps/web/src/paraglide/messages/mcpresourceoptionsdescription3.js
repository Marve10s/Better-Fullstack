/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpresourceoptionsdescription3Inputs */



/**
* | output |
* | --- |
* | "All technology options per category" |
*
* @param {Mcpresourceoptionsdescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpresourceoptionsdescription3 = /** @type {((inputs?: Mcpresourceoptionsdescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpresourceoptionsdescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Todas las opciones tecnológicas por categoría")
	if (locale === "zh") return /** @type {LocalizedString} */ ("每个类别的所有技术选项")
	if (locale === "ja") return /** @type {LocalizedString} */ ("カテゴリごとのすべてのテクノロジー オプション")
	if (locale === "ko") return /** @type {LocalizedString} */ ("카테고리별 모든 기술 옵션")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("每個類別的所有技術選項")
	if (locale === "de") return /** @type {LocalizedString} */ ("Alle Technologieoptionen pro Kategorie")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Toutes les options technologiques par catégorie")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Усі варіанти технологій для кожної категорії")
	return /** @type {LocalizedString} */ ("All technology options per category")
});
export { mcpresourceoptionsdescription3 as "mcpResourceOptionsDescription" }