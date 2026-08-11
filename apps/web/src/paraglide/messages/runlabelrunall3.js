/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runlabelrunall3Inputs */

const en_runlabelrunall3 = /** @type {(inputs: Runlabelrunall3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`run all 13 specs, prompt path`)
};

const es_runlabelrunall3 = /** @type {(inputs: Runlabelrunall3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ejecutar las 13 especificaciones, ruta prompt`)
};

const zh_runlabelrunall3 = /** @type {(inputs: Runlabelrunall3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`运行所有 13 个规范，prompt 路径`)
};

const ja_runlabelrunall3 = /** @type {(inputs: Runlabelrunall3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`全13仕様を実行（プロンプトパス）`)
};

const ko_runlabelrunall3 = /** @type {(inputs: Runlabelrunall3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`13개 사양을 모두 실행하고 프롬프트 경로를 지정합니다.`)
};

const zh_hant1_runlabelrunall3 = /** @type {(inputs: Runlabelrunall3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`運行所有 13 個測試案例，提示路徑`)
};

const de_runlabelrunall3 = /** @type {(inputs: Runlabelrunall3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Führe alle 13 Spezifikationen aus, Eingabeaufforderungspfad`)
};

const fr_runlabelrunall3 = /** @type {(inputs: Runlabelrunall3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`exécuter les 13 spécifications, chemin d'invite`)
};

const uk_runlabelrunall3 = /** @type {(inputs: Runlabelrunall3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`запустити всі 13 специфікацій, шлях prompt`)
};

/**
* | output |
* | --- |
* | "run all 13 specs, prompt path" |
*
* @param {Runlabelrunall3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const runlabelrunall3 = /** @type {((inputs?: Runlabelrunall3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runlabelrunall3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_runlabelrunall3(inputs)
	if (locale === "zh") return zh_runlabelrunall3(inputs)
	if (locale === "ja") return ja_runlabelrunall3(inputs)
	if (locale === "ko") return ko_runlabelrunall3(inputs)
	if (locale === "zh-Hant") return zh_hant1_runlabelrunall3(inputs)
	if (locale === "de") return de_runlabelrunall3(inputs)
	if (locale === "fr") return fr_runlabelrunall3(inputs)
	if (locale === "uk") return uk_runlabelrunall3(inputs)
	return en_runlabelrunall3(inputs)
});
export { runlabelrunall3 as "runLabelRunAll" }