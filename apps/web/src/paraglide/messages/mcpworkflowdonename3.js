/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpworkflowdonename3Inputs */



/**
* | output |
* | --- |
* | "scaffold complete" |
*
* @param {Mcpworkflowdonename3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpworkflowdonename3 = /** @type {((inputs?: Mcpworkflowdonename3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpworkflowdonename3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("scaffold completado")
	if (locale === "zh") return /** @type {LocalizedString} */ ("scaffold 完成")
	if (locale === "ja") return /** @type {LocalizedString} */ ("スキャフォールド完了")
	if (locale === "ko") return /** @type {LocalizedString} */ ("스캐폴드 완료")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("scaffold 完成")
	if (locale === "de") return /** @type {LocalizedString} */ ("Gerüst fertig")
	if (locale === "fr") return /** @type {LocalizedString} */ ("échafaudage terminé")
	if (locale === "uk") return /** @type {LocalizedString} */ ("скафолдинг завершено")
	return /** @type {LocalizedString} */ ("scaffold complete")
});
export { mcpworkflowdonename3 as "mcpWorkflowDoneName" }