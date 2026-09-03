/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofboardcaption2Inputs */

const en_fixproofboardcaption2 = /** @type {(inputs: Fixproofboardcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One row per model. Sort by either index. The question mark on a column explains what it counts.`)
};

const es_fixproofboardcaption2 = /** @type {(inputs: Fixproofboardcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Una fila por modelo. Ordena por cualquiera de los dos índices. El signo de interrogación de cada columna explica qué cuenta.`)
};

const zh_fixproofboardcaption2 = /** @type {(inputs: Fixproofboardcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每个模型一行。可按任一指数排序。列上的问号会说明这一列统计的是什么。`)
};

const ja_fixproofboardcaption2 = /** @type {(inputs: Fixproofboardcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`1 行が 1 モデルです。どちらの指数でも並べ替えられます。列の疑問符は、その列が何を数えているかを説明します。`)
};

const ko_fixproofboardcaption2 = /** @type {(inputs: Fixproofboardcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`모델마다 한 행입니다. 두 지수 중 어느 쪽으로도 정렬할 수 있습니다. 열의 물음표는 그 열이 무엇을 세는지 설명합니다.`)
};

const zh_hant1_fixproofboardcaption2 = /** @type {(inputs: Fixproofboardcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每個模型一列。可按任一指數排序。欄位上的問號會說明這一欄統計的是什麼。`)
};

const de_fixproofboardcaption2 = /** @type {(inputs: Fixproofboardcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Eine Zeile pro Modell. Sortierbar nach beiden Indizes. Das Fragezeichen an einer Spalte erklärt, was sie zählt.`)
};

const fr_fixproofboardcaption2 = /** @type {(inputs: Fixproofboardcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Une ligne par modèle. Triez selon l'un ou l'autre indice. Le point d'interrogation d'une colonne explique ce qu'elle compte.`)
};

const uk_fixproofboardcaption2 = /** @type {(inputs: Fixproofboardcaption2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Один рядок на модель. Сортування за будь-яким з індексів. Знак питання біля колонки пояснює, що вона рахує.`)
};

/**
* | output |
* | --- |
* | "One row per model. Sort by either index. The question mark on a column explains what it counts." |
*
* @param {Fixproofboardcaption2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofboardcaption2 = /** @type {((inputs?: Fixproofboardcaption2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofboardcaption2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofboardcaption2(inputs)
	if (locale === "zh") return zh_fixproofboardcaption2(inputs)
	if (locale === "ja") return ja_fixproofboardcaption2(inputs)
	if (locale === "ko") return ko_fixproofboardcaption2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofboardcaption2(inputs)
	if (locale === "de") return de_fixproofboardcaption2(inputs)
	if (locale === "fr") return fr_fixproofboardcaption2(inputs)
	if (locale === "uk") return uk_fixproofboardcaption2(inputs)
	return en_fixproofboardcaption2(inputs)
});
export { fixproofboardcaption2 as "fixproofBoardCaption" }