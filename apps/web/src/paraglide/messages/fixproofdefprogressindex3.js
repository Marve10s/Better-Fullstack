/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofdefprogressindex3Inputs */

const en_fixproofdefprogressindex3 = /** @type {(inputs: Fixproofdefprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Weighted share of each task's requirements that were failing at the base commit and pass after the agent's patch, then difficulty-weighted across tasks. Each requirement carries a weight of 2 (core), 1 or 0.5 (peripheral); the weights and per-requirement results are published with every task, and requirements already green at base never count.`)
};

const es_fixproofdefprogressindex3 = /** @type {(inputs: Fixproofdefprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Proporción ponderada de los requisitos de cada tarea que fallaban en el commit base y pasan tras el parche del agente, ponderada después por dificultad entre tareas. Cada requisito lleva un peso de 2 (central), 1 o 0,5 (periférico); los pesos y el resultado de cada requisito se publican con cada tarea, y los requisitos que ya estaban en verde en el commit base nunca cuentan.`)
};

const zh_fixproofdefprogressindex3 = /** @type {(inputs: Fixproofdefprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每个任务中，在基线提交上失败、在代理的补丁之后通过的需求所占的加权比例，再按难度在任务之间加权。每条需求的权重为 2（核心）、1 或 0.5（外围）；权重与每条需求的结果会随每个任务一起公布，在基线提交上已经通过的需求永远不计入。`)
};

const ja_fixproofdefprogressindex3 = /** @type {(inputs: Fixproofdefprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`各タスクの要件のうち、ベースコミットでは失敗しエージェントのパッチ後に成功するものの重み付き割合を求め、さらにタスク間で難易度による重み付けを行った値です。各要件の重みは 2 (中核)、1 または 0.5 (周辺) で、重みと要件ごとの結果はタスクごとに公開されます。ベースコミットの時点ですでに成功していた要件は数えません。`)
};

const ko_fixproofdefprogressindex3 = /** @type {(inputs: Fixproofdefprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`각 태스크의 요구사항 중 베이스 커밋에서 실패하고 에이전트의 패치 이후 통과한 비율을 가중해 구한 뒤, 태스크 사이에서 난이도로 다시 가중한 값입니다. 요구사항의 가중치는 2(핵심), 1 또는 0.5(주변)이며, 가중치와 요구사항별 결과는 태스크마다 공개됩니다. 베이스 커밋에서 이미 통과하던 요구사항은 세지 않습니다.`)
};

const zh_hant1_fixproofdefprogressindex3 = /** @type {(inputs: Fixproofdefprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每個任務中，在基線提交上失敗、在代理程式的修補之後通過的需求所占的加權比例，再按難度在任務之間加權。每條需求的權重為 2（核心）、1 或 0.5（外圍）；權重與每條需求的結果會隨每個任務一起公布，在基線提交上已經通過的需求永遠不計入。`)
};

const de_fixproofdefprogressindex3 = /** @type {(inputs: Fixproofdefprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gewichteter Anteil der Anforderungen einer Aufgabe, die auf dem Basis-Commit fehlgeschlagen sind und nach dem Patch des Agenten bestehen, anschließend über alle Aufgaben nach Schwierigkeit gewichtet. Jede Anforderung hat ein Gewicht von 2 (Kern), 1 oder 0,5 (Rand); die Gewichte und die Ergebnisse je Anforderung werden mit jeder Aufgabe veröffentlicht, und Anforderungen, die auf dem Basis-Commit schon grün waren, zählen nie.`)
};

const fr_fixproofdefprogressindex3 = /** @type {(inputs: Fixproofdefprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Part pondérée des exigences de chaque tâche qui échouaient au commit de base et passent après le correctif de l'agent, puis pondérée par la difficulté sur l'ensemble des tâches. Chaque exigence porte un poids de 2 (cœur), 1 ou 0,5 (périphérique) ; les poids et le résultat de chaque exigence sont publiés avec chaque tâche, et les exigences déjà vertes au commit de base ne comptent jamais.`)
};

const uk_fixproofdefprogressindex3 = /** @type {(inputs: Fixproofdefprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Зважена частка вимог кожної задачі, які падали на базовому коміті й проходять після патча агента, далі зважена за складністю по всіх задачах. Кожна вимога має вагу 2 (основна), 1 або 0,5 (периферійна); ваги й результати щодо кожної вимоги публікуються разом із задачею, а вимоги, що вже були зеленими на базовому коміті, ніколи не рахуються.`)
};

/**
* | output |
* | --- |
* | "Weighted share of each task's requirements that were failing at the base commit and pass after the agent's patch, then difficulty-weighted across tasks. Each..." |
*
* @param {Fixproofdefprogressindex3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofdefprogressindex3 = /** @type {((inputs?: Fixproofdefprogressindex3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofdefprogressindex3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofdefprogressindex3(inputs)
	if (locale === "zh") return zh_fixproofdefprogressindex3(inputs)
	if (locale === "ja") return ja_fixproofdefprogressindex3(inputs)
	if (locale === "ko") return ko_fixproofdefprogressindex3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofdefprogressindex3(inputs)
	if (locale === "de") return de_fixproofdefprogressindex3(inputs)
	if (locale === "fr") return fr_fixproofdefprogressindex3(inputs)
	if (locale === "uk") return uk_fixproofdefprogressindex3(inputs)
	return en_fixproofdefprogressindex3(inputs)
});
export { fixproofdefprogressindex3 as "fixproofDefProgressIndex" }