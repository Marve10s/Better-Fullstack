/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerconfigure2Inputs */

const en_buildercomposerconfigure2 = /** @type {(inputs: Buildercomposerconfigure2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Configure`)
};

const es_buildercomposerconfigure2 = /** @type {(inputs: Buildercomposerconfigure2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Configurar`)
};

const zh_buildercomposerconfigure2 = /** @type {(inputs: Buildercomposerconfigure2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`配置`)
};

const ja_buildercomposerconfigure2 = /** @type {(inputs: Buildercomposerconfigure2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`構成`)
};

const ko_buildercomposerconfigure2 = /** @type {(inputs: Buildercomposerconfigure2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`구성`)
};

const zh_hant1_buildercomposerconfigure2 = /** @type {(inputs: Buildercomposerconfigure2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`設定`)
};

const de_buildercomposerconfigure2 = /** @type {(inputs: Buildercomposerconfigure2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Konfigurieren`)
};

const fr_buildercomposerconfigure2 = /** @type {(inputs: Buildercomposerconfigure2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Configurer`)
};

const uk_buildercomposerconfigure2 = /** @type {(inputs: Buildercomposerconfigure2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Налаштування`)
};

/**
* | output |
* | --- |
* | "Configure" |
*
* @param {Buildercomposerconfigure2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerconfigure2 = /** @type {((inputs?: Buildercomposerconfigure2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerconfigure2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerconfigure2(inputs)
	if (locale === "zh") return zh_buildercomposerconfigure2(inputs)
	if (locale === "ja") return ja_buildercomposerconfigure2(inputs)
	if (locale === "ko") return ko_buildercomposerconfigure2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerconfigure2(inputs)
	if (locale === "de") return de_buildercomposerconfigure2(inputs)
	if (locale === "fr") return fr_buildercomposerconfigure2(inputs)
	if (locale === "uk") return uk_buildercomposerconfigure2(inputs)
	return en_buildercomposerconfigure2(inputs)
});
export { buildercomposerconfigure2 as "builderComposerConfigure" }