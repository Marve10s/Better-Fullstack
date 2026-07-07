/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Benchmarkteasertitle2Inputs */

const en_benchmarkteasertitle2 = /** @type {(inputs: Benchmarkteasertitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`How good are AI models at building your projects?`)
};

const es_benchmarkteasertitle2 = /** @type {(inputs: Benchmarkteasertitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`¿Qué tan buenos son los modelos de IA construyendo tus proyectos?`)
};

const zh_benchmarkteasertitle2 = /** @type {(inputs: Benchmarkteasertitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI 模型构建你的项目有多强？`)
};

const ja_benchmarkteasertitle2 = /** @type {(inputs: Benchmarkteasertitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AIモデルはあなたのプロジェクトをどれだけうまく構築できるか？`)
};

const ko_benchmarkteasertitle2 = /** @type {(inputs: Benchmarkteasertitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI 모델은 당신의 프로젝트를 얼마나 잘 만들까요?`)
};

const zh_hant1_benchmarkteasertitle2 = /** @type {(inputs: Benchmarkteasertitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI 模型建構你的專案有多強？`)
};

const de_benchmarkteasertitle2 = /** @type {(inputs: Benchmarkteasertitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Wie gut bauen KI-Modelle deine Projekte?`)
};

const fr_benchmarkteasertitle2 = /** @type {(inputs: Benchmarkteasertitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Les modèles d'IA sont-ils vraiment bons pour créer vos projets ?`)
};

const uk_benchmarkteasertitle2 = /** @type {(inputs: Benchmarkteasertitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Наскільки добре моделі ШІ створюють ваші проєкти?`)
};

/**
* | output |
* | --- |
* | "How good are AI models at building your projects?" |
*
* @param {Benchmarkteasertitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const benchmarkteasertitle2 = /** @type {((inputs?: Benchmarkteasertitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Benchmarkteasertitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_benchmarkteasertitle2(inputs)
	if (locale === "es") return es_benchmarkteasertitle2(inputs)
	if (locale === "zh") return zh_benchmarkteasertitle2(inputs)
	if (locale === "ja") return ja_benchmarkteasertitle2(inputs)
	if (locale === "ko") return ko_benchmarkteasertitle2(inputs)
	if (locale === "zh-Hant") return zh_hant1_benchmarkteasertitle2(inputs)
	if (locale === "de") return de_benchmarkteasertitle2(inputs)
	if (locale === "fr") return fr_benchmarkteasertitle2(inputs)
	return uk_benchmarkteasertitle2(inputs)
});
export { benchmarkteasertitle2 as "benchmarkTeaserTitle" }