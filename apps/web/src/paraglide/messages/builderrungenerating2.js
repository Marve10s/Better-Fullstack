/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrungenerating2Inputs */

const en_builderrungenerating2 = /** @type {(inputs: Builderrungenerating2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generating project`)
};

const es_builderrungenerating2 = /** @type {(inputs: Builderrungenerating2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generando proyecto`)
};

const zh_builderrungenerating2 = /** @type {(inputs: Builderrungenerating2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在生成项目`)
};

const ja_builderrungenerating2 = /** @type {(inputs: Builderrungenerating2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プロジェクトを生成中`)
};

const ko_builderrungenerating2 = /** @type {(inputs: Builderrungenerating2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`프로젝트 생성 중`)
};

const zh_hant1_builderrungenerating2 = /** @type {(inputs: Builderrungenerating2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在產生專案`)
};

const de_builderrungenerating2 = /** @type {(inputs: Builderrungenerating2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Projekt wird generiert`)
};

const fr_builderrungenerating2 = /** @type {(inputs: Builderrungenerating2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Génération du projet`)
};

const uk_builderrungenerating2 = /** @type {(inputs: Builderrungenerating2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Створення проєкту`)
};

/**
* | output |
* | --- |
* | "Generating project" |
*
* @param {Builderrungenerating2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrungenerating2 = /** @type {((inputs?: Builderrungenerating2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrungenerating2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_builderrungenerating2(inputs)
	if (locale === "zh") return zh_builderrungenerating2(inputs)
	if (locale === "ja") return ja_builderrungenerating2(inputs)
	if (locale === "ko") return ko_builderrungenerating2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrungenerating2(inputs)
	if (locale === "de") return de_builderrungenerating2(inputs)
	if (locale === "fr") return fr_builderrungenerating2(inputs)
	if (locale === "uk") return uk_builderrungenerating2(inputs)
	return en_builderrungenerating2(inputs)
});
export { builderrungenerating2 as "builderRunGenerating" }