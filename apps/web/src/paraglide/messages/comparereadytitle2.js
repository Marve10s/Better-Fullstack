/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparereadytitle2Inputs */



/**
* | output |
* | --- |
* | "Ready to try it?" |
*
* @param {Comparereadytitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const comparereadytitle2 = /** @type {((inputs?: Comparereadytitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparereadytitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("¿Listo para probarlo?")
	if (locale === "zh") return /** @type {LocalizedString} */ ("准备试试吗？")
	if (locale === "ja") return /** @type {LocalizedString} */ ("試してみる準備はできましたか?")
	if (locale === "ko") return /** @type {LocalizedString} */ ("시도해 볼 준비가 되셨나요?")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("準備試試嗎？")
	if (locale === "de") return /** @type {LocalizedString} */ ("Bereit, es auszuprobieren?")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Prêt à l'essayer ?")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Готові спробувати?")
	return /** @type {LocalizedString} */ ("Ready to try it?")
});
export { comparereadytitle2 as "compareReadyTitle" }