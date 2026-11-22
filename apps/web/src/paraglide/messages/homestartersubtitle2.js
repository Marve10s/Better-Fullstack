/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homestartersubtitle2Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Un comando → un proyecto listo para programar.\nO déjaselo a tu agente de IA por MCP.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("一条命令 → 项目即刻可以写代码。\n或者通过 MCP 交给你的 AI 代理。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("コマンド 1 つ → すぐに書き始められるプロジェクト。\nMCP 経由で AI エージェントに任せることもできます。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("명령어 하나 → 바로 코딩할 수 있는 프로젝트.\nMCP로 AI 에이전트에게 맡길 수도 있습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("一條命令 → 專案立即可以開始寫程式。\n或透過 MCP 交給你的 AI 代理。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Ein Befehl → ein Projekt, in dem du sofort loslegst.\nOder überlass es deinem KI-Agenten via MCP.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Une commande → un projet prêt à coder.\nOu confiez-le à votre agent IA via MCP.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Одна команда → проєкт готовий до коду.\nАбо доручіть це ШІ-агенту через MCP.")
	return /** @type {LocalizedString} */ ("One command → a project ready to code.\nOr hand it to your AI agent over MCP.")
});
export { homestartersubtitle2 as "homeStarterSubtitle" }