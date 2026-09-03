/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofchartaxisminutes3Inputs */

const en_fixproofchartaxisminutes3 = /** @type {(inputs: Fixproofchartaxisminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Median agent minutes per task`)
};

const es_fixproofchartaxisminutes3 = /** @type {(inputs: Fixproofchartaxisminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mediana de minutos del agente por tarea`)
};

const zh_fixproofchartaxisminutes3 = /** @type {(inputs: Fixproofchartaxisminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每个任务的 agent 耗时中位数（分钟）`)
};

const ja_fixproofchartaxisminutes3 = /** @type {(inputs: Fixproofchartaxisminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`タスクあたりのエージェント所要時間の中央値 (分)`)
};

const ko_fixproofchartaxisminutes3 = /** @type {(inputs: Fixproofchartaxisminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`태스크당 에이전트 소요 시간 중앙값 (분)`)
};

const zh_hant1_fixproofchartaxisminutes3 = /** @type {(inputs: Fixproofchartaxisminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每個任務的 agent 耗時中位數（分鐘）`)
};

const de_fixproofchartaxisminutes3 = /** @type {(inputs: Fixproofchartaxisminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Median-Agentminuten pro Aufgabe`)
};

const fr_fixproofchartaxisminutes3 = /** @type {(inputs: Fixproofchartaxisminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Minutes médianes de l'agent par tâche`)
};

const uk_fixproofchartaxisminutes3 = /** @type {(inputs: Fixproofchartaxisminutes3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Медіана хвилин роботи агента на задачу`)
};

/**
* | output |
* | --- |
* | "Median agent minutes per task" |
*
* @param {Fixproofchartaxisminutes3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofchartaxisminutes3 = /** @type {((inputs?: Fixproofchartaxisminutes3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofchartaxisminutes3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofchartaxisminutes3(inputs)
	if (locale === "zh") return zh_fixproofchartaxisminutes3(inputs)
	if (locale === "ja") return ja_fixproofchartaxisminutes3(inputs)
	if (locale === "ko") return ko_fixproofchartaxisminutes3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofchartaxisminutes3(inputs)
	if (locale === "de") return de_fixproofchartaxisminutes3(inputs)
	if (locale === "fr") return fr_fixproofchartaxisminutes3(inputs)
	if (locale === "uk") return uk_fixproofchartaxisminutes3(inputs)
	return en_fixproofchartaxisminutes3(inputs)
});
export { fixproofchartaxisminutes3 as "fixproofChartAxisMinutes" }