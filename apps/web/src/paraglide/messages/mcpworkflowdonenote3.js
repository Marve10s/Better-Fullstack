/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpworkflowdonenote3Inputs */

const en_mcpworkflowdonenote3 = /** @type {(inputs: Mcpworkflowdonenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`run bun install to finish`)
};

const es_mcpworkflowdonenote3 = /** @type {(inputs: Mcpworkflowdonenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ejecuta bun install para terminar`)
};

const zh_mcpworkflowdonenote3 = /** @type {(inputs: Mcpworkflowdonenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`运行 bun install 完成安装`)
};

const ja_mcpworkflowdonenote3 = /** @type {(inputs: Mcpworkflowdonenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`bun install を実行して完了します`)
};

const ko_mcpworkflowdonenote3 = /** @type {(inputs: Mcpworkflowdonenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`bun install을 실행하여 완료하세요.`)
};

const zh_hant1_mcpworkflowdonenote3 = /** @type {(inputs: Mcpworkflowdonenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`運行 bun install 完成安裝`)
};

const de_mcpworkflowdonenote3 = /** @type {(inputs: Mcpworkflowdonenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Führen Sie bun install aus, um den Vorgang abzuschließen`)
};

const fr_mcpworkflowdonenote3 = /** @type {(inputs: Mcpworkflowdonenote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`lancez bun install pour terminer`)
};

/**
* | output |
* | --- |
* | "run bun install to finish" |
*
* @param {Mcpworkflowdonenote3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcpworkflowdonenote3 = /** @type {((inputs?: Mcpworkflowdonenote3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpworkflowdonenote3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpworkflowdonenote3(inputs)
	if (locale === "es") return es_mcpworkflowdonenote3(inputs)
	if (locale === "zh") return zh_mcpworkflowdonenote3(inputs)
	if (locale === "ja") return ja_mcpworkflowdonenote3(inputs)
	if (locale === "ko") return ko_mcpworkflowdonenote3(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpworkflowdonenote3(inputs)
	if (locale === "de") return de_mcpworkflowdonenote3(inputs)
	return fr_mcpworkflowdonenote3(inputs)
});
export { mcpworkflowdonenote3 as "mcpWorkflowDoneNote" }