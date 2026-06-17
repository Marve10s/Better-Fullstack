/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssectiongettingstarted3Inputs */

const en_docssectiongettingstarted3 = /** @type {(inputs: Docssectiongettingstarted3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Getting Started`)
};

const es_docssectiongettingstarted3 = /** @type {(inputs: Docssectiongettingstarted3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Primeros pasos`)
};

const zh_docssectiongettingstarted3 = /** @type {(inputs: Docssectiongettingstarted3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`入门`)
};

const ja_docssectiongettingstarted3 = /** @type {(inputs: Docssectiongettingstarted3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`はじめる`)
};

const ko_docssectiongettingstarted3 = /** @type {(inputs: Docssectiongettingstarted3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`시작하기`)
};

const zh_hant1_docssectiongettingstarted3 = /** @type {(inputs: Docssectiongettingstarted3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`入門`)
};

const de_docssectiongettingstarted3 = /** @type {(inputs: Docssectiongettingstarted3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Erste Schritte`)
};

const fr_docssectiongettingstarted3 = /** @type {(inputs: Docssectiongettingstarted3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Commencer`)
};

/**
* | output |
* | --- |
* | "Getting Started" |
*
* @param {Docssectiongettingstarted3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const docssectiongettingstarted3 = /** @type {((inputs?: Docssectiongettingstarted3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssectiongettingstarted3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docssectiongettingstarted3(inputs)
	if (locale === "es") return es_docssectiongettingstarted3(inputs)
	if (locale === "zh") return zh_docssectiongettingstarted3(inputs)
	if (locale === "ja") return ja_docssectiongettingstarted3(inputs)
	if (locale === "ko") return ko_docssectiongettingstarted3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docssectiongettingstarted3(inputs)
	if (locale === "de") return de_docssectiongettingstarted3(inputs)
	return fr_docssectiongettingstarted3(inputs)
});
export { docssectiongettingstarted3 as "docsSectionGettingStarted" }