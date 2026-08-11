/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runresultsnotepre3Inputs */

const en_runresultsnotepre3 = /** @type {(inputs: Runresultsnotepre3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Results — a leaderboard, per-spec pass, wired-libraries, and cost — land in the output directory, in the same shape as the `)
};

const es_runresultsnotepre3 = /** @type {(inputs: Runresultsnotepre3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Los resultados (una tabla de clasificación, el resultado por especificación, las librerías integradas y el coste) se guardan en el directorio de salida, con el mismo formato que los `)
};

const zh_runresultsnotepre3 = /** @type {(inputs: Runresultsnotepre3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`结果——包括排行榜、每个规范的通过情况、已连接的库以及成本——都会保存到输出目录，格式参照`)
};

const ja_runresultsnotepre3 = /** @type {(inputs: Runresultsnotepre3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`結果（リーダーボード、仕様ごとの合否、wired-libraries、コスト）は、出力ディレクトリに保存されます。形式は次と同じです: `)
};

const ko_runresultsnotepre3 = /** @type {(inputs: Runresultsnotepre3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`결과(리더보드, 사양별 패스, 연결된 라이브러리 및 비용)는 출력 디렉터리에 다음과 같은 형식으로 저장됩니다. `)
};

const zh_hant1_runresultsnotepre3 = /** @type {(inputs: Runresultsnotepre3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`結果——排行榜、各規範的通過情況、已串接的函式庫以及成本——都會落在輸出目錄中，格式比照 `)
};

const de_runresultsnotepre3 = /** @type {(inputs: Runresultsnotepre3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Die Ergebnisse – eine Rangliste, die Ergebnisse pro Spezifikation, die verwendeten Bibliotheken und die Kosten – landen im Ausgabeverzeichnis, in der gleichen Struktur wie die `)
};

const fr_runresultsnotepre3 = /** @type {(inputs: Runresultsnotepre3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Les résultats — un classement, un passage par spécification, les bibliothèques câblées et le coût — sont enregistrés dans le répertoire de sortie, sous la même forme que le `)
};

const uk_runresultsnotepre3 = /** @type {(inputs: Runresultsnotepre3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Результати — leaderboard, проходження за специфікаціями, підключені бібліотеки й вартість — потрапляють у вихідний каталог у тому самому форматі, що й`)
};

/**
* | output |
* | --- |
* | "Results — a leaderboard, per-spec pass, wired-libraries, and cost — land in the output directory, in the same shape as the" |
*
* @param {Runresultsnotepre3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const runresultsnotepre3 = /** @type {((inputs?: Runresultsnotepre3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runresultsnotepre3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_runresultsnotepre3(inputs)
	if (locale === "zh") return zh_runresultsnotepre3(inputs)
	if (locale === "ja") return ja_runresultsnotepre3(inputs)
	if (locale === "ko") return ko_runresultsnotepre3(inputs)
	if (locale === "zh-Hant") return zh_hant1_runresultsnotepre3(inputs)
	if (locale === "de") return de_runresultsnotepre3(inputs)
	if (locale === "fr") return fr_runresultsnotepre3(inputs)
	if (locale === "uk") return uk_runresultsnotepre3(inputs)
	return en_runresultsnotepre3(inputs)
});
export { runresultsnotepre3 as "runResultsNotePre" }