/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptipdependenciesneverinstalled4Inputs */

const en_mcptipdependenciesneverinstalled4 = /** @type {(inputs: Mcptipdependenciesneverinstalled4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dependencies are never installed: your agent will tell you the install command`)
};

const es_mcptipdependenciesneverinstalled4 = /** @type {(inputs: Mcptipdependenciesneverinstalled4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Las dependencias nunca se instalan: tu agente te dirá el comando de instalación`)
};

const zh_mcptipdependenciesneverinstalled4 = /** @type {(inputs: Mcptipdependenciesneverinstalled4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`依赖永远不会自动安装：你的代理会告诉你安装命令`)
};

const ja_mcptipdependenciesneverinstalled4 = /** @type {(inputs: Mcptipdependenciesneverinstalled4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`依存関係は決してインストールされません。エージェントがインストール コマンドを指示します。`)
};

const ko_mcptipdependenciesneverinstalled4 = /** @type {(inputs: Mcptipdependenciesneverinstalled4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`종속성은 설치되지 않습니다. 에이전트가 설치 명령을 알려줍니다.`)
};

const zh_hant1_mcptipdependenciesneverinstalled4 = /** @type {(inputs: Mcptipdependenciesneverinstalled4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`依賴永遠不會自動安裝：你的代理會告訴你安裝命令`)
};

const de_mcptipdependenciesneverinstalled4 = /** @type {(inputs: Mcptipdependenciesneverinstalled4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abhängigkeiten werden nie installiert: Ihr Agent teilt Ihnen den Installationsbefehl mit`)
};

const fr_mcptipdependenciesneverinstalled4 = /** @type {(inputs: Mcptipdependenciesneverinstalled4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Les dépendances ne sont jamais installées : votre agent vous indiquera la commande install`)
};

/**
* | output |
* | --- |
* | "Dependencies are never installed: your agent will tell you the install command" |
*
* @param {Mcptipdependenciesneverinstalled4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcptipdependenciesneverinstalled4 = /** @type {((inputs?: Mcptipdependenciesneverinstalled4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptipdependenciesneverinstalled4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcptipdependenciesneverinstalled4(inputs)
	if (locale === "es") return es_mcptipdependenciesneverinstalled4(inputs)
	if (locale === "zh") return zh_mcptipdependenciesneverinstalled4(inputs)
	if (locale === "ja") return ja_mcptipdependenciesneverinstalled4(inputs)
	if (locale === "ko") return ko_mcptipdependenciesneverinstalled4(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcptipdependenciesneverinstalled4(inputs)
	if (locale === "de") return de_mcptipdependenciesneverinstalled4(inputs)
	return fr_mcptipdependenciesneverinstalled4(inputs)
});
export { mcptipdependenciesneverinstalled4 as "mcpTipDependenciesNeverInstalled" }