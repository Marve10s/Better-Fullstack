/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofmethodhiddenbody3Inputs */

const en_fixproofmethodhiddenbody3 = /** @type {(inputs: Fixproofmethodhiddenbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Git history is hidden and design notes are stripped, so the fix cannot be read out of the repository. The hidden tests never enter the workspace. Publicly a task is only an id, a category, a difficulty tier and whether it came from a private or a public repository.`)
};

const es_fixproofmethodhiddenbody3 = /** @type {(inputs: Fixproofmethodhiddenbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`El historial de git está oculto y las notas de diseño se han quitado, así que el arreglo no se puede leer en el repositorio. Las pruebas ocultas nunca entran en el espacio de trabajo. En público, una tarea es solo un id, una categoría, un nivel de dificultad y si vino de un repositorio privado o público.`)
};

const zh_fixproofmethodhiddenbody3 = /** @type {(inputs: Fixproofmethodhiddenbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`git 历史被隐藏，设计笔记被删除，因此无法从仓库里读出修复方案。隐藏测试也从不进入工作区。对外，一个任务只有 id、类别、难度等级，以及它来自私有仓库还是公开仓库。`)
};

const ja_fixproofmethodhiddenbody3 = /** @type {(inputs: Fixproofmethodhiddenbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`git 履歴は隠され設計メモも取り除かれているため、修正をリポジトリから読み取ることはできません。非公開テストがワークスペースに入ることもありません。公開されるのは、タスクの id、カテゴリー、難易度ティア、そして非公開リポジトリと公開リポジトリのどちらから来たかだけです。`)
};

const ko_fixproofmethodhiddenbody3 = /** @type {(inputs: Fixproofmethodhiddenbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`git 히스토리는 감춰져 있고 설계 노트도 제거되어 저장소에서 수정을 읽어 낼 수 없습니다. 비공개 테스트는 작업 공간에 들어오지 않습니다. 공개되는 것은 태스크의 id, 카테고리, 난이도 등급, 그리고 비공개 저장소와 공개 저장소 중 어디에서 왔는지뿐입니다.`)
};

const zh_hant1_fixproofmethodhiddenbody3 = /** @type {(inputs: Fixproofmethodhiddenbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`git 歷史被隱藏，設計筆記被刪除，因此無法從倉庫裡讀出修復方案。隱藏測試也從不進入工作區。對外，一個任務只有 id、類別、難度等級，以及它來自私有倉庫還是公開倉庫。`)
};

const de_fixproofmethodhiddenbody3 = /** @type {(inputs: Fixproofmethodhiddenbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Die Git-Historie ist verborgen und Design-Notizen sind entfernt, der Fix lässt sich also nicht aus dem Repository ablesen. Die verborgenen Tests gelangen nie in den Workspace. Öffentlich ist eine Aufgabe nur eine ID, eine Kategorie, eine Schwierigkeitsstufe und die Angabe, ob sie aus einem privaten oder einem öffentlichen Repository stammt.`)
};

const fr_fixproofmethodhiddenbody3 = /** @type {(inputs: Fixproofmethodhiddenbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`L'historique git est masqué et les notes de conception sont retirées : le correctif ne peut pas se lire dans le dépôt. Les tests cachés n'entrent jamais dans l'espace de travail. Publiquement, une tâche n'est qu'un id, une catégorie, un niveau de difficulté et l'indication qu'elle vient d'un dépôt privé ou public.`)
};

const uk_fixproofmethodhiddenbody3 = /** @type {(inputs: Fixproofmethodhiddenbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Історія git прихована, а нотатки про дизайн прибрані, тож виправлення не прочитати з репозиторію. Приховані тести ніколи не потрапляють у робочу теку. Публічно задача має лише id, категорію, рівень складності та позначку, з приватного чи публічного репозиторію вона походить.`)
};

/**
* | output |
* | --- |
* | "Git history is hidden and design notes are stripped, so the fix cannot be read out of the repository. The hidden tests never enter the workspace. Publicly a ..." |
*
* @param {Fixproofmethodhiddenbody3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofmethodhiddenbody3 = /** @type {((inputs?: Fixproofmethodhiddenbody3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofmethodhiddenbody3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofmethodhiddenbody3(inputs)
	if (locale === "zh") return zh_fixproofmethodhiddenbody3(inputs)
	if (locale === "ja") return ja_fixproofmethodhiddenbody3(inputs)
	if (locale === "ko") return ko_fixproofmethodhiddenbody3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofmethodhiddenbody3(inputs)
	if (locale === "de") return de_fixproofmethodhiddenbody3(inputs)
	if (locale === "fr") return fr_fixproofmethodhiddenbody3(inputs)
	if (locale === "uk") return uk_fixproofmethodhiddenbody3(inputs)
	return en_fixproofmethodhiddenbody3(inputs)
});
export { fixproofmethodhiddenbody3 as "fixproofMethodHiddenBody" }