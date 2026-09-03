/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofdefharness2Inputs */

const en_fixproofdefharness2 = /** @type {(inputs: Fixproofdefharness2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The agent CLI that drove the model.`)
};

const es_fixproofdefharness2 = /** @type {(inputs: Fixproofdefharness2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`La CLI de agente que condujo el modelo.`)
};

const zh_fixproofdefharness2 = /** @type {(inputs: Fixproofdefharness2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`驱动模型的代理 CLI。`)
};

const ja_fixproofdefharness2 = /** @type {(inputs: Fixproofdefharness2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`モデルを動かしたエージェント CLI です。`)
};

const ko_fixproofdefharness2 = /** @type {(inputs: Fixproofdefharness2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`모델을 구동한 에이전트 CLI입니다.`)
};

const zh_hant1_fixproofdefharness2 = /** @type {(inputs: Fixproofdefharness2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`驅動模型的代理程式 CLI。`)
};

const de_fixproofdefharness2 = /** @type {(inputs: Fixproofdefharness2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Das Agenten-CLI, das das Modell gesteuert hat.`)
};

const fr_fixproofdefharness2 = /** @type {(inputs: Fixproofdefharness2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`La CLI d'agent qui a piloté le modèle.`)
};

const uk_fixproofdefharness2 = /** @type {(inputs: Fixproofdefharness2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`CLI агента, який керував моделлю.`)
};

/**
* | output |
* | --- |
* | "The agent CLI that drove the model." |
*
* @param {Fixproofdefharness2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofdefharness2 = /** @type {((inputs?: Fixproofdefharness2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofdefharness2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofdefharness2(inputs)
	if (locale === "zh") return zh_fixproofdefharness2(inputs)
	if (locale === "ja") return ja_fixproofdefharness2(inputs)
	if (locale === "ko") return ko_fixproofdefharness2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofdefharness2(inputs)
	if (locale === "de") return de_fixproofdefharness2(inputs)
	if (locale === "fr") return fr_fixproofdefharness2(inputs)
	if (locale === "uk") return uk_fixproofdefharness2(inputs)
	return en_fixproofdefharness2(inputs)
});
export { fixproofdefharness2 as "fixproofDefHarness" }