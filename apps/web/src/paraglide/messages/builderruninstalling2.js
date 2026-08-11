/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderruninstalling2Inputs */

const en_builderruninstalling2 = /** @type {(inputs: Builderruninstalling2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Installing dependencies`)
};

const es_builderruninstalling2 = /** @type {(inputs: Builderruninstalling2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Instalando dependencias`)
};

const zh_builderruninstalling2 = /** @type {(inputs: Builderruninstalling2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在安装依赖`)
};

const ja_builderruninstalling2 = /** @type {(inputs: Builderruninstalling2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`依存関係をインストール中`)
};

const ko_builderruninstalling2 = /** @type {(inputs: Builderruninstalling2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`의존성 설치 중`)
};

const zh_hant1_builderruninstalling2 = /** @type {(inputs: Builderruninstalling2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在安裝相依套件`)
};

const de_builderruninstalling2 = /** @type {(inputs: Builderruninstalling2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abhängigkeiten werden installiert`)
};

const fr_builderruninstalling2 = /** @type {(inputs: Builderruninstalling2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Installation des dépendances`)
};

const uk_builderruninstalling2 = /** @type {(inputs: Builderruninstalling2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Встановлення залежностей`)
};

/**
* | output |
* | --- |
* | "Installing dependencies" |
*
* @param {Builderruninstalling2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderruninstalling2 = /** @type {((inputs?: Builderruninstalling2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderruninstalling2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_builderruninstalling2(inputs)
	if (locale === "zh") return zh_builderruninstalling2(inputs)
	if (locale === "ja") return ja_builderruninstalling2(inputs)
	if (locale === "ko") return ko_builderruninstalling2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderruninstalling2(inputs)
	if (locale === "de") return de_builderruninstalling2(inputs)
	if (locale === "fr") return fr_builderruninstalling2(inputs)
	if (locale === "uk") return uk_builderruninstalling2(inputs)
	return en_builderruninstalling2(inputs)
});
export { builderruninstalling2 as "builderRunInstalling" }