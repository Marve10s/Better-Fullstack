/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptoolplanadditiondescription4Inputs */

const en_mcptoolplanadditiondescription4 = /** @type {(inputs: Mcptoolplanadditiondescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Plan tooling capabilities for an existing project`)
};

const es_mcptoolplanadditiondescription4 = /** @type {(inputs: Mcptoolplanadditiondescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Planifica capacidades de herramientas para un proyecto existente`)
};

const zh_mcptoolplanadditiondescription4 = /** @type {(inputs: Mcptoolplanadditiondescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`为现有项目规划工具能力`)
};

const ja_mcptoolplanadditiondescription4 = /** @type {(inputs: Mcptoolplanadditiondescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`既存のプロジェクトのツール機能を計画する`)
};

const ko_mcptoolplanadditiondescription4 = /** @type {(inputs: Mcptoolplanadditiondescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`기존 프로젝트의 도구 기능 계획`)
};

const zh_hant1_mcptoolplanadditiondescription4 = /** @type {(inputs: Mcptoolplanadditiondescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`為現有專案規劃工具能力`)
};

const de_mcptoolplanadditiondescription4 = /** @type {(inputs: Mcptoolplanadditiondescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Planen Sie Tooling-Funktionen für ein bestehendes Projekt`)
};

const fr_mcptoolplanadditiondescription4 = /** @type {(inputs: Mcptoolplanadditiondescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Planifier les capacités d'outillage d'un projet existant`)
};

const uk_mcptoolplanadditiondescription4 = /** @type {(inputs: Mcptoolplanadditiondescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Сплануйте інструментальні можливості для наявного проєкту`)
};

/**
* | output |
* | --- |
* | "Plan tooling capabilities for an existing project" |
*
* @param {Mcptoolplanadditiondescription4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcptoolplanadditiondescription4 = /** @type {((inputs?: Mcptoolplanadditiondescription4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptoolplanadditiondescription4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_mcptoolplanadditiondescription4(inputs)
	if (locale === "zh") return zh_mcptoolplanadditiondescription4(inputs)
	if (locale === "ja") return ja_mcptoolplanadditiondescription4(inputs)
	if (locale === "ko") return ko_mcptoolplanadditiondescription4(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcptoolplanadditiondescription4(inputs)
	if (locale === "de") return de_mcptoolplanadditiondescription4(inputs)
	if (locale === "fr") return fr_mcptoolplanadditiondescription4(inputs)
	if (locale === "uk") return uk_mcptoolplanadditiondescription4(inputs)
	return en_mcptoolplanadditiondescription4(inputs)
});
export { mcptoolplanadditiondescription4 as "mcpToolPlanAdditionDescription" }