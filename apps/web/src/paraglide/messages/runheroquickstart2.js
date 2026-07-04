/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runheroquickstart2Inputs */

const en_runheroquickstart2 = /** @type {(inputs: Runheroquickstart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Quickstart`)
};

const es_runheroquickstart2 = /** @type {(inputs: Runheroquickstart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Inicio rápido`)
};

const zh_runheroquickstart2 = /** @type {(inputs: Runheroquickstart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`快速入门`)
};

const ja_runheroquickstart2 = /** @type {(inputs: Runheroquickstart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`クイックスタート`)
};

const ko_runheroquickstart2 = /** @type {(inputs: Runheroquickstart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`빠른 시작`)
};

const zh_hant1_runheroquickstart2 = /** @type {(inputs: Runheroquickstart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`快速入門`)
};

const de_runheroquickstart2 = /** @type {(inputs: Runheroquickstart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Schnellstart`)
};

const fr_runheroquickstart2 = /** @type {(inputs: Runheroquickstart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Démarrage rapide`)
};

const uk_runheroquickstart2 = /** @type {(inputs: Runheroquickstart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Швидкий старт`)
};

/**
* | output |
* | --- |
* | "Quickstart" |
*
* @param {Runheroquickstart2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const runheroquickstart2 = /** @type {((inputs?: Runheroquickstart2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runheroquickstart2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runheroquickstart2(inputs)
	if (locale === "es") return es_runheroquickstart2(inputs)
	if (locale === "zh") return zh_runheroquickstart2(inputs)
	if (locale === "ja") return ja_runheroquickstart2(inputs)
	if (locale === "ko") return ko_runheroquickstart2(inputs)
	if (locale === "zh-Hant") return zh_hant1_runheroquickstart2(inputs)
	if (locale === "de") return de_runheroquickstart2(inputs)
	if (locale === "fr") return fr_runheroquickstart2(inputs)
	return uk_runheroquickstart2(inputs)
});
export { runheroquickstart2 as "runHeroQuickstart" }