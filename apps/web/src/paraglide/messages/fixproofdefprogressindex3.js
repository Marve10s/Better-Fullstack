/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofdefprogressindex3Inputs */

const en_fixproofdefprogressindex3 = /** @type {(inputs: Fixproofdefprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Weighted share of each task's requirements that were failing at the base commit and pass after the agent's patch, then difficulty-weighted across tasks. Each requirement carries a weight of 2 (core), 1 or 0.5 (peripheral); requirements already green at base and untested requirements are excluded from both the numerator and denominator.`)
};

const es_fixproofdefprogressindex3 = /** @type {(inputs: Fixproofdefprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Proporción ponderada de los requisitos de cada tarea que fallaban en el commit base y pasan tras el parche del agente, ponderada después por dificultad entre tareas. Cada requisito lleva un peso de 2 (central), 1 o 0,5 (periférico); los requisitos que ya pasaban en el commit base y los requisitos no probados se excluyen tanto del numerador como del denominador.`)
};

const zh_fixproofdefprogressindex3 = /** @type {(inputs: Fixproofdefprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每个任务中，在基线提交上失败、在代理的补丁之后通过的需求所占的加权比例，再按难度在任务之间加权。每条需求的权重为 2（核心）、1 或 0.5（外围）；在基线提交上已经通过的需求和未经测试的需求均从分子和分母中排除。`)
};

const ja_fixproofdefprogressindex3 = /** @type {(inputs: Fixproofdefprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`各タスクの要件のうち、ベースコミットでは失敗しエージェントのパッチ後に成功するものの重み付き割合を求め、さらにタスク間で難易度による重み付けを行った値です。各要件の重みは 2 (中核)、1 または 0.5 (周辺) です。ベースコミットの時点ですでに成功していた要件と未テストの要件は、分子と分母の両方から除外します。`)
};

const ko_fixproofdefprogressindex3 = /** @type {(inputs: Fixproofdefprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`각 태스크의 요구사항 중 베이스 커밋에서 실패하고 에이전트의 패치 이후 통과한 비율을 가중해 구한 뒤, 태스크 사이에서 난이도로 다시 가중한 값입니다. 요구사항의 가중치는 2(핵심), 1 또는 0.5(주변)입니다. 베이스 커밋에서 이미 통과하던 요구사항과 테스트하지 않은 요구사항은 분자와 분모에서 모두 제외합니다.`)
};

const zh_hant1_fixproofdefprogressindex3 = /** @type {(inputs: Fixproofdefprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每個任務中，在基線提交上失敗、在代理程式的修補之後通過的需求所占的加權比例，再按難度在任務之間加權。每條需求的權重為 2（核心）、1 或 0.5（外圍）；在基線提交上已經通過的需求和未經測試的需求均從分子和分母中排除。`)
};

const de_fixproofdefprogressindex3 = /** @type {(inputs: Fixproofdefprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gewichteter Anteil der Anforderungen einer Aufgabe, die auf dem Basis-Commit fehlgeschlagen sind und nach dem Patch des Agenten bestehen, anschließend über alle Aufgaben nach Schwierigkeit gewichtet. Jede Anforderung hat ein Gewicht von 2 (Kern), 1 oder 0,5 (Rand); Anforderungen, die auf dem Basis-Commit schon grün waren, sowie ungetestete Anforderungen werden sowohl aus dem Zähler als auch aus dem Nenner ausgeschlossen.`)
};

const fr_fixproofdefprogressindex3 = /** @type {(inputs: Fixproofdefprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Part pondérée des exigences de chaque tâche qui échouaient au commit de base et passent après le correctif de l'agent, puis pondérée par la difficulté sur l'ensemble des tâches. Chaque exigence porte un poids de 2 (cœur), 1 ou 0,5 (périphérique) ; les exigences déjà satisfaites au commit de base et les exigences non testées sont exclues du numérateur comme du dénominateur.`)
};

const uk_fixproofdefprogressindex3 = /** @type {(inputs: Fixproofdefprogressindex3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Зважена частка вимог кожної задачі, які падали на базовому коміті й проходять після патча агента, далі зважена за складністю по всіх задачах. Кожна вимога має вагу 2 (основна), 1 або 0,5 (периферійна); вимоги, що вже проходили на базовому коміті, та неперевірені вимоги виключаються і з чисельника, і зі знаменника.`)
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