/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofprovenancevalidation2Inputs */

const en_fixproofprovenancevalidation2 = /** @type {(inputs: Fixproofprovenancevalidation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Each hidden test set had to fail on the base commit and pass with the maintainers' fix before a single run was scored against it.`)
};

const es_fixproofprovenancevalidation2 = /** @type {(inputs: Fixproofprovenancevalidation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cada conjunto de pruebas ocultas tenía que fallar en el commit base y pasar con el arreglo de los mantenedores antes de evaluar una sola ejecución con él.`)
};

const zh_fixproofprovenancevalidation2 = /** @type {(inputs: Fixproofprovenancevalidation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每一组隐藏测试都必须在基线提交上失败、在维护者的修复下通过，之后才会用它来评测任何一次运行。`)
};

const ja_fixproofprovenancevalidation2 = /** @type {(inputs: Fixproofprovenancevalidation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`どの非公開テストも、ベースコミットで失敗しメンテナーの修正で成功することを確かめてから、実行の採点に使いました。`)
};

const ko_fixproofprovenancevalidation2 = /** @type {(inputs: Fixproofprovenancevalidation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`모든 비공개 테스트 세트는 베이스 커밋에서 실패하고 메인테이너의 수정에서 통과해야 했고, 그 뒤에야 실행 채점에 쓰였습니다.`)
};

const zh_hant1_fixproofprovenancevalidation2 = /** @type {(inputs: Fixproofprovenancevalidation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每一組隱藏測試都必須在基線提交上失敗、在維護者的修復下通過，之後才會用它來評測任何一次執行。`)
};

const de_fixproofprovenancevalidation2 = /** @type {(inputs: Fixproofprovenancevalidation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Jeder Satz verborgener Tests musste auf dem Basis-Commit fehlschlagen und mit dem Fix der Maintainer bestehen, bevor ein einziger Lauf damit bewertet wurde.`)
};

const fr_fixproofprovenancevalidation2 = /** @type {(inputs: Fixproofprovenancevalidation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Chaque jeu de tests cachés devait échouer au commit de base et passer avec le correctif des mainteneurs avant qu'une seule exécution soit notée avec lui.`)
};

const uk_fixproofprovenancevalidation2 = /** @type {(inputs: Fixproofprovenancevalidation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Кожен набір прихованих тестів мусив падати на базовому коміті й проходити з виправленням мейнтейнерів, перш ніж за ним оцінили хоч один запуск.`)
};

/**
* | output |
* | --- |
* | "Each hidden test set had to fail on the base commit and pass with the maintainers' fix before a single run was scored against it." |
*
* @param {Fixproofprovenancevalidation2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofprovenancevalidation2 = /** @type {((inputs?: Fixproofprovenancevalidation2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofprovenancevalidation2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofprovenancevalidation2(inputs)
	if (locale === "zh") return zh_fixproofprovenancevalidation2(inputs)
	if (locale === "ja") return ja_fixproofprovenancevalidation2(inputs)
	if (locale === "ko") return ko_fixproofprovenancevalidation2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofprovenancevalidation2(inputs)
	if (locale === "de") return de_fixproofprovenancevalidation2(inputs)
	if (locale === "fr") return fr_fixproofprovenancevalidation2(inputs)
	if (locale === "uk") return uk_fixproofprovenancevalidation2(inputs)
	return en_fixproofprovenancevalidation2(inputs)
});
export { fixproofprovenancevalidation2 as "fixproofProvenanceValidation" }