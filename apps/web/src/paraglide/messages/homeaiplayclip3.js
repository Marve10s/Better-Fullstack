/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeaiplayclip3Inputs */

const en_homeaiplayclip3 = /** @type {(inputs: Homeaiplayclip3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Play Theo's answer`)
};

const es_homeaiplayclip3 = /** @type {(inputs: Homeaiplayclip3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Reproducir la respuesta de Theo`)
};

const zh_homeaiplayclip3 = /** @type {(inputs: Homeaiplayclip3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`播放 Theo 的回答`)
};

const ja_homeaiplayclip3 = /** @type {(inputs: Homeaiplayclip3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Theo の回答を再生`)
};

const ko_homeaiplayclip3 = /** @type {(inputs: Homeaiplayclip3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Theo의 답변 재생`)
};

const zh_hant1_homeaiplayclip3 = /** @type {(inputs: Homeaiplayclip3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`播放 Theo 的回答`)
};

const de_homeaiplayclip3 = /** @type {(inputs: Homeaiplayclip3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Theos Antwort abspielen`)
};

const fr_homeaiplayclip3 = /** @type {(inputs: Homeaiplayclip3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lire la réponse de Theo`)
};

const uk_homeaiplayclip3 = /** @type {(inputs: Homeaiplayclip3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Відтворити відповідь Theo`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_homeaiplayclip3(inputs)
	if (locale === "zh") return zh_homeaiplayclip3(inputs)
	if (locale === "ja") return ja_homeaiplayclip3(inputs)
	if (locale === "ko") return ko_homeaiplayclip3(inputs)
	if (locale === "zh-Hant") return zh_hant1_homeaiplayclip3(inputs)
	if (locale === "de") return de_homeaiplayclip3(inputs)
	if (locale === "fr") return fr_homeaiplayclip3(inputs)
	if (locale === "uk") return uk_homeaiplayclip3(inputs)
	return en_homeaiplayclip3(inputs)
});
export { homeaiplayclip3 as "homeAiPlayClip" }