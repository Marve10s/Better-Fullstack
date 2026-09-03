/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofmethodtaskbody3Inputs */

const en_fixproofmethodtaskbody3 = /** @type {(inputs: Fixproofmethodtaskbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A task is a repository at a base commit plus a short statement of the symptom. The statement names a public seam, and the hidden tests are written at that seam, so any correct implementation passes and the agent is never asked to guess an internal design.`)
};

const es_fixproofmethodtaskbody3 = /** @type {(inputs: Fixproofmethodtaskbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Una tarea es un repositorio en un commit base más una descripción corta del síntoma. La descripción nombra una interfaz pública y las pruebas ocultas se escriben en esa interfaz, así que cualquier implementación correcta pasa y nunca se le pide al agente que adivine un diseño interno.`)
};

const zh_fixproofmethodtaskbody3 = /** @type {(inputs: Fixproofmethodtaskbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`一个任务是处于某个基线提交的仓库，加上一段简短的现象描述。描述会指明一个公开接口，隐藏测试就写在这个接口上，因此任何正确的实现都能通过，代理也不必去猜内部设计。`)
};

const ja_fixproofmethodtaskbody3 = /** @type {(inputs: Fixproofmethodtaskbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`タスクは、ベースコミット時点のリポジトリと症状の短い説明で構成されます。説明は公開インターフェースを示し、非公開テストもそのインターフェースに沿って書かれるため、正しい実装であればどれでも通り、エージェントが内部設計を推測する必要はありません。`)
};

const ko_fixproofmethodtaskbody3 = /** @type {(inputs: Fixproofmethodtaskbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`태스크는 베이스 커밋 시점의 저장소와 증상을 요약한 짧은 설명입니다. 설명은 공개 인터페이스를 지목하고 비공개 테스트도 그 인터페이스에 맞춰 작성하므로, 올바른 구현이면 무엇이든 통과하고 에이전트가 내부 설계를 추측할 일은 없습니다.`)
};

const zh_hant1_fixproofmethodtaskbody3 = /** @type {(inputs: Fixproofmethodtaskbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`一個任務是處於某個基線提交的倉庫，加上一段簡短的現象描述。描述會指明一個公開介面，隱藏測試就寫在這個介面上，因此任何正確的實作都能通過，代理程式也不必去猜內部設計。`)
};

const de_fixproofmethodtaskbody3 = /** @type {(inputs: Fixproofmethodtaskbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Eine Aufgabe ist ein Repository auf einem Basis-Commit plus eine kurze Beschreibung des Symptoms. Die Beschreibung nennt eine öffentliche Schnittstelle, und die verborgenen Tests setzen an dieser Schnittstelle an, sodass jede korrekte Umsetzung besteht und der Agent nie ein internes Design erraten muss.`)
};

const fr_fixproofmethodtaskbody3 = /** @type {(inputs: Fixproofmethodtaskbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Une tâche est un dépôt à un commit de base, plus un court énoncé du symptôme. L'énoncé désigne une interface publique, et les tests cachés sont écrits au niveau de cette interface : toute implémentation correcte passe, et on ne demande jamais à l'agent de deviner une conception interne.`)
};

const uk_fixproofmethodtaskbody3 = /** @type {(inputs: Fixproofmethodtaskbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Задача складається з репозиторію на базовому коміті та короткого опису симптому. Опис називає публічний інтерфейс, і приховані тести написані саме на ньому, тож будь-яка правильна реалізація проходить, а агента ніколи не просять вгадати внутрішній дизайн.`)
};

/**
* | output |
* | --- |
* | "A task is a repository at a base commit plus a short statement of the symptom. The statement names a public seam, and the hidden tests are written at that se..." |
*
* @param {Fixproofmethodtaskbody3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofmethodtaskbody3 = /** @type {((inputs?: Fixproofmethodtaskbody3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofmethodtaskbody3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofmethodtaskbody3(inputs)
	if (locale === "zh") return zh_fixproofmethodtaskbody3(inputs)
	if (locale === "ja") return ja_fixproofmethodtaskbody3(inputs)
	if (locale === "ko") return ko_fixproofmethodtaskbody3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofmethodtaskbody3(inputs)
	if (locale === "de") return de_fixproofmethodtaskbody3(inputs)
	if (locale === "fr") return fr_fixproofmethodtaskbody3(inputs)
	if (locale === "uk") return uk_fixproofmethodtaskbody3(inputs)
	return en_fixproofmethodtaskbody3(inputs)
});
export { fixproofmethodtaskbody3 as "fixproofMethodTaskBody" }