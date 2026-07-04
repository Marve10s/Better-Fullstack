/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmpathclidetail3Inputs */

const en_llmpathclidetail3 = /** @type {(inputs: Llmpathclidetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`agent composes the Better-Fullstack CLI command`)
};

const es_llmpathclidetail3 = /** @type {(inputs: Llmpathclidetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`el agente compone el comando CLI de Better-Fullstack`)
};

const zh_llmpathclidetail3 = /** @type {(inputs: Llmpathclidetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理组合 Better-Fullstack CLI 命令`)
};

const ja_llmpathclidetail3 = /** @type {(inputs: Llmpathclidetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`エージェントは Better-Fullstack CLI コマンドを作成します`)
};

const ko_llmpathclidetail3 = /** @type {(inputs: Llmpathclidetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`에이전트는 Better-Fullstack CLI 명령을 구성합니다.`)
};

const zh_hant1_llmpathclidetail3 = /** @type {(inputs: Llmpathclidetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理程式組合 Better-Fullstack CLI 指令`)
};

const de_llmpathclidetail3 = /** @type {(inputs: Llmpathclidetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Der Agent erstellt den Befehl Better-Fullstack CLI`)
};

const fr_llmpathclidetail3 = /** @type {(inputs: Llmpathclidetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`l'agent compose la commande Better-Fullstack CLI`)
};

/**
* | output |
* | --- |
* | "agent composes the Better-Fullstack CLI command" |
*
* @param {Llmpathclidetail3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const llmpathclidetail3 = /** @type {((inputs?: Llmpathclidetail3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmpathclidetail3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmpathclidetail3(inputs)
	if (locale === "es") return es_llmpathclidetail3(inputs)
	if (locale === "zh") return zh_llmpathclidetail3(inputs)
	if (locale === "ja") return ja_llmpathclidetail3(inputs)
	if (locale === "ko") return ko_llmpathclidetail3(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmpathclidetail3(inputs)
	if (locale === "de") return de_llmpathclidetail3(inputs)
	return fr_llmpathclidetail3(inputs)
});
export { llmpathclidetail3 as "llmPathCliDetail" }