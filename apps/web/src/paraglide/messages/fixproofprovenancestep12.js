/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofprovenancestep12Inputs */

const en_fixproofprovenancestep12 = /** @type {(inputs: Fixproofprovenancestep12Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The harness checks out the base commit into a clean workspace, hides the git history and removes the design notes that would give the fix away.`)
};

const es_fixproofprovenancestep12 = /** @type {(inputs: Fixproofprovenancestep12Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`El harness hace checkout del commit base en un espacio de trabajo limpio, oculta el historial de git y quita las notas de diseño que delatarían el arreglo.`)
};

const zh_fixproofprovenancestep12 = /** @type {(inputs: Fixproofprovenancestep12Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`harness 把基线提交检出到干净的工作区，隐藏 git 历史，并删除会泄露修复思路的设计笔记。`)
};

const ja_fixproofprovenancestep12 = /** @type {(inputs: Fixproofprovenancestep12Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ハーネスはベースコミットをクリーンなワークスペースにチェックアウトし、git 履歴を隠して、修正が分かってしまう設計メモを取り除きます。`)
};

const ko_fixproofprovenancestep12 = /** @type {(inputs: Fixproofprovenancestep12Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`하네스가 베이스 커밋을 깨끗한 작업 공간에 체크아웃하고, git 히스토리를 감추고, 수정을 알려 줄 설계 노트를 제거합니다.`)
};

const zh_hant1_fixproofprovenancestep12 = /** @type {(inputs: Fixproofprovenancestep12Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`harness 把基線提交檢出到乾淨的工作區，隱藏 git 歷史，並刪除會洩漏修復思路的設計筆記。`)
};

const de_fixproofprovenancestep12 = /** @type {(inputs: Fixproofprovenancestep12Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Das Harness checkt den Basis-Commit in einen sauberen Workspace aus, verbirgt die Git-Historie und entfernt die Design-Notizen, die den Fix verraten würden.`)
};

const fr_fixproofprovenancestep12 = /** @type {(inputs: Fixproofprovenancestep12Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Le harness extrait le commit de base dans un espace de travail propre, masque l'historique git et retire les notes de conception qui livreraient le correctif.`)
};

const uk_fixproofprovenancestep12 = /** @type {(inputs: Fixproofprovenancestep12Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Harness робить checkout базового коміту в чисту робочу теку, приховує історію git і прибирає нотатки про дизайн, які видали б виправлення.`)
};

/**
* | output |
* | --- |
* | "The harness checks out the base commit into a clean workspace, hides the git history and removes the design notes that would give the fix away." |
*
* @param {Fixproofprovenancestep12Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofprovenancestep12 = /** @type {((inputs?: Fixproofprovenancestep12Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofprovenancestep12Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofprovenancestep12(inputs)
	if (locale === "zh") return zh_fixproofprovenancestep12(inputs)
	if (locale === "ja") return ja_fixproofprovenancestep12(inputs)
	if (locale === "ko") return ko_fixproofprovenancestep12(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofprovenancestep12(inputs)
	if (locale === "de") return de_fixproofprovenancestep12(inputs)
	if (locale === "fr") return fr_fixproofprovenancestep12(inputs)
	if (locale === "uk") return uk_fixproofprovenancestep12(inputs)
	return en_fixproofprovenancestep12(inputs)
});
export { fixproofprovenancestep12 as "fixproofProvenanceStep1" }