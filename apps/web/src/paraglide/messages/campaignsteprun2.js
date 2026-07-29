/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignsteprun2Inputs */

const en_campaignsteprun2 = /** @type {(inputs: Campaignsteprun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run the real project`)
};

const es_campaignsteprun2 = /** @type {(inputs: Campaignsteprun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ejecuta el proyecto real`)
};

const zh_campaignsteprun2 = /** @type {(inputs: Campaignsteprun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`运行真实项目`)
};

const ja_campaignsteprun2 = /** @type {(inputs: Campaignsteprun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`本物のプロジェクトを実行`)
};

const ko_campaignsteprun2 = /** @type {(inputs: Campaignsteprun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`실제 프로젝트 실행`)
};

const zh_hant1_campaignsteprun2 = /** @type {(inputs: Campaignsteprun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`執行真實專案`)
};

const de_campaignsteprun2 = /** @type {(inputs: Campaignsteprun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Führe das echte Projekt aus`)
};

const fr_campaignsteprun2 = /** @type {(inputs: Campaignsteprun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exécutez le vrai projet`)
};

const uk_campaignsteprun2 = /** @type {(inputs: Campaignsteprun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Запустіть справжній проєкт`)
};

/**
* | output |
* | --- |
* | "Run the real project" |
*
* @param {Campaignsteprun2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignsteprun2 = /** @type {((inputs?: Campaignsteprun2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignsteprun2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaignsteprun2(inputs)
	if (locale === "es") return es_campaignsteprun2(inputs)
	if (locale === "zh") return zh_campaignsteprun2(inputs)
	if (locale === "ja") return ja_campaignsteprun2(inputs)
	if (locale === "ko") return ko_campaignsteprun2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignsteprun2(inputs)
	if (locale === "de") return de_campaignsteprun2(inputs)
	if (locale === "fr") return fr_campaignsteprun2(inputs)
	return uk_campaignsteprun2(inputs)
});
export { campaignsteprun2 as "campaignStepRun" }