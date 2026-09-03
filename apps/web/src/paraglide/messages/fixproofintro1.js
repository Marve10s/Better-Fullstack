/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofintro1Inputs */

const en_fixproofintro1 = /** @type {(inputs: Fixproofintro1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Every task is a repository at a base commit and a short statement of the symptom. The agent gets the code with its history hidden and design notes stripped, and 30 minutes to fix it. Hidden tests written at the seam the statement names decide the result: red at the base commit, green with the maintainers' fix, and open to any correct implementation.`)
};

const es_fixproofintro1 = /** @type {(inputs: Fixproofintro1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cada tarea es un repositorio en un commit base y una descripción corta del síntoma. El agente recibe el código con el historial oculto y sin las notas de diseño, y 30 minutos para arreglarlo. Deciden las pruebas ocultas, escritas en la interfaz que nombra la descripción: en rojo en el commit base, en verde con el arreglo de los mantenedores y abiertas a cualquier implementación correcta.`)
};

const zh_fixproofintro1 = /** @type {(inputs: Fixproofintro1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每个任务都是处于某个基线提交的仓库，外加一段简短的现象描述。代理拿到的是隐藏了历史、去掉了设计笔记的代码，以及 30 分钟的修复时间。判定由隐藏测试完成，它们写在描述所指的公开接口上：在基线提交上是红的，用维护者的修复是绿的，并且对任何正确的实现都开放。`)
};

const ja_fixproofintro1 = /** @type {(inputs: Fixproofintro1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`各タスクは、ベースコミット時点のリポジトリと症状の短い説明で構成されます。エージェントには履歴を隠し設計メモを取り除いたコードと、修正のための 30 分が与えられます。判定するのは、説明が示す公開インターフェースに沿って書かれた非公開テストです。ベースコミットでは失敗し、メンテナーの修正では成功し、正しい実装であればどれでも通ります。`)
};

const ko_fixproofintro1 = /** @type {(inputs: Fixproofintro1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`각 태스크는 베이스 커밋 시점의 저장소와 증상을 요약한 짧은 설명으로 이루어집니다. 에이전트는 히스토리를 감추고 설계 노트를 제거한 코드와 30분의 수정 시간을 받습니다. 판정은 설명이 지목한 공개 인터페이스에 맞춰 작성한 비공개 테스트가 합니다. 베이스 커밋에서는 실패하고, 메인테이너의 수정에서는 통과하며, 올바른 구현이라면 무엇이든 통과합니다.`)
};

const zh_hant1_fixproofintro1 = /** @type {(inputs: Fixproofintro1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每個任務都是處於某個基線提交的倉庫，外加一段簡短的現象描述。代理程式拿到的是隱藏了歷史、去掉了設計筆記的程式碼，以及 30 分鐘的修復時間。判定由隱藏測試完成，它們寫在描述所指的公開介面上：在基線提交上是紅的，用維護者的修復是綠的，並且對任何正確的實作都開放。`)
};

const de_fixproofintro1 = /** @type {(inputs: Fixproofintro1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Jede Aufgabe ist ein Repository auf einem Basis-Commit und eine kurze Beschreibung des Symptoms. Der Agent bekommt den Code mit verborgener Historie und ohne Design-Notizen sowie 30 Minuten, um den Fehler zu beheben. Entschieden wird über verborgene Tests, die an der in der Beschreibung genannten Schnittstelle ansetzen: rot auf dem Basis-Commit, grün mit dem Fix der Maintainer und offen für jede korrekte Umsetzung.`)
};

const fr_fixproofintro1 = /** @type {(inputs: Fixproofintro1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Chaque tâche est un dépôt à un commit de base et un court énoncé du symptôme. L'agent reçoit le code avec son historique masqué et les notes de conception retirées, et 30 minutes pour corriger. Ce sont les tests cachés, écrits au niveau de l'interface que l'énoncé désigne, qui décident : rouges au commit de base, verts avec le correctif des mainteneurs, et ouverts à toute implémentation correcte.`)
};

const uk_fixproofintro1 = /** @type {(inputs: Fixproofintro1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Кожна задача складається з репозиторію на базовому коміті та короткого опису симптому. Агент отримує код із прихованою історією та без нотаток про дизайн, а також 30 хвилин на виправлення. Вирішують приховані тести, написані на тому публічному інтерфейсі, який названо в описі: червоні на базовому коміті, зелені з виправленням мейнтейнерів і відкриті до будь-якої правильної реалізації.`)
};

/**
* | output |
* | --- |
* | "Every task is a repository at a base commit and a short statement of the symptom. The agent gets the code with its history hidden and design notes stripped, ..." |
*
* @param {Fixproofintro1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofintro1 = /** @type {((inputs?: Fixproofintro1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofintro1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofintro1(inputs)
	if (locale === "zh") return zh_fixproofintro1(inputs)
	if (locale === "ja") return ja_fixproofintro1(inputs)
	if (locale === "ko") return ko_fixproofintro1(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofintro1(inputs)
	if (locale === "de") return de_fixproofintro1(inputs)
	if (locale === "fr") return fr_fixproofintro1(inputs)
	if (locale === "uk") return uk_fixproofintro1(inputs)
	return en_fixproofintro1(inputs)
});
export { fixproofintro1 as "fixproofIntro" }