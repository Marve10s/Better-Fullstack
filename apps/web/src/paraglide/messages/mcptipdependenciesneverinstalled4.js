/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptipdependenciesneverinstalled4Inputs */



/**
* | output |
* | --- |
* | "Dependencies are never installed: your agent will tell you the install command" |
*
* @param {Mcptipdependenciesneverinstalled4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcptipdependenciesneverinstalled4 = /** @type {((inputs?: Mcptipdependenciesneverinstalled4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptipdependenciesneverinstalled4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Las dependencias nunca se instalan: tu agente te dirá el comando de instalación")
	if (locale === "zh") return /** @type {LocalizedString} */ ("依赖永远不会自动安装：你的代理会告诉你安装命令")
	if (locale === "ja") return /** @type {LocalizedString} */ ("依存関係は決してインストールされません。エージェントがインストール コマンドを指示します。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("종속성은 설치되지 않습니다. 에이전트가 설치 명령을 알려줍니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("依賴永遠不會自動安裝：你的代理會告訴你安裝命令")
	if (locale === "de") return /** @type {LocalizedString} */ ("Abhängigkeiten werden nie installiert: Ihr Agent teilt Ihnen den Installationsbefehl mit")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Les dépendances ne sont jamais installées : votre agent vous indiquera la commande install")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Залежності не встановлюються автоматично: агент підкаже точну команду встановлення")
	return /** @type {LocalizedString} */ ("Dependencies are never installed: your agent will tell you the install command")
});
export { mcptipdependenciesneverinstalled4 as "mcpTipDependenciesNeverInstalled" }