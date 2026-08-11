/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaigncuratedtitle2Inputs */

const en_campaigncuratedtitle2 = /** @type {(inputs: Campaigncuratedtitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pick one. Break it. Keep it.`)
};

const es_campaigncuratedtitle2 = /** @type {(inputs: Campaigncuratedtitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elige uno. Rómpelo. Quédatelo.`)
};

const zh_campaigncuratedtitle2 = /** @type {(inputs: Campaigncuratedtitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`选一个。折腾它。留下它。`)
};

const ja_campaigncuratedtitle2 = /** @type {(inputs: Campaigncuratedtitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`選んで、壊して、自分のものに。`)
};

const ko_campaigncuratedtitle2 = /** @type {(inputs: Campaigncuratedtitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`하나 골라서, 부수고, 가지세요.`)
};

const zh_hant1_campaigncuratedtitle2 = /** @type {(inputs: Campaigncuratedtitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`選一個。玩壞它。留下它。`)
};

const de_campaigncuratedtitle2 = /** @type {(inputs: Campaigncuratedtitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Wähle einen. Zerlege ihn. Behalte ihn.`)
};

const fr_campaigncuratedtitle2 = /** @type {(inputs: Campaigncuratedtitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choisissez-en un. Cassez-le. Gardez-le.`)
};

const uk_campaigncuratedtitle2 = /** @type {(inputs: Campaigncuratedtitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Оберіть один. Зламайте його. Залиште собі.`)
};

/**
* | output |
* | --- |
* | "Pick one. Break it. Keep it." |
*
* @param {Campaigncuratedtitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaigncuratedtitle2 = /** @type {((inputs?: Campaigncuratedtitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaigncuratedtitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_campaigncuratedtitle2(inputs)
	if (locale === "zh") return zh_campaigncuratedtitle2(inputs)
	if (locale === "ja") return ja_campaigncuratedtitle2(inputs)
	if (locale === "ko") return ko_campaigncuratedtitle2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaigncuratedtitle2(inputs)
	if (locale === "de") return de_campaigncuratedtitle2(inputs)
	if (locale === "fr") return fr_campaigncuratedtitle2(inputs)
	if (locale === "uk") return uk_campaigncuratedtitle2(inputs)
	return en_campaigncuratedtitle2(inputs)
});
export { campaigncuratedtitle2 as "campaignCuratedTitle" }