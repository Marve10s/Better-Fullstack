/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignshareruncomplete3Inputs */

const en_campaignshareruncomplete3 = /** @type {(inputs: Campaignshareruncomplete3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack running`)
};

const es_campaignshareruncomplete3 = /** @type {(inputs: Campaignshareruncomplete3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack en ejecución`)
};

const zh_campaignshareruncomplete3 = /** @type {(inputs: Campaignshareruncomplete3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`技术栈运行中`)
};

const ja_campaignshareruncomplete3 = /** @type {(inputs: Campaignshareruncomplete3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`スタック実行中`)
};

const ko_campaignshareruncomplete3 = /** @type {(inputs: Campaignshareruncomplete3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`스택 실행 중`)
};

const zh_hant1_campaignshareruncomplete3 = /** @type {(inputs: Campaignshareruncomplete3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`技術棧執行中`)
};

const de_campaignshareruncomplete3 = /** @type {(inputs: Campaignshareruncomplete3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack läuft`)
};

const fr_campaignshareruncomplete3 = /** @type {(inputs: Campaignshareruncomplete3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack en cours d'exécution`)
};

const uk_campaignshareruncomplete3 = /** @type {(inputs: Campaignshareruncomplete3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Стек запущено`)
};

/**
* | output |
* | --- |
* | "Stack running" |
*
* @param {Campaignshareruncomplete3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignshareruncomplete3 = /** @type {((inputs?: Campaignshareruncomplete3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignshareruncomplete3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaignshareruncomplete3(inputs)
	if (locale === "es") return es_campaignshareruncomplete3(inputs)
	if (locale === "zh") return zh_campaignshareruncomplete3(inputs)
	if (locale === "ja") return ja_campaignshareruncomplete3(inputs)
	if (locale === "ko") return ko_campaignshareruncomplete3(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignshareruncomplete3(inputs)
	if (locale === "de") return de_campaignshareruncomplete3(inputs)
	if (locale === "fr") return fr_campaignshareruncomplete3(inputs)
	return uk_campaignshareruncomplete3(inputs)
});
export { campaignshareruncomplete3 as "campaignShareRunComplete" }