/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docspackagemanager2Inputs */

const en_docspackagemanager2 = /** @type {(inputs: Docspackagemanager2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Package manager`)
};

const es_docspackagemanager2 = /** @type {(inputs: Docspackagemanager2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gestor de paquetes`)
};

const zh_docspackagemanager2 = /** @type {(inputs: Docspackagemanager2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`包管理器`)
};

const ja_docspackagemanager2 = /** @type {(inputs: Docspackagemanager2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`パッケージマネージャー`)
};

const ko_docspackagemanager2 = /** @type {(inputs: Docspackagemanager2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`패키지 매니저`)
};

const zh_hant1_docspackagemanager2 = /** @type {(inputs: Docspackagemanager2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`套件管理器`)
};

const de_docspackagemanager2 = /** @type {(inputs: Docspackagemanager2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Paketmanager`)
};

const fr_docspackagemanager2 = /** @type {(inputs: Docspackagemanager2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gestionnaire de paquets`)
};

const uk_docspackagemanager2 = /** @type {(inputs: Docspackagemanager2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Менеджер пакетів`)
};

/**
* | output |
* | --- |
* | "Package manager" |
*
* @param {Docspackagemanager2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docspackagemanager2 = /** @type {((inputs?: Docspackagemanager2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docspackagemanager2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docspackagemanager2(inputs)
	if (locale === "zh") return zh_docspackagemanager2(inputs)
	if (locale === "ja") return ja_docspackagemanager2(inputs)
	if (locale === "ko") return ko_docspackagemanager2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docspackagemanager2(inputs)
	if (locale === "de") return de_docspackagemanager2(inputs)
	if (locale === "fr") return fr_docspackagemanager2(inputs)
	if (locale === "uk") return uk_docspackagemanager2(inputs)
	return en_docspackagemanager2(inputs)
});
export { docspackagemanager2 as "docsPackageManager" }