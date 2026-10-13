/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythonpackagemanager6Inputs */

const en_docsclisummarypythonpythonpackagemanager6 = /** @type {(inputs: Docsclisummarypythonpythonpackagemanager6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python package manager.`)
};

const es_docsclisummarypythonpythonpackagemanager6 = /** @type {(inputs: Docsclisummarypythonpythonpackagemanager6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gestor de paquetes Python.`)
};

const zh_docsclisummarypythonpythonpackagemanager6 = /** @type {(inputs: Docsclisummarypythonpythonpackagemanager6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 包管理器。`)
};

const ja_docsclisummarypythonpythonpackagemanager6 = /** @type {(inputs: Docsclisummarypythonpythonpackagemanager6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python のパッケージマネージャー。`)
};

const ko_docsclisummarypythonpythonpackagemanager6 = /** @type {(inputs: Docsclisummarypythonpythonpackagemanager6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 패키지 매니저.`)
};

const zh_hant1_docsclisummarypythonpythonpackagemanager6 = /** @type {(inputs: Docsclisummarypythonpythonpackagemanager6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 套件管理器。`)
};

const de_docsclisummarypythonpythonpackagemanager6 = /** @type {(inputs: Docsclisummarypythonpythonpackagemanager6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Paketmanager für Python.`)
};

const fr_docsclisummarypythonpythonpackagemanager6 = /** @type {(inputs: Docsclisummarypythonpythonpackagemanager6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gestionnaire de paquets Python.`)
};

const uk_docsclisummarypythonpythonpackagemanager6 = /** @type {(inputs: Docsclisummarypythonpythonpackagemanager6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Менеджер пакетів Python.`)
};

/**
* | output |
* | --- |
* | "Python package manager." |
*
* @param {Docsclisummarypythonpythonpackagemanager6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythonpackagemanager6 = /** @type {((inputs?: Docsclisummarypythonpythonpackagemanager6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythonpackagemanager6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarypythonpythonpackagemanager6(inputs)
	if (locale === "zh") return zh_docsclisummarypythonpythonpackagemanager6(inputs)
	if (locale === "ja") return ja_docsclisummarypythonpythonpackagemanager6(inputs)
	if (locale === "ko") return ko_docsclisummarypythonpythonpackagemanager6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarypythonpythonpackagemanager6(inputs)
	if (locale === "de") return de_docsclisummarypythonpythonpackagemanager6(inputs)
	if (locale === "fr") return fr_docsclisummarypythonpythonpackagemanager6(inputs)
	if (locale === "uk") return uk_docsclisummarypythonpythonpackagemanager6(inputs)
	return en_docsclisummarypythonpythonpackagemanager6(inputs)
});
export { docsclisummarypythonpythonpackagemanager6 as "docsCliSummaryPythonPythonPackageManager" }