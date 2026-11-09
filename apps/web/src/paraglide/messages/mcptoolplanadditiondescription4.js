/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptoolplanadditiondescription4Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Planifica capacidades de herramientas para un proyecto existente")
	if (locale === "zh") return /** @type {LocalizedString} */ ("为现有项目规划工具能力")
	if (locale === "ja") return /** @type {LocalizedString} */ ("既存のプロジェクトのツール機能を計画する")
	if (locale === "ko") return /** @type {LocalizedString} */ ("기존 프로젝트의 도구 기능 계획")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("為現有專案規劃工具能力")
	if (locale === "de") return /** @type {LocalizedString} */ ("Planen Sie Tooling-Funktionen für ein bestehendes Projekt")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Planifier les capacités d'outillage d'un projet existant")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Сплануйте інструментальні можливості для наявного проєкту")
	return /** @type {LocalizedString} */ ("Plan tooling capabilities for an existing project")
});
export { mcptoolplanadditiondescription4 as "mcpToolPlanAdditionDescription" }