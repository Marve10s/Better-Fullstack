/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmagentdescription2Inputs */

const en_llmagentdescription2 = /** @type {(inputs: Llmagentdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`One MCP server, every spec-to-scaffold tool the benchmark used. Pick your agent, paste, done.`)
};

const es_llmagentdescription2 = /** @type {(inputs: Llmagentdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Un servidor MCP y todas las herramientas para pasar de especificación a scaffold que usó el benchmark. Elige tu agente, pega y listo.`)
};

const zh_llmagentdescription2 = /** @type {(inputs: Llmagentdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`一个 MCP 服务器，包含 benchmark 使用的所有 spec-to-scaffold 工具。选择代理，粘贴，就绪。`)
};

const ja_llmagentdescription2 = /** @type {(inputs: Llmagentdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`1 台の MCP サーバー、ベンチマークで使用されたすべての仕様から足場へのツール。エージェントを選択し、貼り付けて完了です。`)
};

const ko_llmagentdescription2 = /** @type {(inputs: Llmagentdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`하나의 MCP 서버, 벤치마크에서 사용된 모든 사양-스캐폴드 도구. 에이전트를 선택하고 붙여넣으면 완료됩니다.`)
};

const zh_hant1_llmagentdescription2 = /** @type {(inputs: Llmagentdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`一個 MCP 伺服器，包含 benchmark 使用的所有 spec-to-scaffold 工具。選擇代理，貼上，就緒。`)
};

const de_llmagentdescription2 = /** @type {(inputs: Llmagentdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ein MCP-Server, jedes vom Benchmark verwendete Spec-to-Scaffold-Tool. Wählen Sie Ihren Agenten aus, fügen Sie ihn ein, fertig.`)
};

const fr_llmagentdescription2 = /** @type {(inputs: Llmagentdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Un serveur MCP, chaque outil de spécification à échafaudage utilisé par le benchmark. Choisissez votre agent, collez, c'est fait.`)
};

/**
* | output |
* | --- |
* | "One MCP server, every spec-to-scaffold tool the benchmark used. Pick your agent, paste, done." |
*
* @param {Llmagentdescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const llmagentdescription2 = /** @type {((inputs?: Llmagentdescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmagentdescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmagentdescription2(inputs)
	if (locale === "es") return es_llmagentdescription2(inputs)
	if (locale === "zh") return zh_llmagentdescription2(inputs)
	if (locale === "ja") return ja_llmagentdescription2(inputs)
	if (locale === "ko") return ko_llmagentdescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmagentdescription2(inputs)
	if (locale === "de") return de_llmagentdescription2(inputs)
	return fr_llmagentdescription2(inputs)
});
export { llmagentdescription2 as "llmAgentDescription" }