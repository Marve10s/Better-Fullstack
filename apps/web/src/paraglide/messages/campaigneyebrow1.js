/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaigneyebrow1Inputs */

const en_campaigneyebrow1 = /** @type {(inputs: Campaigneyebrow1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run before you clone`)
};

const es_campaigneyebrow1 = /** @type {(inputs: Campaigneyebrow1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ejecuta antes de clonar`)
};

const zh_campaigneyebrow1 = /** @type {(inputs: Campaigneyebrow1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`先运行，再克隆`)
};

const ja_campaigneyebrow1 = /** @type {(inputs: Campaigneyebrow1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`クローンする前に実行`)
};

const ko_campaigneyebrow1 = /** @type {(inputs: Campaigneyebrow1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`클론하기 전에 실행`)
};

const zh_hant1_campaigneyebrow1 = /** @type {(inputs: Campaigneyebrow1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`先執行，再複製`)
};

const de_campaigneyebrow1 = /** @type {(inputs: Campaigneyebrow1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Erst ausführen, dann klonen`)
};

const fr_campaigneyebrow1 = /** @type {(inputs: Campaigneyebrow1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exécutez avant de cloner`)
};

const uk_campaigneyebrow1 = /** @type {(inputs: Campaigneyebrow1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Запусти перед клонуванням`)
};

/**
* | output |
* | --- |
* | "Run before you clone" |
*
* @param {Campaigneyebrow1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaigneyebrow1 = /** @type {((inputs?: Campaigneyebrow1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaigneyebrow1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaigneyebrow1(inputs)
	if (locale === "es") return es_campaigneyebrow1(inputs)
	if (locale === "zh") return zh_campaigneyebrow1(inputs)
	if (locale === "ja") return ja_campaigneyebrow1(inputs)
	if (locale === "ko") return ko_campaigneyebrow1(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaigneyebrow1(inputs)
	if (locale === "de") return de_campaigneyebrow1(inputs)
	if (locale === "fr") return fr_campaigneyebrow1(inputs)
	return uk_campaigneyebrow1(inputs)
});
export { campaigneyebrow1 as "campaignEyebrow" }