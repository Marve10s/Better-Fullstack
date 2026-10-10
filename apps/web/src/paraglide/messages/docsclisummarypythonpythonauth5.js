/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythonauth5Inputs */

const en_docsclisummarypythonpythonauth5 = /** @type {(inputs: Docsclisummarypythonpythonauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python auth.`)
};

const es_docsclisummarypythonpythonauth5 = /** @type {(inputs: Docsclisummarypythonpythonauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Autenticación en Python.`)
};

const zh_docsclisummarypythonpythonauth5 = /** @type {(inputs: Docsclisummarypythonpythonauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 认证。`)
};

const ja_docsclisummarypythonpythonauth5 = /** @type {(inputs: Docsclisummarypythonpythonauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python の認証。`)
};

const ko_docsclisummarypythonpythonauth5 = /** @type {(inputs: Docsclisummarypythonpythonauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 인증.`)
};

const zh_hant1_docsclisummarypythonpythonauth5 = /** @type {(inputs: Docsclisummarypythonpythonauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 驗證。`)
};

const de_docsclisummarypythonpythonauth5 = /** @type {(inputs: Docsclisummarypythonpythonauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Authentifizierung für Python.`)
};

const fr_docsclisummarypythonpythonauth5 = /** @type {(inputs: Docsclisummarypythonpythonauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Authentification Python.`)
};

const uk_docsclisummarypythonpythonauth5 = /** @type {(inputs: Docsclisummarypythonpythonauth5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Автентифікація в Python.`)
};

/**
* | output |
* | --- |
* | "Python auth." |
*
* @param {Docsclisummarypythonpythonauth5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythonauth5 = /** @type {((inputs?: Docsclisummarypythonpythonauth5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythonauth5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarypythonpythonauth5(inputs)
	if (locale === "zh") return zh_docsclisummarypythonpythonauth5(inputs)
	if (locale === "ja") return ja_docsclisummarypythonpythonauth5(inputs)
	if (locale === "ko") return ko_docsclisummarypythonpythonauth5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarypythonpythonauth5(inputs)
	if (locale === "de") return de_docsclisummarypythonpythonauth5(inputs)
	if (locale === "fr") return fr_docsclisummarypythonpythonauth5(inputs)
	if (locale === "uk") return uk_docsclisummarypythonpythonauth5(inputs)
	return en_docsclisummarypythonpythonauth5(inputs)
});
export { docsclisummarypythonpythonauth5 as "docsCliSummaryPythonPythonAuth" }