/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignctatitle2Inputs */

const en_campaignctatitle2 = /** @type {(inputs: Campaignctatitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run it before you commit to it.`)
};

const es_campaignctatitle2 = /** @type {(inputs: Campaignctatitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ejecútalo antes de comprometerte.`)
};

const zh_campaignctatitle2 = /** @type {(inputs: Campaignctatitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在决定之前，先运行它。`)
};

const ja_campaignctatitle2 = /** @type {(inputs: Campaignctatitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`決める前に、実行してみよう。`)
};

const ko_campaignctatitle2 = /** @type {(inputs: Campaignctatitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`결정하기 전에 실행해 보세요.`)
};

const zh_hant1_campaignctatitle2 = /** @type {(inputs: Campaignctatitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在決定之前，先執行它。`)
};

const de_campaignctatitle2 = /** @type {(inputs: Campaignctatitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Führe es aus, bevor du dich festlegst.`)
};

const fr_campaignctatitle2 = /** @type {(inputs: Campaignctatitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exécutez-le avant de vous engager.`)
};

const uk_campaignctatitle2 = /** @type {(inputs: Campaignctatitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Запустіть, перш ніж зупинитися на ньому.`)
};

/**
* | output |
* | --- |
* | "Run it before you commit to it." |
*
* @param {Campaignctatitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignctatitle2 = /** @type {((inputs?: Campaignctatitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignctatitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaignctatitle2(inputs)
	if (locale === "es") return es_campaignctatitle2(inputs)
	if (locale === "zh") return zh_campaignctatitle2(inputs)
	if (locale === "ja") return ja_campaignctatitle2(inputs)
	if (locale === "ko") return ko_campaignctatitle2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignctatitle2(inputs)
	if (locale === "de") return de_campaignctatitle2(inputs)
	if (locale === "fr") return fr_campaignctatitle2(inputs)
	return uk_campaignctatitle2(inputs)
});
export { campaignctatitle2 as "campaignCtaTitle" }