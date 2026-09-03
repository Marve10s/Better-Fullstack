/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofdefsolvedovergraded4Inputs */

const en_fixproofdefsolvedovergraded4 = /** @type {(inputs: Fixproofdefsolvedovergraded4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tasks fully resolved out of the tasks graded so far. Pending tasks and excluded runs are not in the denominator.`)
};

const es_fixproofdefsolvedovergraded4 = /** @type {(inputs: Fixproofdefsolvedovergraded4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tareas resueltas por completo sobre las tareas evaluadas hasta ahora. Las tareas pendientes y las ejecuciones excluidas no están en el denominador.`)
};

const zh_fixproofdefsolvedovergraded4 = /** @type {(inputs: Fixproofdefsolvedovergraded4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在目前已评测的任务中完全解决的数量。待运行的任务和被排除的运行不计入分母。`)
};

const ja_fixproofdefsolvedovergraded4 = /** @type {(inputs: Fixproofdefsolvedovergraded4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`これまでに採点したタスクのうち、完全に解決したタスクの数です。保留中のタスクと除外した実行は分母に含みません。`)
};

const ko_fixproofdefsolvedovergraded4 = /** @type {(inputs: Fixproofdefsolvedovergraded4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`지금까지 채점한 태스크 중 완전히 해결한 태스크입니다. 대기 중인 태스크와 제외된 실행은 분모에 넣지 않습니다.`)
};

const zh_hant1_fixproofdefsolvedovergraded4 = /** @type {(inputs: Fixproofdefsolvedovergraded4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在目前已評測的任務中完全解決的數量。待執行的任務和被排除的執行不計入分母。`)
};

const de_fixproofdefsolvedovergraded4 = /** @type {(inputs: Fixproofdefsolvedovergraded4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vollständig gelöste Aufgaben von den bisher bewerteten Aufgaben. Ausstehende Aufgaben und ausgeschlossene Läufe stehen nicht im Nenner.`)
};

const fr_fixproofdefsolvedovergraded4 = /** @type {(inputs: Fixproofdefsolvedovergraded4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tâches entièrement résolues sur les tâches évaluées jusqu'ici. Les tâches en attente et les exécutions exclues ne sont pas au dénominateur.`)
};

const uk_fixproofdefsolvedovergraded4 = /** @type {(inputs: Fixproofdefsolvedovergraded4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Повністю вирішені задачі з тих, що вже оцінені. Задачі в очікуванні та виключені запуски не входять у знаменник.`)
};

/**
* | output |
* | --- |
* | "Tasks fully resolved out of the tasks graded so far. Pending tasks and excluded runs are not in the denominator." |
*
* @param {Fixproofdefsolvedovergraded4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofdefsolvedovergraded4 = /** @type {((inputs?: Fixproofdefsolvedovergraded4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofdefsolvedovergraded4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofdefsolvedovergraded4(inputs)
	if (locale === "zh") return zh_fixproofdefsolvedovergraded4(inputs)
	if (locale === "ja") return ja_fixproofdefsolvedovergraded4(inputs)
	if (locale === "ko") return ko_fixproofdefsolvedovergraded4(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofdefsolvedovergraded4(inputs)
	if (locale === "de") return de_fixproofdefsolvedovergraded4(inputs)
	if (locale === "fr") return fr_fixproofdefsolvedovergraded4(inputs)
	if (locale === "uk") return uk_fixproofdefsolvedovergraded4(inputs)
	return en_fixproofdefsolvedovergraded4(inputs)
});
export { fixproofdefsolvedovergraded4 as "fixproofDefSolvedOverGraded" }