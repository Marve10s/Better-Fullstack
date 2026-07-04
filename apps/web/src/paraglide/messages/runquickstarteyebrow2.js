/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runquickstarteyebrow2Inputs */

const en_runquickstarteyebrow2 = /** @type {(inputs: Runquickstarteyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Quickstart`)
};

const es_runquickstarteyebrow2 = /** @type {(inputs: Runquickstarteyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Inicio rápido`)
};

const zh_runquickstarteyebrow2 = /** @type {(inputs: Runquickstarteyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`快速入门`)
};

const ja_runquickstarteyebrow2 = /** @type {(inputs: Runquickstarteyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`クイックスタート`)
};

const ko_runquickstarteyebrow2 = /** @type {(inputs: Runquickstarteyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`빠른 시작`)
};

const zh_hant1_runquickstarteyebrow2 = /** @type {(inputs: Runquickstarteyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`快速入門`)
};

const de_runquickstarteyebrow2 = /** @type {(inputs: Runquickstarteyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Schnellstart`)
};

const fr_runquickstarteyebrow2 = /** @type {(inputs: Runquickstarteyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Démarrage rapide`)
};

const uk_runquickstarteyebrow2 = /** @type {(inputs: Runquickstarteyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Швидкий старт`)
};

/**
* | output |
* | --- |
* | "Quickstart" |
*
* @param {Runquickstarteyebrow2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const runquickstarteyebrow2 = /** @type {((inputs?: Runquickstarteyebrow2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runquickstarteyebrow2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runquickstarteyebrow2(inputs)
	if (locale === "es") return es_runquickstarteyebrow2(inputs)
	if (locale === "zh") return zh_runquickstarteyebrow2(inputs)
	if (locale === "ja") return ja_runquickstarteyebrow2(inputs)
	if (locale === "ko") return ko_runquickstarteyebrow2(inputs)
	if (locale === "zh-Hant") return zh_hant1_runquickstarteyebrow2(inputs)
	if (locale === "de") return de_runquickstarteyebrow2(inputs)
	if (locale === "fr") return fr_runquickstarteyebrow2(inputs)
	return uk_runquickstarteyebrow2(inputs)
});
export { runquickstarteyebrow2 as "runQuickstartEyebrow" }