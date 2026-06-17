/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmpastecursor2Inputs */

const en_llmpastecursor2 = /** @type {(inputs: Llmpastecursor2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`paste into ~/.cursor/mcp.json under mcpServers`)
};

const es_llmpastecursor2 = /** @type {(inputs: Llmpastecursor2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`pega en ~/.cursor/mcp.json dentro de mcpServers`)
};

const zh_llmpastecursor2 = /** @type {(inputs: Llmpastecursor2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`粘贴到 ~/.cursor/mcp.json 的 mcpServers 中`)
};

const ja_llmpastecursor2 = /** @type {(inputs: Llmpastecursor2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`mcpServers の下の ~/.cursor/mcp.json に貼り付けます。`)
};

const ko_llmpastecursor2 = /** @type {(inputs: Llmpastecursor2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`mcpServers 아래 ~/.cursor/mcp.json에 붙여넣습니다.`)
};

const zh_hant1_llmpastecursor2 = /** @type {(inputs: Llmpastecursor2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`貼到 ~/.cursor/mcp.json 的 mcpServers 中`)
};

const de_llmpastecursor2 = /** @type {(inputs: Llmpastecursor2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Einfügen in ~/.cursor/mcp.json unter mcpServers`)
};

const fr_llmpastecursor2 = /** @type {(inputs: Llmpastecursor2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`coller dans ~/.cursor/mcp.json sous mcpServers`)
};

/**
* | output |
* | --- |
* | "paste into ~/.cursor/mcp.json under mcpServers" |
*
* @param {Llmpastecursor2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const llmpastecursor2 = /** @type {((inputs?: Llmpastecursor2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmpastecursor2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmpastecursor2(inputs)
	if (locale === "es") return es_llmpastecursor2(inputs)
	if (locale === "zh") return zh_llmpastecursor2(inputs)
	if (locale === "ja") return ja_llmpastecursor2(inputs)
	if (locale === "ko") return ko_llmpastecursor2(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmpastecursor2(inputs)
	if (locale === "de") return de_llmpastecursor2(inputs)
	return fr_llmpastecursor2(inputs)
});
export { llmpastecursor2 as "llmPasteCursor" }