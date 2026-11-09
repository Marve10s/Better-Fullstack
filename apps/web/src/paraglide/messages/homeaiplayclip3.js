/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeaiplayclip3Inputs */



/**
* | output |
* | --- |
* | "Play Theo's answer" |
*
* @param {Homeaiplayclip3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homeaiplayclip3 = /** @type {((inputs?: Homeaiplayclip3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeaiplayclip3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Reproducir la respuesta de Theo")
	if (locale === "zh") return /** @type {LocalizedString} */ ("播放 Theo 的回答")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Theo の回答を再生")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Theo의 답변 재생")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("播放 Theo 的回答")
	if (locale === "de") return /** @type {LocalizedString} */ ("Theos Antwort abspielen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Lire la réponse de Theo")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Відтворити відповідь Theo")
	return /** @type {LocalizedString} */ ("Play Theo's answer")
});
export { homeaiplayclip3 as "homeAiPlayClip" }