/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixprooffooternote2Inputs */

const en_fixprooffooternote2 = /** @type {(inputs: Fixprooffooternote2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Preliminary: one model, one trial per task, and three tasks still pending. These numbers will change as trials and models are added.`)
};

const es_fixprooffooternote2 = /** @type {(inputs: Fixprooffooternote2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Preliminar: un modelo, un intento por tarea y tres tareas todavía pendientes. Estas cifras cambiarán a medida que se añadan intentos y modelos.`)
};

const zh_fixprooffooternote2 = /** @type {(inputs: Fixprooffooternote2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`初步结果：一个模型，每个任务一次试验，还有三个任务待运行。随着试验和模型增加，这些数字会变化。`)
};

const ja_fixprooffooternote2 = /** @type {(inputs: Fixprooffooternote2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暫定的な結果です。モデルは 1 つ、タスクあたりの試行は 1 回で、3 つのタスクは保留中です。試行とモデルが増えれば、この数値も変わります。`)
};

const ko_fixprooffooternote2 = /** @type {(inputs: Fixprooffooternote2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`예비 결과입니다. 모델 하나, 태스크당 시도 한 번이며 세 태스크는 아직 대기 중입니다. 시도와 모델이 늘어나면 이 수치는 달라집니다.`)
};

const zh_hant1_fixprooffooternote2 = /** @type {(inputs: Fixprooffooternote2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`初步結果：一個模型，每個任務一次試驗，還有三個任務待執行。隨著試驗和模型增加，這些數字會變化。`)
};

const de_fixprooffooternote2 = /** @type {(inputs: Fixprooffooternote2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vorläufig: ein Modell, ein Versuch pro Aufgabe und drei Aufgaben stehen noch aus. Diese Zahlen ändern sich, sobald Versuche und Modelle hinzukommen.`)
};

const fr_fixprooffooternote2 = /** @type {(inputs: Fixprooffooternote2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Préliminaire : un modèle, un essai par tâche, et trois tâches encore en attente. Ces chiffres évolueront à mesure que des essais et des modèles seront ajoutés.`)
};

const uk_fixprooffooternote2 = /** @type {(inputs: Fixprooffooternote2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Попередні дані: одна модель, одна спроба на задачу і три задачі ще в очікуванні. Ці числа зміняться, коли додамо спроби та моделі.`)
};

/**
* | output |
* | --- |
* | "Preliminary: one model, one trial per task, and three tasks still pending. These numbers will change as trials and models are added." |
*
* @param {Fixprooffooternote2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixprooffooternote2 = /** @type {((inputs?: Fixprooffooternote2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixprooffooternote2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixprooffooternote2(inputs)
	if (locale === "zh") return zh_fixprooffooternote2(inputs)
	if (locale === "ja") return ja_fixprooffooternote2(inputs)
	if (locale === "ko") return ko_fixprooffooternote2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixprooffooternote2(inputs)
	if (locale === "de") return de_fixprooffooternote2(inputs)
	if (locale === "fr") return fr_fixprooffooternote2(inputs)
	if (locale === "uk") return uk_fixprooffooternote2(inputs)
	return en_fixprooffooternote2(inputs)
});
export { fixprooffooternote2 as "fixproofFooterNote" }