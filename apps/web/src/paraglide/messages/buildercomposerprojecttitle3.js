/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerprojecttitle3Inputs */



/**
* | output |
* | --- |
* | "Set up your project" |
*
* @param {Buildercomposerprojecttitle3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerprojecttitle3 = /** @type {((inputs?: Buildercomposerprojecttitle3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerprojecttitle3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Configura tu proyecto")
	if (locale === "zh") return /** @type {LocalizedString} */ ("设置项目")
	if (locale === "ja") return /** @type {LocalizedString} */ ("プロジェクトを設定")
	if (locale === "ko") return /** @type {LocalizedString} */ ("프로젝트 설정")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("設定專案")
	if (locale === "de") return /** @type {LocalizedString} */ ("Richte dein Projekt ein")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Configurez votre projet")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Налаштуйте проєкт")
	return /** @type {LocalizedString} */ ("Set up your project")
});
export { buildercomposerprojecttitle3 as "builderComposerProjectTitle" }