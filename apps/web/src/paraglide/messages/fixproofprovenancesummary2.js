/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofprovenancesummary2Inputs */

const en_fixproofprovenancesummary2 = /** @type {(inputs: Fixproofprovenancesummary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Every number comes from a recorded unattended run of the named agent CLI on a dedicated Linux bench machine, against the task's base commit and graded by hidden tests that were proven red at that commit and green with the maintainers' fix. Nothing here is hand-scored.`)
};

const es_fixproofprovenancesummary2 = /** @type {(inputs: Fixproofprovenancesummary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cada cifra sale de una ejecución registrada y sin supervisión de la CLI del agente indicada, en una máquina de pruebas Linux dedicada, contra el commit base de la tarea y puntuada por pruebas ocultas que estaban en rojo en ese commit y en verde con la corrección de los mantenedores. Aquí no hay nada puntuado a mano.`)
};

const zh_fixproofprovenancesummary2 = /** @type {(inputs: Fixproofprovenancesummary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每个数字都来自在专用 Linux 基准机器上无人值守运行指定 agent CLI 的记录，针对任务的基础提交，由隐藏测试判定：这些测试在该提交上确认为红，在维护者的修复下确认为绿。这里没有任何人工打分。`)
};

const ja_fixproofprovenancesummary2 = /** @type {(inputs: Fixproofprovenancesummary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`すべての数値は、専用の Linux ベンチマシンで指定のエージェント CLI を無人実行した記録から得ています。判定はタスクのベースコミットに対して行い、そのコミットでは赤、メンテナの修正では緑になることを確認済みの非公開テストが採点します。手作業での採点はありません。`)
};

const ko_fixproofprovenancesummary2 = /** @type {(inputs: Fixproofprovenancesummary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`모든 수치는 전용 Linux 벤치 머신에서 지정된 에이전트 CLI를 무인으로 실행한 기록에서 나옵니다. 채점은 태스크의 기준 커밋을 대상으로 하며, 그 커밋에서는 실패하고 메인테이너의 수정으로는 통과함이 확인된 비공개 테스트가 판정합니다. 손으로 매긴 값은 없습니다.`)
};

const zh_hant1_fixproofprovenancesummary2 = /** @type {(inputs: Fixproofprovenancesummary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每個數字都來自在專用 Linux 基準機器上無人值守執行指定 agent CLI 的記錄，針對任務的基礎 commit，由隱藏測試判定：這些測試在該 commit 上確認為紅，在維護者的修正下確認為綠。這裡沒有任何人工評分。`)
};

const de_fixproofprovenancesummary2 = /** @type {(inputs: Fixproofprovenancesummary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Jede Zahl stammt aus einem aufgezeichneten, unbeaufsichtigten Lauf des genannten Agent-CLI auf einer eigenen Linux-Benchmaschine, gegen den Basis-Commit der Aufgabe und bewertet von verborgenen Tests, die bei diesem Commit nachweislich rot und mit dem Fix der Maintainer grün waren. Nichts hier ist von Hand bewertet.`)
};

const fr_fixproofprovenancesummary2 = /** @type {(inputs: Fixproofprovenancesummary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Chaque chiffre sort d'une exécution enregistrée et sans supervision du CLI d'agent indiqué, sur une machine de test Linux dédiée, face au commit de base de la tâche et noté par des tests cachés vérifiés rouges à ce commit et verts avec le correctif des mainteneurs. Rien ici n'est noté à la main.`)
};

const uk_fixproofprovenancesummary2 = /** @type {(inputs: Fixproofprovenancesummary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Кожне число походить із записаного автономного запуску вказаного агентського CLI на окремій Linux-машині для бенчмарків, проти базового коміту задачі та з оцінюванням прихованими тестами, які були червоними на цьому коміті й зеленими з виправленням мейнтейнерів. Тут немає нічого оціненого вручну.`)
};

/**
* | output |
* | --- |
* | "Every number comes from a recorded unattended run of the named agent CLI on a dedicated Linux bench machine, against the task's base commit and graded by hid..." |
*
* @param {Fixproofprovenancesummary2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofprovenancesummary2 = /** @type {((inputs?: Fixproofprovenancesummary2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofprovenancesummary2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofprovenancesummary2(inputs)
	if (locale === "zh") return zh_fixproofprovenancesummary2(inputs)
	if (locale === "ja") return ja_fixproofprovenancesummary2(inputs)
	if (locale === "ko") return ko_fixproofprovenancesummary2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofprovenancesummary2(inputs)
	if (locale === "de") return de_fixproofprovenancesummary2(inputs)
	if (locale === "fr") return fr_fixproofprovenancesummary2(inputs)
	if (locale === "uk") return uk_fixproofprovenancesummary2(inputs)
	return en_fixproofprovenancesummary2(inputs)
});
export { fixproofprovenancesummary2 as "fixproofProvenanceSummary" }