/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpresourceoptionsdescription3Inputs */

const en_mcpresourceoptionsdescription3 = /** @type {(inputs: Mcpresourceoptionsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`All technology options per category`)
};

const es_mcpresourceoptionsdescription3 = /** @type {(inputs: Mcpresourceoptionsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Todas las opciones tecnológicas por categoría`)
};

const zh_mcpresourceoptionsdescription3 = /** @type {(inputs: Mcpresourceoptionsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每个类别的所有技术选项`)
};

const ja_mcpresourceoptionsdescription3 = /** @type {(inputs: Mcpresourceoptionsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`カテゴリごとのすべてのテクノロジー オプション`)
};

const ko_mcpresourceoptionsdescription3 = /** @type {(inputs: Mcpresourceoptionsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`카테고리별 모든 기술 옵션`)
};

const zh_hant1_mcpresourceoptionsdescription3 = /** @type {(inputs: Mcpresourceoptionsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每個類別的所有技術選項`)
};

const de_mcpresourceoptionsdescription3 = /** @type {(inputs: Mcpresourceoptionsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Alle Technologieoptionen pro Kategorie`)
};

const fr_mcpresourceoptionsdescription3 = /** @type {(inputs: Mcpresourceoptionsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Toutes les options technologiques par catégorie`)
};

const uk_mcpresourceoptionsdescription3 = /** @type {(inputs: Mcpresourceoptionsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Усі варіанти технологій для кожної категорії`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpresourceoptionsdescription3(inputs)
	if (locale === "es") return es_mcpresourceoptionsdescription3(inputs)
	if (locale === "zh") return zh_mcpresourceoptionsdescription3(inputs)
	if (locale === "ja") return ja_mcpresourceoptionsdescription3(inputs)
	if (locale === "ko") return ko_mcpresourceoptionsdescription3(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpresourceoptionsdescription3(inputs)
	if (locale === "de") return de_mcpresourceoptionsdescription3(inputs)
	if (locale === "fr") return fr_mcpresourceoptionsdescription3(inputs)
	return uk_mcpresourceoptionsdescription3(inputs)
});
export { mcpresourceoptionsdescription3 as "mcpResourceOptionsDescription" }