/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrungenerating2Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Generando proyecto")
	if (locale === "zh") return /** @type {LocalizedString} */ ("正在生成项目")
	if (locale === "ja") return /** @type {LocalizedString} */ ("プロジェクトを生成中")
	if (locale === "ko") return /** @type {LocalizedString} */ ("프로젝트 생성 중")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("正在產生專案")
	if (locale === "de") return /** @type {LocalizedString} */ ("Projekt wird generiert")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Génération du projet")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Створення проєкту")
	return /** @type {LocalizedString} */ ("Generating project")
});
export { builderrungenerating2 as "builderRunGenerating" }