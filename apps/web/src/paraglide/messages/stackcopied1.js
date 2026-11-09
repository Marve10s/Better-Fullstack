/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Stackcopied1Inputs */



/**
* | output |
* | --- |
* | "Copied!" |
*
* @param {Stackcopied1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const stackcopied1 = /** @type {((inputs?: Stackcopied1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Stackcopied1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("¡Copiado!")
	if (locale === "zh") return /** @type {LocalizedString} */ ("已复制！")
	if (locale === "ja") return /** @type {LocalizedString} */ ("コピーしました！")
	if (locale === "ko") return /** @type {LocalizedString} */ ("복사되었습니다!")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("已複製！")
	if (locale === "de") return /** @type {LocalizedString} */ ("Kopiert!")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Copié!")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Скопійовано!")
	return /** @type {LocalizedString} */ ("Copied!")
});
export { stackcopied1 as "stackCopied" }