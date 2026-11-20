/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpworkflowcreatenote3Inputs */



/**
* | output |
* | --- |
* | "written to ./my-app" |
*
* @param {Mcpworkflowcreatenote3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpworkflowcreatenote3 = /** @type {((inputs?: Mcpworkflowcreatenote3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpworkflowcreatenote3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("escrito en ./my-app")
	if (locale === "zh") return /** @type {LocalizedString} */ ("已写入 ./my-app")
	if (locale === "ja") return /** @type {LocalizedString} */ ("./my-app に書き込まれます")
	if (locale === "ko") return /** @type {LocalizedString} */ ("./my-app에 기록됨")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("已寫入 ./my-app")
	if (locale === "de") return /** @type {LocalizedString} */ ("geschrieben nach ./my-app")
	if (locale === "fr") return /** @type {LocalizedString} */ ("écrit dans ./my-app")
	if (locale === "uk") return /** @type {LocalizedString} */ ("записано в ./my-app")
	return /** @type {LocalizedString} */ ("written to ./my-app")
});
export { mcpworkflowcreatenote3 as "mcpWorkflowCreateNote" }