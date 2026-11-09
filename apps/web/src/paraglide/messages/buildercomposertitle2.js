/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposertitle2Inputs */



/**
* | output |
* | --- |
* | "What are you building?" |
*
* @param {Buildercomposertitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposertitle2 = /** @type {((inputs?: Buildercomposertitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposertitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("¿Qué vas a crear?")
	if (locale === "zh") return /** @type {LocalizedString} */ ("你想构建什么？")
	if (locale === "ja") return /** @type {LocalizedString} */ ("何を作りますか？")
	if (locale === "ko") return /** @type {LocalizedString} */ ("무엇을 만드시겠어요?")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("你想建置什麼？")
	if (locale === "de") return /** @type {LocalizedString} */ ("Was möchtest du entwickeln?")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Que souhaitez-vous créer ?")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Що ви хочете створити?")
	return /** @type {LocalizedString} */ ("What are you building?")
});
export { buildercomposertitle2 as "builderComposerTitle" }