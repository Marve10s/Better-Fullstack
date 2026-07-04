/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20260612highlightbenchmark3Inputs */

const en_changelogrelease20260612highlightbenchmark3 = /** @type {(inputs: Changelogrelease20260612highlightbenchmark3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Benchmarked frontier models scaffolding the same project specs three ways: prompt-only, our CLI, and our MCP server. Agents on the MCP path finished up to 7× faster with 4× fewer output tokens; the full results live on the homepage with an interactive chart.`)
};

const es_changelogrelease20260612highlightbenchmark3 = /** @type {(inputs: Changelogrelease20260612highlightbenchmark3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Se probaron modelos de frontera creando los mismos specs de proyecto por tres rutas: solo prompt, nuestra CLI y nuestro servidor MCP. En la ruta MCP, los agentes terminaron hasta 7× más rápido con 4× menos tokens de salida; los resultados completos están en la página de inicio con un gráfico interactivo.`)
};

const zh_changelogrelease20260612highlightbenchmark3 = /** @type {(inputs: Changelogrelease20260612highlightbenchmark3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用同一组项目 spec 测试前沿模型的三种 scaffold 路径：纯 prompt、我们的 CLI、以及我们的 MCP 服务器。走 MCP 路径的代理最高快 7×，输出 tokens 少 4×；完整结果已在首页通过交互图展示。`)
};

const ja_changelogrelease20260612highlightbenchmark3 = /** @type {(inputs: Changelogrelease20260612highlightbenchmark3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ベンチマークされたフロンティア モデルは、同じプロジェクト仕様を 3 つの方法 (プロンプトのみ、CLI、MCP サーバー) でスキャフォールディングします。 MCP パス上のエージェントは、出力トークンが 4 分の 1 少なくなり、最大 7 倍速く終了しました。完全な結果は、インタラクティブなグラフとともにホームページに表示されます。`)
};

const ko_changelogrelease20260612highlightbenchmark3 = /** @type {(inputs: Changelogrelease20260612highlightbenchmark3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`동일한 프로젝트 사양을 세 가지 방식으로 스캐폴딩하는 벤치마킹된 프론티어 모델: 프롬프트 전용, CLI 및 MCP 서버. MCP 경로의 에이전트는 4배 더 적은 출력 토큰으로 최대 7배 더 빠르게 완료되었습니다. 전체 결과는 대화형 차트와 함께 홈페이지에 게시됩니다.`)
};

const zh_hant1_changelogrelease20260612highlightbenchmark3 = /** @type {(inputs: Changelogrelease20260612highlightbenchmark3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用同一組專案 spec 測試前沿模型的三種 scaffold 路徑：純 prompt、我們的 CLI、以及我們的 MCP 伺服器。走 MCP 路徑的代理程式最高快 7×，輸出 tokens 少 4×；完整結果已在首頁透過交互圖展示。`)
};

const de_changelogrelease20260612highlightbenchmark3 = /** @type {(inputs: Changelogrelease20260612highlightbenchmark3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Benchmarked-Frontier-Modelle, die die gleichen Projektspezifikationen bilden, sind auf drei Arten möglich: Nur-Prompt, unser CLI und unser MCP-Server. Agenten auf dem MCP-Pfad wurden bis zu 7-mal schneller mit 4-mal weniger Ausgabetokens fertig; Die vollständigen Ergebnisse finden Sie live auf der Homepage mit einem interaktiven Diagramm.`)
};

const fr_changelogrelease20260612highlightbenchmark3 = /** @type {(inputs: Changelogrelease20260612highlightbenchmark3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Des modèles frontières comparés échafaudent les mêmes spécifications de projet de trois manières : par invite uniquement, par notre CLI et par notre serveur MCP. Les agents sur le chemin MCP ont terminé jusqu'à 7 fois plus vite avec 4 fois moins de jetons de sortie ; les résultats complets en direct sur la page d'accueil avec un graphique interactif.`)
};

/**
* | output |
* | --- |
* | "Benchmarked frontier models scaffolding the same project specs three ways: prompt-only, our CLI, and our MCP server. Agents on the MCP path finished up to 7×..." |
*
* @param {Changelogrelease20260612highlightbenchmark3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const changelogrelease20260612highlightbenchmark3 = /** @type {((inputs?: Changelogrelease20260612highlightbenchmark3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20260612highlightbenchmark3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changelogrelease20260612highlightbenchmark3(inputs)
	if (locale === "es") return es_changelogrelease20260612highlightbenchmark3(inputs)
	if (locale === "zh") return zh_changelogrelease20260612highlightbenchmark3(inputs)
	if (locale === "ja") return ja_changelogrelease20260612highlightbenchmark3(inputs)
	if (locale === "ko") return ko_changelogrelease20260612highlightbenchmark3(inputs)
	if (locale === "zh-Hant") return zh_hant1_changelogrelease20260612highlightbenchmark3(inputs)
	if (locale === "de") return de_changelogrelease20260612highlightbenchmark3(inputs)
	return fr_changelogrelease20260612highlightbenchmark3(inputs)
});
export { changelogrelease20260612highlightbenchmark3 as "changelogRelease20260612HighlightBenchmark" }