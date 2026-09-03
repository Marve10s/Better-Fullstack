/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofdeftrials2Inputs */

const en_fixproofdeftrials2 = /** @type {(inputs: Fixproofdeftrials2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Runs per task. One trial is a single sample, so read small differences as noise.`)
};

const es_fixproofdeftrials2 = /** @type {(inputs: Fixproofdeftrials2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ejecuciones por tarea. Un intento es una sola muestra, así que lee las diferencias pequeñas como ruido.`)
};

const zh_fixproofdeftrials2 = /** @type {(inputs: Fixproofdeftrials2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每个任务的运行次数。一次试验只是一个样本，因此细小的差距应当视为噪声。`)
};

const ja_fixproofdeftrials2 = /** @type {(inputs: Fixproofdeftrials2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`タスクあたりの実行回数です。1 回の試行はサンプル 1 つなので、小さな差はノイズとして読んでください。`)
};

const ko_fixproofdeftrials2 = /** @type {(inputs: Fixproofdeftrials2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`태스크당 실행 횟수입니다. 한 번의 시도는 표본 하나이므로 작은 차이는 잡음으로 보세요.`)
};

const zh_hant1_fixproofdeftrials2 = /** @type {(inputs: Fixproofdeftrials2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每個任務的執行次數。一次試驗只是一個樣本，因此細小的差距應當視為雜訊。`)
};

const de_fixproofdeftrials2 = /** @type {(inputs: Fixproofdeftrials2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Läufe pro Aufgabe. Ein Versuch ist eine einzelne Stichprobe, kleine Unterschiede sind also Rauschen.`)
};

const fr_fixproofdeftrials2 = /** @type {(inputs: Fixproofdeftrials2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exécutions par tâche. Un essai est un échantillon unique : lisez les petits écarts comme du bruit.`)
};

const uk_fixproofdeftrials2 = /** @type {(inputs: Fixproofdeftrials2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Запусків на задачу. Одна спроба є однією вибіркою, тому невеликі відмінності варто читати як шум.`)
};

/**
* | output |
* | --- |
* | "Runs per task. One trial is a single sample, so read small differences as noise." |
*
* @param {Fixproofdeftrials2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofdeftrials2 = /** @type {((inputs?: Fixproofdeftrials2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofdeftrials2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofdeftrials2(inputs)
	if (locale === "zh") return zh_fixproofdeftrials2(inputs)
	if (locale === "ja") return ja_fixproofdeftrials2(inputs)
	if (locale === "ko") return ko_fixproofdeftrials2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofdeftrials2(inputs)
	if (locale === "de") return de_fixproofdeftrials2(inputs)
	if (locale === "fr") return fr_fixproofdeftrials2(inputs)
	if (locale === "uk") return uk_fixproofdeftrials2(inputs)
	return en_fixproofdeftrials2(inputs)
});
export { fixproofdeftrials2 as "fixproofDefTrials" }