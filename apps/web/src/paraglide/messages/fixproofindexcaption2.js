/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofindexcaption2Inputs */

const en_fixproofindexcaption2 = /** @type {(inputs: Fixproofindexcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Both indexes run from 0 to 100 and weight every task by its difficulty tier. Resolved is the headline; progress shows partial work that resolved cannot see.`)
};

const es_fixproofindexcaption2 = /** @type {(inputs: Fixproofindexcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ambos índices van de 0 a 100 y ponderan cada tarea por su nivel de dificultad. Resolved es la cifra principal; Progress muestra el trabajo parcial que Resolved no puede ver.`)
};

const zh_fixproofindexcaption2 = /** @type {(inputs: Fixproofindexcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`两个指数都从 0 到 100，并按难度等级为每个任务加权。Resolved 是最核心的数字；Progress 展示 Resolved 看不到的部分进展。`)
};

const ja_fixproofindexcaption2 = /** @type {(inputs: Fixproofindexcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`どちらの指数も 0 から 100 の範囲で、各タスクを難易度ティアで重み付けします。Resolved が中心の数値で、Progress は Resolved では見えない部分的な進捗を示します。`)
};

const ko_fixproofindexcaption2 = /** @type {(inputs: Fixproofindexcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`두 지수 모두 0에서 100까지이며 각 태스크를 난이도 등급으로 가중합니다. Resolved가 대표 수치이고, Progress는 Resolved가 보지 못하는 부분적인 진전을 보여줍니다.`)
};

const zh_hant1_fixproofindexcaption2 = /** @type {(inputs: Fixproofindexcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`兩個指數都從 0 到 100，並按難度等級為每個任務加權。Resolved 是最核心的數字；Progress 展示 Resolved 看不到的部分進展。`)
};

const de_fixproofindexcaption2 = /** @type {(inputs: Fixproofindexcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Beide Indizes reichen von 0 bis 100 und gewichten jede Aufgabe nach ihrer Schwierigkeitsstufe. Resolved ist die zentrale Kennzahl; Progress zeigt Teilerfolge, die Resolved nicht sieht.`)
};

const fr_fixproofindexcaption2 = /** @type {(inputs: Fixproofindexcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Les deux indices vont de 0 à 100 et pondèrent chaque tâche selon son niveau de difficulté. Resolved est le chiffre principal ; Progress montre le travail partiel que Resolved ne voit pas.`)
};

const uk_fixproofindexcaption2 = /** @type {(inputs: Fixproofindexcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Обидва індекси йдуть від 0 до 100 і зважують кожну задачу за її рівнем складності. Resolved є головним числом; Progress показує часткову роботу, якої Resolved не бачить.`)
};

/**
* | output |
* | --- |
* | "Both indexes run from 0 to 100 and weight every task by its difficulty tier. Resolved is the headline; progress shows partial work that resolved cannot see." |
*
* @param {Fixproofindexcaption2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofindexcaption2 = /** @type {((inputs?: Fixproofindexcaption2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofindexcaption2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofindexcaption2(inputs)
	if (locale === "zh") return zh_fixproofindexcaption2(inputs)
	if (locale === "ja") return ja_fixproofindexcaption2(inputs)
	if (locale === "ko") return ko_fixproofindexcaption2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofindexcaption2(inputs)
	if (locale === "de") return de_fixproofindexcaption2(inputs)
	if (locale === "fr") return fr_fixproofindexcaption2(inputs)
	if (locale === "uk") return uk_fixproofindexcaption2(inputs)
	return en_fixproofindexcaption2(inputs)
});
export { fixproofindexcaption2 as "fixproofIndexCaption" }