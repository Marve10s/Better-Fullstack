/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofgridcaption2Inputs */

const en_fixproofgridcaption2 = /** @type {(inputs: Fixproofgridcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One column per task, grouped by category, one row per model. Every cell is a single run.`)
};

const es_fixproofgridcaption2 = /** @type {(inputs: Fixproofgridcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Una columna por tarea, agrupadas por categoría, una fila por modelo. Cada celda es una sola ejecución.`)
};

const zh_fixproofgridcaption2 = /** @type {(inputs: Fixproofgridcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每个任务一列，按类别分组，每个模型一行。每个格子都是一次运行。`)
};

const ja_fixproofgridcaption2 = /** @type {(inputs: Fixproofgridcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`1 列が 1 タスクでカテゴリー別にまとめ、1 行が 1 モデルです。各セルは 1 回の実行を表します。`)
};

const ko_fixproofgridcaption2 = /** @type {(inputs: Fixproofgridcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`태스크마다 한 열이고 카테고리별로 묶여 있으며, 모델마다 한 행입니다. 각 칸은 한 번의 실행입니다.`)
};

const zh_hant1_fixproofgridcaption2 = /** @type {(inputs: Fixproofgridcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每個任務一欄，按類別分組，每個模型一列。每個格子都是一次執行。`)
};

const de_fixproofgridcaption2 = /** @type {(inputs: Fixproofgridcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Eine Spalte pro Aufgabe, nach Kategorie gruppiert, eine Zeile pro Modell. Jede Zelle ist ein einzelner Lauf.`)
};

const fr_fixproofgridcaption2 = /** @type {(inputs: Fixproofgridcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Une colonne par tâche, groupées par catégorie, une ligne par modèle. Chaque case est une exécution unique.`)
};

const uk_fixproofgridcaption2 = /** @type {(inputs: Fixproofgridcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Одна колонка на задачу, згруповані за категорією, один рядок на модель. Кожна клітинка відповідає одному запуску.`)
};

/**
* | output |
* | --- |
* | "One column per task, grouped by category, one row per model. Every cell is a single run." |
*
* @param {Fixproofgridcaption2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofgridcaption2 = /** @type {((inputs?: Fixproofgridcaption2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofgridcaption2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofgridcaption2(inputs)
	if (locale === "zh") return zh_fixproofgridcaption2(inputs)
	if (locale === "ja") return ja_fixproofgridcaption2(inputs)
	if (locale === "ko") return ko_fixproofgridcaption2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofgridcaption2(inputs)
	if (locale === "de") return de_fixproofgridcaption2(inputs)
	if (locale === "fr") return fr_fixproofgridcaption2(inputs)
	if (locale === "uk") return uk_fixproofgridcaption2(inputs)
	return en_fixproofgridcaption2(inputs)
});
export { fixproofgridcaption2 as "fixproofGridCaption" }