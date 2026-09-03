/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofmethodindexbody3Inputs */

const en_fixproofmethodindexbody3 = /** @type {(inputs: Fixproofmethodindexbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resolved counts a task only when every hidden check passes and no regression appears. Progress is the weighted share of a task's requirements that were failing at the base commit and pass after the patch, with core requirements weighted 2 and peripheral ones 0.5; the weights and results for every requirement are part of the published data, so each task's value can be recomputed. Both weight tasks by difficulty, and checks that were already green never count toward progress.`)
};

const es_fixproofmethodindexbody3 = /** @type {(inputs: Fixproofmethodindexbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resolved cuenta una tarea solo cuando pasan todas las comprobaciones ocultas y no aparece ninguna regresión. Progress es la proporción ponderada de los requisitos de una tarea que fallaban en el commit base y pasan tras el parche, con los requisitos centrales ponderados a 2 y los periféricos a 0,5; los pesos y los resultados de cada requisito forman parte de los datos publicados, así que el valor de cada tarea se puede recalcular. Ambos ponderan las tareas por dificultad, y las comprobaciones que ya estaban en verde nunca cuentan para Progress.`)
};

const zh_fixproofmethodindexbody3 = /** @type {(inputs: Fixproofmethodindexbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resolved 只在所有隐藏检查都通过且没有出现回归时才计入一个任务。Progress 是任务中在基线提交上失败、在补丁之后通过的需求所占的加权比例，其中核心需求权重为 2，外围需求为 0.5；权重与每条需求的结果都属于公开数据，因此每个任务的取值都可以复算。两者都按难度为任务加权，而原本就已通过的检查永远不计入 Progress。`)
};

const ja_fixproofmethodindexbody3 = /** @type {(inputs: Fixproofmethodindexbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resolved は、すべての非公開チェックに合格しリグレッションが出なかった場合にのみタスクを数えます。Progress は、ベースコミットで失敗しパッチ後に成功したタスク要件の重み付き割合で、中核の要件は 2、周辺の要件は 0.5 の重みです。重みと要件ごとの結果は公開データに含まれるため、各タスクの値は再計算できます。どちらもタスクを難易度で重み付けし、すでに成功していたチェックは Progress に数えません。`)
};

const ko_fixproofmethodindexbody3 = /** @type {(inputs: Fixproofmethodindexbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resolved는 모든 비공개 검사를 통과하고 회귀가 없을 때만 태스크를 셉니다. Progress는 베이스 커밋에서 실패하고 패치 이후 통과한 태스크 요구사항의 가중 비율로, 핵심 요구사항은 2, 주변 요구사항은 0.5로 가중합니다. 가중치와 요구사항별 결과는 공개 데이터에 포함되어 태스크마다 값을 다시 계산할 수 있습니다. 둘 다 태스크를 난이도로 가중하며, 이미 통과하던 검사는 Progress에 넣지 않습니다.`)
};

const zh_hant1_fixproofmethodindexbody3 = /** @type {(inputs: Fixproofmethodindexbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resolved 只在所有隱藏檢查都通過且沒有出現迴歸時才計入一個任務。Progress 是任務中在基線提交上失敗、在修補之後通過的需求所占的加權比例，其中核心需求權重為 2，外圍需求為 0.5；權重與每條需求的結果都屬於公開資料，因此每個任務的取值都可以重新計算。兩者都按難度為任務加權，而原本就已通過的檢查永遠不計入 Progress。`)
};

const de_fixproofmethodindexbody3 = /** @type {(inputs: Fixproofmethodindexbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resolved zählt eine Aufgabe nur, wenn jede verborgene Prüfung besteht und keine Regression auftritt. Progress ist der gewichtete Anteil der Anforderungen einer Aufgabe, die auf dem Basis-Commit fehlgeschlagen sind und nach dem Patch bestehen, wobei Kernanforderungen mit 2 und Randanforderungen mit 0,5 gewichtet werden; die Gewichte und die Ergebnisse jeder Anforderung sind Teil der veröffentlichten Daten, der Wert jeder Aufgabe lässt sich also nachrechnen. Beide gewichten Aufgaben nach Schwierigkeit, und Prüfungen, die schon grün waren, zählen nie für Progress.`)
};

const fr_fixproofmethodindexbody3 = /** @type {(inputs: Fixproofmethodindexbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resolved ne compte une tâche que si toutes les vérifications cachées passent et qu'aucune régression n'apparaît. Progress est la part pondérée des exigences d'une tâche qui échouaient au commit de base et passent après le correctif, les exigences de cœur pesant 2 et les périphériques 0,5 ; les poids et les résultats de chaque exigence font partie des données publiées, la valeur de chaque tâche peut donc être recalculée. Les deux pondèrent les tâches par difficulté, et les vérifications déjà vertes ne comptent jamais pour Progress.`)
};

const uk_fixproofmethodindexbody3 = /** @type {(inputs: Fixproofmethodindexbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resolved рахує задачу лише тоді, коли пройшли всі приховані перевірки й не виникло регресій. Progress є зваженою часткою вимог задачі, які падали на базовому коміті й проходять після патча, де основні вимоги мають вагу 2, а периферійні 0,5; ваги й результати кожної вимоги входять в опубліковані дані, тож значення кожної задачі можна перерахувати. Обидва зважують задачі за складністю, а перевірки, що вже були зеленими, ніколи не йдуть у Progress.`)
};

/**
* | output |
* | --- |
* | "Resolved counts a task only when every hidden check passes and no regression appears. Progress is the weighted share of a task's requirements that were faili..." |
*
* @param {Fixproofmethodindexbody3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofmethodindexbody3 = /** @type {((inputs?: Fixproofmethodindexbody3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofmethodindexbody3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofmethodindexbody3(inputs)
	if (locale === "zh") return zh_fixproofmethodindexbody3(inputs)
	if (locale === "ja") return ja_fixproofmethodindexbody3(inputs)
	if (locale === "ko") return ko_fixproofmethodindexbody3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofmethodindexbody3(inputs)
	if (locale === "de") return de_fixproofmethodindexbody3(inputs)
	if (locale === "fr") return fr_fixproofmethodindexbody3(inputs)
	if (locale === "uk") return uk_fixproofmethodindexbody3(inputs)
	return en_fixproofmethodindexbody3(inputs)
});
export { fixproofmethodindexbody3 as "fixproofMethodIndexBody" }