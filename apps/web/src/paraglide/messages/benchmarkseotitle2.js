/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Benchmarkseotitle2Inputs */

const en_benchmarkseotitle2 = /** @type {(inputs: Benchmarkseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ScaffBench — How good are AI models at building your projects?`)
};

const es_benchmarkseotitle2 = /** @type {(inputs: Benchmarkseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ScaffBench — ¿Qué tan buenos son los modelos de IA construyendo tus proyectos?`)
};

const zh_benchmarkseotitle2 = /** @type {(inputs: Benchmarkseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ScaffBench — AI 模型构建你的项目有多强？`)
};

const ja_benchmarkseotitle2 = /** @type {(inputs: Benchmarkseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ScaffBench — AIモデルはあなたのプロジェクトをどれだけうまく構築できるか？`)
};

const ko_benchmarkseotitle2 = /** @type {(inputs: Benchmarkseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ScaffBench — AI 모델은 당신의 프로젝트를 얼마나 잘 만들까요?`)
};

const zh_hant1_benchmarkseotitle2 = /** @type {(inputs: Benchmarkseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ScaffBench — AI 模型建構你的專案有多強？`)
};

const de_benchmarkseotitle2 = /** @type {(inputs: Benchmarkseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ScaffBench — Wie gut bauen KI-Modelle deine Projekte?`)
};

const fr_benchmarkseotitle2 = /** @type {(inputs: Benchmarkseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ScaffBench — Les modèles d'IA sont-ils vraiment bons pour créer vos projets ?`)
};

const uk_benchmarkseotitle2 = /** @type {(inputs: Benchmarkseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ScaffBench — Наскільки добре моделі ШІ створюють ваші проєкти?`)
};

/**
* | output |
* | --- |
* | "ScaffBench — How good are AI models at building your projects?" |
*
* @param {Benchmarkseotitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const benchmarkseotitle2 = /** @type {((inputs?: Benchmarkseotitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Benchmarkseotitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_benchmarkseotitle2(inputs)
	if (locale === "es") return es_benchmarkseotitle2(inputs)
	if (locale === "zh") return zh_benchmarkseotitle2(inputs)
	if (locale === "ja") return ja_benchmarkseotitle2(inputs)
	if (locale === "ko") return ko_benchmarkseotitle2(inputs)
	if (locale === "zh-Hant") return zh_hant1_benchmarkseotitle2(inputs)
	if (locale === "de") return de_benchmarkseotitle2(inputs)
	if (locale === "fr") return fr_benchmarkseotitle2(inputs)
	return uk_benchmarkseotitle2(inputs)
});
export { benchmarkseotitle2 as "benchmarkSeoTitle" }