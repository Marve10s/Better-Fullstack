/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderruneditor2Inputs */

const en_builderruneditor2 = /** @type {(inputs: Builderruneditor2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Code editor`)
};

const es_builderruneditor2 = /** @type {(inputs: Builderruneditor2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Editor de código`)
};

const zh_builderruneditor2 = /** @type {(inputs: Builderruneditor2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代码编辑器`)
};

const ja_builderruneditor2 = /** @type {(inputs: Builderruneditor2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`コードエディター`)
};

const ko_builderruneditor2 = /** @type {(inputs: Builderruneditor2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`코드 편집기`)
};

const zh_hant1_builderruneditor2 = /** @type {(inputs: Builderruneditor2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`程式碼編輯器`)
};

const de_builderruneditor2 = /** @type {(inputs: Builderruneditor2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Code-Editor`)
};

const fr_builderruneditor2 = /** @type {(inputs: Builderruneditor2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Éditeur de code`)
};

const uk_builderruneditor2 = /** @type {(inputs: Builderruneditor2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Редактор коду`)
};

/**
* | output |
* | --- |
* | "Code editor" |
*
* @param {Builderruneditor2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderruneditor2 = /** @type {((inputs?: Builderruneditor2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderruneditor2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_builderruneditor2(inputs)
	if (locale === "zh") return zh_builderruneditor2(inputs)
	if (locale === "ja") return ja_builderruneditor2(inputs)
	if (locale === "ko") return ko_builderruneditor2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderruneditor2(inputs)
	if (locale === "de") return de_builderruneditor2(inputs)
	if (locale === "fr") return fr_builderruneditor2(inputs)
	if (locale === "uk") return uk_builderruneditor2(inputs)
	return en_builderruneditor2(inputs)
});
export { builderruneditor2 as "builderRunEditor" }