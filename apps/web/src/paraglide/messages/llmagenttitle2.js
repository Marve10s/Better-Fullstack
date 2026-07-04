/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmagenttitle2Inputs */

const en_llmagenttitle2 = /** @type {(inputs: Llmagenttitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Give your agent the fast path.`)
};

const es_llmagenttitle2 = /** @type {(inputs: Llmagenttitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dale a tu agente la ruta rápida.`)
};

const zh_llmagenttitle2 = /** @type {(inputs: Llmagenttitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`给你的代理一条快路径。`)
};

const ja_llmagenttitle2 = /** @type {(inputs: Llmagenttitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`エージェントに高速パスを提供します。`)
};

const ko_llmagenttitle2 = /** @type {(inputs: Llmagenttitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`에이전트에게 빠른 경로를 제공하세요.`)
};

const zh_hant1_llmagenttitle2 = /** @type {(inputs: Llmagenttitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`給你的代理一條快路徑。`)
};

const de_llmagenttitle2 = /** @type {(inputs: Llmagenttitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Geben Sie Ihrem Agenten den schnellen Weg.`)
};

const fr_llmagenttitle2 = /** @type {(inputs: Llmagenttitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Donnez à votre agent la voie rapide.`)
};

/**
* | output |
* | --- |
* | "Give your agent the fast path." |
*
* @param {Llmagenttitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const llmagenttitle2 = /** @type {((inputs?: Llmagenttitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmagenttitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmagenttitle2(inputs)
	if (locale === "es") return es_llmagenttitle2(inputs)
	if (locale === "zh") return zh_llmagenttitle2(inputs)
	if (locale === "ja") return ja_llmagenttitle2(inputs)
	if (locale === "ko") return ko_llmagenttitle2(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmagenttitle2(inputs)
	if (locale === "de") return de_llmagenttitle2(inputs)
	return fr_llmagenttitle2(inputs)
});
export { llmagenttitle2 as "llmAgentTitle" }