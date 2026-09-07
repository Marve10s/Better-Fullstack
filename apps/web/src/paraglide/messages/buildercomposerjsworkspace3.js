/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerjsworkspace3Inputs */

const en_buildercomposerjsworkspace3 = /** @type {(inputs: Buildercomposerjsworkspace3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`JavaScript workspace`)
};

const es_buildercomposerjsworkspace3 = /** @type {(inputs: Buildercomposerjsworkspace3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Workspace de JavaScript`)
};

const zh_buildercomposerjsworkspace3 = /** @type {(inputs: Buildercomposerjsworkspace3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`JavaScript 工作区`)
};

const ja_buildercomposerjsworkspace3 = /** @type {(inputs: Buildercomposerjsworkspace3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`JavaScript ワークスペース`)
};

const ko_buildercomposerjsworkspace3 = /** @type {(inputs: Buildercomposerjsworkspace3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`JavaScript 워크스페이스`)
};

const zh_hant1_buildercomposerjsworkspace3 = /** @type {(inputs: Buildercomposerjsworkspace3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`JavaScript 工作區`)
};

const de_buildercomposerjsworkspace3 = /** @type {(inputs: Buildercomposerjsworkspace3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`JavaScript-Workspace`)
};

const fr_buildercomposerjsworkspace3 = /** @type {(inputs: Buildercomposerjsworkspace3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Workspace JavaScript`)
};

const uk_buildercomposerjsworkspace3 = /** @type {(inputs: Buildercomposerjsworkspace3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Робочий простір JavaScript`)
};

/**
* | output |
* | --- |
* | "JavaScript workspace" |
*
* @param {Buildercomposerjsworkspace3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerjsworkspace3 = /** @type {((inputs?: Buildercomposerjsworkspace3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerjsworkspace3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerjsworkspace3(inputs)
	if (locale === "zh") return zh_buildercomposerjsworkspace3(inputs)
	if (locale === "ja") return ja_buildercomposerjsworkspace3(inputs)
	if (locale === "ko") return ko_buildercomposerjsworkspace3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerjsworkspace3(inputs)
	if (locale === "de") return de_buildercomposerjsworkspace3(inputs)
	if (locale === "fr") return fr_buildercomposerjsworkspace3(inputs)
	if (locale === "uk") return uk_buildercomposerjsworkspace3(inputs)
	return en_buildercomposerjsworkspace3(inputs)
});
export { buildercomposerjsworkspace3 as "builderComposerJsWorkspace" }