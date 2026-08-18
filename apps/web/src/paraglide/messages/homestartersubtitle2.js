/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homestartersubtitle2Inputs */

const en_homestartersubtitle2 = /** @type {(inputs: Homestartersubtitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One command → a project ready to code.
Or hand it to your AI agent over MCP.`)
};

const es_homestartersubtitle2 = /** @type {(inputs: Homestartersubtitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Un comando → un proyecto listo para programar.
O déjaselo a tu agente de IA por MCP.`)
};

const zh_homestartersubtitle2 = /** @type {(inputs: Homestartersubtitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`一条命令 → 项目即刻可以写代码。
或者通过 MCP 交给你的 AI 代理。`)
};

const ja_homestartersubtitle2 = /** @type {(inputs: Homestartersubtitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`コマンド 1 つ → すぐに書き始められるプロジェクト。
MCP 経由で AI エージェントに任せることもできます。`)
};

const ko_homestartersubtitle2 = /** @type {(inputs: Homestartersubtitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`명령어 하나 → 바로 코딩할 수 있는 프로젝트.
MCP로 AI 에이전트에게 맡길 수도 있습니다.`)
};

const zh_hant1_homestartersubtitle2 = /** @type {(inputs: Homestartersubtitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`一條命令 → 專案立即可以開始寫程式。
或透過 MCP 交給你的 AI 代理。`)
};

const de_homestartersubtitle2 = /** @type {(inputs: Homestartersubtitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ein Befehl → ein Projekt, in dem du sofort loslegst.
Oder überlass es deinem KI-Agenten via MCP.`)
};

const fr_homestartersubtitle2 = /** @type {(inputs: Homestartersubtitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Une commande → un projet prêt à coder.
Ou confiez-le à votre agent IA via MCP.`)
};

const uk_homestartersubtitle2 = /** @type {(inputs: Homestartersubtitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Одна команда → проєкт готовий до коду.
Або доручіть це ШІ-агенту через MCP.`)
};

/**
* | output |
* | --- |
* | "One command → a project ready to code. Or hand it to your AI agent over MCP." |
*
* @param {Homestartersubtitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homestartersubtitle2 = /** @type {((inputs?: Homestartersubtitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homestartersubtitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_homestartersubtitle2(inputs)
	if (locale === "zh") return zh_homestartersubtitle2(inputs)
	if (locale === "ja") return ja_homestartersubtitle2(inputs)
	if (locale === "ko") return ko_homestartersubtitle2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homestartersubtitle2(inputs)
	if (locale === "de") return de_homestartersubtitle2(inputs)
	if (locale === "fr") return fr_homestartersubtitle2(inputs)
	if (locale === "uk") return uk_homestartersubtitle2(inputs)
	return en_homestartersubtitle2(inputs)
});
export { homestartersubtitle2 as "homeStarterSubtitle" }