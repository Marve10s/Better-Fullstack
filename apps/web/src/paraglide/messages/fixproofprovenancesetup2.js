/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofprovenancesetup2Inputs */

const en_fixproofprovenancesetup2 = /** @type {(inputs: Fixproofprovenancesetup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Each result is one run of the Antigravity CLI driving Gemini 3.8 Flash at its Low reasoning tier, against a fresh checkout of the task's base commit on a dedicated Linux bench machine with 6 cores and 15 GB of memory.`)
};

const es_fixproofprovenancesetup2 = /** @type {(inputs: Fixproofprovenancesetup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cada resultado es una ejecución de Antigravity CLI conduciendo a Gemini 3.8 Flash en su nivel de razonamiento Low, contra un checkout limpio del commit base de la tarea en una máquina Linux dedicada con 6 núcleos y 15 GB de memoria.`)
};

const zh_fixproofprovenancesetup2 = /** @type {(inputs: Fixproofprovenancesetup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每个结果都是 Antigravity CLI 驱动 Gemini 3.8 Flash 在 Low 推理档位下运行一次，针对任务基线提交的全新检出，跑在一台 6 核、15 GB 内存的专用 Linux 测试机上。`)
};

const ja_fixproofprovenancesetup2 = /** @type {(inputs: Fixproofprovenancesetup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`各結果は、Antigravity CLI が Gemini 3.8 Flash を Low の推論ティアで動かし、タスクのベースコミットを新規チェックアウトした状態に対して実行した 1 回分です。実行環境は 6 コアとメモリ 15 GB の専用 Linux ベンチマシンです。`)
};

const ko_fixproofprovenancesetup2 = /** @type {(inputs: Fixproofprovenancesetup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`각 결과는 Antigravity CLI가 Gemini 3.8 Flash를 Low 추론 등급으로 구동해, 태스크의 베이스 커밋을 새로 체크아웃한 상태에서 실행한 한 번입니다. 실행 환경은 코어 6개와 메모리 15GB를 갖춘 전용 리눅스 벤치 머신입니다.`)
};

const zh_hant1_fixproofprovenancesetup2 = /** @type {(inputs: Fixproofprovenancesetup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每個結果都是 Antigravity CLI 驅動 Gemini 3.8 Flash 在 Low 推理檔位下執行一次，針對任務基線提交的全新檢出，跑在一台 6 核、15 GB 記憶體的專用 Linux 測試機上。`)
};

const de_fixproofprovenancesetup2 = /** @type {(inputs: Fixproofprovenancesetup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Jedes Ergebnis ist ein Lauf des Antigravity CLI, das Gemini 3.8 Flash auf der Reasoning-Stufe Low steuert, gegen einen frischen Checkout des Basis-Commits der Aufgabe auf einer dedizierten Linux-Bench-Maschine mit 6 Kernen und 15 GB Arbeitsspeicher.`)
};

const fr_fixproofprovenancesetup2 = /** @type {(inputs: Fixproofprovenancesetup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Chaque résultat est une exécution d'Antigravity CLI pilotant Gemini 3.8 Flash à son niveau de raisonnement Low, sur un checkout neuf du commit de base de la tâche, sur une machine Linux dédiée avec 6 cœurs et 15 Go de mémoire.`)
};

const uk_fixproofprovenancesetup2 = /** @type {(inputs: Fixproofprovenancesetup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Кожен результат є одним запуском Antigravity CLI, який керує Gemini 3.8 Flash на рівні міркувань Low, проти свіжого checkout базового коміту задачі на виділеній Linux-машині з 6 ядрами та 15 ГБ пам'яті.`)
};

/**
* | output |
* | --- |
* | "Each result is one run of the Antigravity CLI driving Gemini 3.8 Flash at its Low reasoning tier, against a fresh checkout of the task's base commit on a ded..." |
*
* @param {Fixproofprovenancesetup2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofprovenancesetup2 = /** @type {((inputs?: Fixproofprovenancesetup2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofprovenancesetup2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofprovenancesetup2(inputs)
	if (locale === "zh") return zh_fixproofprovenancesetup2(inputs)
	if (locale === "ja") return ja_fixproofprovenancesetup2(inputs)
	if (locale === "ko") return ko_fixproofprovenancesetup2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofprovenancesetup2(inputs)
	if (locale === "de") return de_fixproofprovenancesetup2(inputs)
	if (locale === "fr") return fr_fixproofprovenancesetup2(inputs)
	if (locale === "uk") return uk_fixproofprovenancesetup2(inputs)
	return en_fixproofprovenancesetup2(inputs)
});
export { fixproofprovenancesetup2 as "fixproofProvenanceSetup" }