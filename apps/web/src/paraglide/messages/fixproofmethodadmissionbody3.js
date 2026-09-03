/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofmethodadmissionbody3Inputs */

const en_fixproofmethodadmissionbody3 = /** @type {(inputs: Fixproofmethodadmissionbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A candidate joins the set only when its hidden tests are red at the base commit and green with the maintainers' fix. Before a board is final it must also stay green with a different correct fix, and a weak model has to fail it while a strong model passes it, so the task separates instead of blocking everyone. The dry run below has passed the first gate only.`)
};

const es_fixproofmethodadmissionbody3 = /** @type {(inputs: Fixproofmethodadmissionbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Una candidata entra en el conjunto solo cuando sus pruebas ocultas están en rojo en el commit base y en verde con el arreglo de los mantenedores. Antes de que una tabla sea definitiva, también debe seguir en verde con otro arreglo correcto, y un modelo débil tiene que fallarla mientras uno fuerte la pasa, para que la tarea separe en vez de bloquear a todos. La ejecución de prueba de abajo solo ha pasado la primera puerta.`)
};

const zh_fixproofmethodadmissionbody3 = /** @type {(inputs: Fixproofmethodadmissionbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`候选任务只有在隐藏测试于基线提交上是红的、用维护者的修复是绿的，才会进入任务集。榜单定稿前，它还必须在另一份正确的修复下保持绿色，并且要让弱模型失败、强模型通过，这样任务才能区分出差距，而不是把所有人都挡在门外。下面这次试运行只通过了第一道关卡。`)
};

const ja_fixproofmethodadmissionbody3 = /** @type {(inputs: Fixproofmethodadmissionbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`候補がセットに加わるのは、非公開テストがベースコミットで失敗し、メンテナーの修正で成功するときだけです。ボードを確定する前には、別の正しい修正でも成功し続けること、そして弱いモデルは失敗し強いモデルは成功することも必要です。タスクが全員を止めるのではなく、差を付けるためです。下のドライランは最初の条件だけを満たしています。`)
};

const ko_fixproofmethodadmissionbody3 = /** @type {(inputs: Fixproofmethodadmissionbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`후보는 비공개 테스트가 베이스 커밋에서 실패하고 메인테이너의 수정에서 통과할 때만 세트에 들어옵니다. 보드를 확정하기 전에는 다른 올바른 수정으로도 계속 통과해야 하고, 약한 모델은 실패하고 강한 모델은 통과해야 합니다. 태스크가 모두를 막는 대신 실력을 갈라 놓아야 하기 때문입니다. 아래 드라이런은 첫 관문만 통과했습니다.`)
};

const zh_hant1_fixproofmethodadmissionbody3 = /** @type {(inputs: Fixproofmethodadmissionbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`候選任務只有在隱藏測試於基線提交上是紅的、用維護者的修復是綠的，才會進入任務集。榜單定案前，它還必須在另一份正確的修復下保持綠色，並且要讓弱模型失敗、強模型通過，這樣任務才能區分出差距，而不是把所有人都擋在門外。下面這次試執行只通過了第一道關卡。`)
};

const de_fixproofmethodadmissionbody3 = /** @type {(inputs: Fixproofmethodadmissionbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ein Kandidat kommt nur in die Menge, wenn seine verborgenen Tests auf dem Basis-Commit rot sind und mit dem Fix der Maintainer grün. Bevor eine Rangliste endgültig ist, muss die Aufgabe außerdem mit einem anderen korrekten Fix grün bleiben, und ein schwaches Modell muss an ihr scheitern, während ein starkes sie besteht, damit die Aufgabe trennt statt alle zu blockieren. Der Testlauf unten hat nur die erste Hürde genommen.`)
};

const fr_fixproofmethodadmissionbody3 = /** @type {(inputs: Fixproofmethodadmissionbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Une candidate rejoint l'ensemble seulement quand ses tests cachés sont rouges au commit de base et verts avec le correctif des mainteneurs. Avant qu'un tableau soit définitif, elle doit aussi rester verte avec un autre correctif correct, et un modèle faible doit échouer là où un modèle fort réussit, pour que la tâche sépare au lieu de bloquer tout le monde. L'essai à blanc ci-dessous n'a franchi que la première étape.`)
};

const uk_fixproofmethodadmissionbody3 = /** @type {(inputs: Fixproofmethodadmissionbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Кандидат потрапляє в набір лише тоді, коли його приховані тести червоні на базовому коміті й зелені з виправленням мейнтейнерів. Перед тим як таблиця стане остаточною, задача має лишатися зеленою і з іншим правильним виправленням, а слабка модель має її провалити, тоді як сильна проходить, щоб задача розділяла, а не блокувала всіх. Пробний запуск нижче пройшов лише перший етап.`)
};

/**
* | output |
* | --- |
* | "A candidate joins the set only when its hidden tests are red at the base commit and green with the maintainers' fix. Before a board is final it must also sta..." |
*
* @param {Fixproofmethodadmissionbody3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofmethodadmissionbody3 = /** @type {((inputs?: Fixproofmethodadmissionbody3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofmethodadmissionbody3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofmethodadmissionbody3(inputs)
	if (locale === "zh") return zh_fixproofmethodadmissionbody3(inputs)
	if (locale === "ja") return ja_fixproofmethodadmissionbody3(inputs)
	if (locale === "ko") return ko_fixproofmethodadmissionbody3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofmethodadmissionbody3(inputs)
	if (locale === "de") return de_fixproofmethodadmissionbody3(inputs)
	if (locale === "fr") return fr_fixproofmethodadmissionbody3(inputs)
	if (locale === "uk") return uk_fixproofmethodadmissionbody3(inputs)
	return en_fixproofmethodadmissionbody3(inputs)
});
export { fixproofmethodadmissionbody3 as "fixproofMethodAdmissionBody" }