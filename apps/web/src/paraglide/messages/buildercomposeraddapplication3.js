/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposeraddapplication3Inputs */

const en_buildercomposeraddapplication3 = /** @type {(inputs: Buildercomposeraddapplication3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add application`)
};

const es_buildercomposeraddapplication3 = /** @type {(inputs: Buildercomposeraddapplication3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Añadir aplicación`)
};

const zh_buildercomposeraddapplication3 = /** @type {(inputs: Buildercomposeraddapplication3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`添加应用`)
};

const ja_buildercomposeraddapplication3 = /** @type {(inputs: Buildercomposeraddapplication3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`アプリケーションを追加`)
};

const ko_buildercomposeraddapplication3 = /** @type {(inputs: Buildercomposeraddapplication3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`애플리케이션 추가`)
};

const zh_hant1_buildercomposeraddapplication3 = /** @type {(inputs: Buildercomposeraddapplication3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`新增應用程式`)
};

const de_buildercomposeraddapplication3 = /** @type {(inputs: Buildercomposeraddapplication3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Anwendung hinzufügen`)
};

const fr_buildercomposeraddapplication3 = /** @type {(inputs: Buildercomposeraddapplication3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ajouter une application`)
};

const uk_buildercomposeraddapplication3 = /** @type {(inputs: Buildercomposeraddapplication3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Додати застосунок`)
};

/**
* | output |
* | --- |
* | "Add application" |
*
* @param {Buildercomposeraddapplication3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposeraddapplication3 = /** @type {((inputs?: Buildercomposeraddapplication3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposeraddapplication3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposeraddapplication3(inputs)
	if (locale === "zh") return zh_buildercomposeraddapplication3(inputs)
	if (locale === "ja") return ja_buildercomposeraddapplication3(inputs)
	if (locale === "ko") return ko_buildercomposeraddapplication3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposeraddapplication3(inputs)
	if (locale === "de") return de_buildercomposeraddapplication3(inputs)
	if (locale === "fr") return fr_buildercomposeraddapplication3(inputs)
	if (locale === "uk") return uk_buildercomposeraddapplication3(inputs)
	return en_buildercomposeraddapplication3(inputs)
});
export { buildercomposeraddapplication3 as "builderComposerAddApplication" }