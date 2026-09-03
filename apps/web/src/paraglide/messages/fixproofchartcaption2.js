/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofchartcaption2Inputs */

const en_fixproofchartcaption2 = /** @type {(inputs: Fixproofchartcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One point per model and effort. Minutes run from slow on the left to fast on the right, so the strongest runs sit toward the top right.`)
};

const es_fixproofchartcaption2 = /** @type {(inputs: Fixproofchartcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Un punto por modelo y esfuerzo. Los minutos van de lento a la izquierda a rápido a la derecha, así que las mejores ejecuciones quedan arriba a la derecha.`)
};

const zh_fixproofchartcaption2 = /** @type {(inputs: Fixproofchartcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每个模型与推理强度组合一个点。横轴左慢右快，因此表现最好的运行位于右上角。`)
};

const ja_fixproofchartcaption2 = /** @type {(inputs: Fixproofchartcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`モデルと推論強度の組み合わせごとに 1 点です。横軸は左が遅く右が速いので、優れた実行ほど右上に寄ります。`)
};

const ko_fixproofchartcaption2 = /** @type {(inputs: Fixproofchartcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`모델과 추론 강도 조합마다 점 하나입니다. 가로축은 왼쪽이 느리고 오른쪽이 빠르므로 좋은 실행일수록 오른쪽 위에 놓입니다.`)
};

const zh_hant1_fixproofchartcaption2 = /** @type {(inputs: Fixproofchartcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每個模型與推理強度組合一個點。橫軸左慢右快，因此表現最好的執行位於右上角。`)
};

const de_fixproofchartcaption2 = /** @type {(inputs: Fixproofchartcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ein Punkt pro Modell und Effort. Die Minuten laufen von langsam links zu schnell rechts, die stärksten Läufe liegen also oben rechts.`)
};

const fr_fixproofchartcaption2 = /** @type {(inputs: Fixproofchartcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Un point par modèle et par effort. Les minutes vont de lent à gauche à rapide à droite, donc les meilleures exécutions se placent en haut à droite.`)
};

const uk_fixproofchartcaption2 = /** @type {(inputs: Fixproofchartcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Одна точка на модель і рівень зусиль. Хвилини йдуть від повільних ліворуч до швидких праворуч, тож найкращі запуски опиняються вгорі праворуч.`)
};

/**
* | output |
* | --- |
* | "One point per model and effort. Minutes run from slow on the left to fast on the right, so the strongest runs sit toward the top right." |
*
* @param {Fixproofchartcaption2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofchartcaption2 = /** @type {((inputs?: Fixproofchartcaption2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofchartcaption2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofchartcaption2(inputs)
	if (locale === "zh") return zh_fixproofchartcaption2(inputs)
	if (locale === "ja") return ja_fixproofchartcaption2(inputs)
	if (locale === "ko") return ko_fixproofchartcaption2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofchartcaption2(inputs)
	if (locale === "de") return de_fixproofchartcaption2(inputs)
	if (locale === "fr") return fr_fixproofchartcaption2(inputs)
	if (locale === "uk") return uk_fixproofchartcaption2(inputs)
	return en_fixproofchartcaption2(inputs)
});
export { fixproofchartcaption2 as "fixproofChartCaption" }