/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignogalt2Inputs */

const en_campaignogalt2 = /** @type {(inputs: Campaignogalt2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run Before You Clone with Better Fullstack`)
};

const es_campaignogalt2 = /** @type {(inputs: Campaignogalt2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ejecuta antes de clonar con Better Fullstack`)
};

const zh_campaignogalt2 = /** @type {(inputs: Campaignogalt2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`使用 Better Fullstack，先运行再克隆`)
};

const ja_campaignogalt2 = /** @type {(inputs: Campaignogalt2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better Fullstack でクローンする前に実行`)
};

const ko_campaignogalt2 = /** @type {(inputs: Campaignogalt2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Better Fullstack과 함께, 클론하기 전에 실행`)
};

const zh_hant1_campaignogalt2 = /** @type {(inputs: Campaignogalt2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`使用 Better Fullstack，先執行再複製`)
};

const de_campaignogalt2 = /** @type {(inputs: Campaignogalt2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Erst ausführen, dann klonen – mit Better Fullstack`)
};

const fr_campaignogalt2 = /** @type {(inputs: Campaignogalt2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exécutez avant de cloner avec Better Fullstack`)
};

const uk_campaignogalt2 = /** @type {(inputs: Campaignogalt2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Запусти перед клонуванням із Better Fullstack`)
};

/**
* | output |
* | --- |
* | "Run Before You Clone with Better Fullstack" |
*
* @param {Campaignogalt2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignogalt2 = /** @type {((inputs?: Campaignogalt2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignogalt2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaignogalt2(inputs)
	if (locale === "es") return es_campaignogalt2(inputs)
	if (locale === "zh") return zh_campaignogalt2(inputs)
	if (locale === "ja") return ja_campaignogalt2(inputs)
	if (locale === "ko") return ko_campaignogalt2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignogalt2(inputs)
	if (locale === "de") return de_campaignogalt2(inputs)
	if (locale === "fr") return fr_campaignogalt2(inputs)
	return uk_campaignogalt2(inputs)
});
export { campaignogalt2 as "campaignOgAlt" }