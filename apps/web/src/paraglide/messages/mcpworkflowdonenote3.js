/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpworkflowdonenote3Inputs */



/**
* | output |
* | --- |
* | "run bun install to finish" |
*
* @param {Mcpworkflowdonenote3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpworkflowdonenote3 = /** @type {((inputs?: Mcpworkflowdonenote3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpworkflowdonenote3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("ejecuta bun install para terminar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("运行 bun install 完成安装")
	if (locale === "ja") return /** @type {LocalizedString} */ ("bun install を実行して完了します")
	if (locale === "ko") return /** @type {LocalizedString} */ ("bun install을 실행하여 완료하세요.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("運行 bun install 完成安裝")
	if (locale === "de") return /** @type {LocalizedString} */ ("Führen Sie bun install aus, um den Vorgang abzuschließen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("lancez bun install pour terminer")
	if (locale === "uk") return /** @type {LocalizedString} */ ("запустіть bun install, щоб завершити")
	return /** @type {LocalizedString} */ ("run bun install to finish")
});
export { mcpworkflowdonenote3 as "mcpWorkflowDoneNote" }