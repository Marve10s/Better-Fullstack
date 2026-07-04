/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runresultsnotepre3Inputs */

const en_runresultsnotepre3 = /** @type {(inputs: Runresultsnotepre3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Results — a leaderboard, per-spec pass, wired-libraries, and cost — land in the output directory, in the same shape as the `)
};

const es_runresultsnotepre3 = /** @type {(inputs: Runresultsnotepre3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Los resultados (una tabla de clasificación, un pase por especificación, bibliotecas cableadas y el costo) se guardan en el directorio de salida, con el mismo formato que el archivo. `)
};

const zh_runresultsnotepre3 = /** @type {(inputs: Runresultsnotepre3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`结果——包括排行榜、按规范进行的测试、已连接的库以及成本——会以与输出目录相同的格式保存在输出目录中。 `)
};

const ja_runresultsnotepre3 = /** @type {(inputs: Runresultsnotepre3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`結果（リーダーボード、仕様ごとのパス、wired-libraries、およびコスト）は、出力ディレクトリに、 `)
};

const ko_runresultsnotepre3 = /** @type {(inputs: Runresultsnotepre3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`결과(리더보드, 사양별 패스, 연결된 라이브러리 및 비용)는 출력 디렉터리에 다음과 같은 형식으로 저장됩니다. `)
};

const zh_hant1_runresultsnotepre3 = /** @type {(inputs: Runresultsnotepre3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`結果——包括排行榜、按規範進行的測試、已連接的庫以及成本——會以與輸出目錄相同的格式保存在輸出目錄中。 `)
};

const de_runresultsnotepre3 = /** @type {(inputs: Runresultsnotepre3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Die Ergebnisse – eine Rangliste, die Ergebnisse pro Spezifikation, die verwendeten Bibliotheken und die Kosten – landen im Ausgabeverzeichnis, in der gleichen Struktur wie die `)
};

const fr_runresultsnotepre3 = /** @type {(inputs: Runresultsnotepre3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Les résultats — un classement, un passage par spécification, les bibliothèques câblées et le coût — sont enregistrés dans le répertoire de sortie, sous la même forme que le `)
};

/**
* | output |
* | --- |
* | "Results — a leaderboard, per-spec pass, wired-libraries, and cost — land in the output directory, in the same shape as the" |
*
* @param {Runresultsnotepre3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const runresultsnotepre3 = /** @type {((inputs?: Runresultsnotepre3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runresultsnotepre3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runresultsnotepre3(inputs)
	if (locale === "es") return es_runresultsnotepre3(inputs)
	if (locale === "zh") return zh_runresultsnotepre3(inputs)
	if (locale === "ja") return ja_runresultsnotepre3(inputs)
	if (locale === "ko") return ko_runresultsnotepre3(inputs)
	if (locale === "zh-Hant") return zh_hant1_runresultsnotepre3(inputs)
	if (locale === "de") return de_runresultsnotepre3(inputs)
	return fr_runresultsnotepre3(inputs)
});
export { runresultsnotepre3 as "runResultsNotePre" }