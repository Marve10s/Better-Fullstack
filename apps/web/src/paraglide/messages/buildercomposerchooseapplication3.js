/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerchooseapplication3Inputs */

const en_buildercomposerchooseapplication3 = /** @type {(inputs: Buildercomposerchooseapplication3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choose at least one application to continue.`)
};

const es_buildercomposerchooseapplication3 = /** @type {(inputs: Buildercomposerchooseapplication3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elige al menos una aplicación para continuar.`)
};

const zh_buildercomposerchooseapplication3 = /** @type {(inputs: Buildercomposerchooseapplication3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请至少选择一个应用以继续。`)
};

const ja_buildercomposerchooseapplication3 = /** @type {(inputs: Buildercomposerchooseapplication3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`続行するには、少なくとも1つのアプリケーションを選択してください。`)
};

const ko_buildercomposerchooseapplication3 = /** @type {(inputs: Buildercomposerchooseapplication3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`계속하려면 애플리케이션을 하나 이상 선택하세요.`)
};

const zh_hant1_buildercomposerchooseapplication3 = /** @type {(inputs: Buildercomposerchooseapplication3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`請至少選擇一個應用程式以繼續。`)
};

const de_buildercomposerchooseapplication3 = /** @type {(inputs: Buildercomposerchooseapplication3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Wähle mindestens eine Anwendung aus, um fortzufahren.`)
};

const fr_buildercomposerchooseapplication3 = /** @type {(inputs: Buildercomposerchooseapplication3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choisissez au moins une application pour continuer.`)
};

const uk_buildercomposerchooseapplication3 = /** @type {(inputs: Buildercomposerchooseapplication3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Виберіть принаймні один застосунок, щоб продовжити.`)
};

/**
* | output |
* | --- |
* | "Choose at least one application to continue." |
*
* @param {Buildercomposerchooseapplication3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerchooseapplication3 = /** @type {((inputs?: Buildercomposerchooseapplication3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerchooseapplication3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerchooseapplication3(inputs)
	if (locale === "zh") return zh_buildercomposerchooseapplication3(inputs)
	if (locale === "ja") return ja_buildercomposerchooseapplication3(inputs)
	if (locale === "ko") return ko_buildercomposerchooseapplication3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerchooseapplication3(inputs)
	if (locale === "de") return de_buildercomposerchooseapplication3(inputs)
	if (locale === "fr") return fr_buildercomposerchooseapplication3(inputs)
	if (locale === "uk") return uk_buildercomposerchooseapplication3(inputs)
	return en_buildercomposerchooseapplication3(inputs)
});
export { buildercomposerchooseapplication3 as "builderComposerChooseApplication" }