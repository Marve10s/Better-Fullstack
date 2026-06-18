/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmpathpromptdetail3Inputs */

const en_llmpathpromptdetail3 = /** @type {(inputs: Llmpathpromptdetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`no Better-Fullstack — agent hand-writes every file`)
};

const es_llmpathpromptdetail3 = /** @type {(inputs: Llmpathpromptdetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`sin Better-Fullstack: el agente escribe cada archivo a mano`)
};

const zh_llmpathpromptdetail3 = /** @type {(inputs: Llmpathpromptdetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`不使用 Better-Fullstack：代理手写每个文件`)
};

const ja_llmpathpromptdetail3 = /** @type {(inputs: Llmpathpromptdetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better-Fullstack なし — エージェントがすべてのファイルを手書きします`)
};

const ko_llmpathpromptdetail3 = /** @type {(inputs: Llmpathpromptdetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better-Fullstack 없음 — 에이전트가 모든 파일을 직접 작성합니다.`)
};

const zh_hant1_llmpathpromptdetail3 = /** @type {(inputs: Llmpathpromptdetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`不使用 Better-Fullstack：代理程式手寫每個文件`)
};

const de_llmpathpromptdetail3 = /** @type {(inputs: Llmpathpromptdetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`kein Better-Fullstack – der Agent schreibt jede Datei von Hand`)
};

const fr_llmpathpromptdetail3 = /** @type {(inputs: Llmpathpromptdetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`pas de Better-Fullstack — l'agent écrit manuellement chaque fichier`)
};

/**
* | output |
* | --- |
* | "no Better-Fullstack — agent hand-writes every file" |
*
* @param {Llmpathpromptdetail3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const llmpathpromptdetail3 = /** @type {((inputs?: Llmpathpromptdetail3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmpathpromptdetail3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmpathpromptdetail3(inputs)
	if (locale === "es") return es_llmpathpromptdetail3(inputs)
	if (locale === "zh") return zh_llmpathpromptdetail3(inputs)
	if (locale === "ja") return ja_llmpathpromptdetail3(inputs)
	if (locale === "ko") return ko_llmpathpromptdetail3(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmpathpromptdetail3(inputs)
	if (locale === "de") return de_llmpathpromptdetail3(inputs)
	return fr_llmpathpromptdetail3(inputs)
});
export { llmpathpromptdetail3 as "llmPathPromptDetail" }