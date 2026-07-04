/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runflagpaths2Inputs */

const en_runflagpaths2 = /** @type {(inputs: Runflagpaths2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`prompt hand-writes everything; mcp goes through the MCP tools; cli composes the CLI command`)
};

const es_runflagpaths2 = /** @type {(inputs: Runflagpaths2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`prompt escribe todo a mano; mcp pasa por las herramientas de MCP; cli compone el comando CLI.`)
};

const zh_runflagpaths2 = /** @type {(inputs: Runflagpaths2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`prompt 负责手动输入所有内容；mcp 负责使用 MCP 工具；cli 负责编写 CLI 命令。`)
};

const ja_runflagpaths2 = /** @type {(inputs: Runflagpaths2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`prompt はすべてを手書きで入力し、mcp は MCP ツールを経由し、cli は CLI コマンドを構成します。`)
};

const ko_runflagpaths2 = /** @type {(inputs: Runflagpaths2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`prompt는 모든 것을 직접 작성하고, mcp는 MCP 도구를 사용하며, cli는 CLI 명령어를 작성합니다.`)
};

const zh_hant1_runflagpaths2 = /** @type {(inputs: Runflagpaths2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`prompt 負責手動輸入所有內容；mcp 負責使用 MCP 工具；cli 負責編寫 CLI 指令。`)
};

const de_runflagpaths2 = /** @type {(inputs: Runflagpaths2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Die Eingabeaufforderung schreibt alles manuell; MCP durchläuft die MCP-Tools; CLI setzt den CLI-Befehl zusammen.`)
};

const fr_runflagpaths2 = /** @type {(inputs: Runflagpaths2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`prompt saisit tout manuellement ; mcp parcourt les outils MCP ; cli compose la commande CLI`)
};

/**
* | output |
* | --- |
* | "prompt hand-writes everything; mcp goes through the MCP tools; cli composes the CLI command" |
*
* @param {Runflagpaths2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const runflagpaths2 = /** @type {((inputs?: Runflagpaths2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runflagpaths2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runflagpaths2(inputs)
	if (locale === "es") return es_runflagpaths2(inputs)
	if (locale === "zh") return zh_runflagpaths2(inputs)
	if (locale === "ja") return ja_runflagpaths2(inputs)
	if (locale === "ko") return ko_runflagpaths2(inputs)
	if (locale === "zh-Hant") return zh_hant1_runflagpaths2(inputs)
	if (locale === "de") return de_runflagpaths2(inputs)
	return fr_runflagpaths2(inputs)
});
export { runflagpaths2 as "runFlagPaths" }