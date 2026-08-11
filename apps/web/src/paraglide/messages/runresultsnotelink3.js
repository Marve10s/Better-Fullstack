/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runresultsnotelink3Inputs */

const en_runresultsnotelink3 = /** @type {(inputs: Runresultsnotelink3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`published reports`)
};

const es_runresultsnotelink3 = /** @type {(inputs: Runresultsnotelink3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`informes publicados`)
};

const zh_runresultsnotelink3 = /** @type {(inputs: Runresultsnotelink3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已发布的报告`)
};

const ja_runresultsnotelink3 = /** @type {(inputs: Runresultsnotelink3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`公表された報告書`)
};

const ko_runresultsnotelink3 = /** @type {(inputs: Runresultsnotelink3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`발표된 보고서`)
};

const zh_hant1_runresultsnotelink3 = /** @type {(inputs: Runresultsnotelink3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已發表的報告`)
};

const de_runresultsnotelink3 = /** @type {(inputs: Runresultsnotelink3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`veröffentlichte Berichte`)
};

const fr_runresultsnotelink3 = /** @type {(inputs: Runresultsnotelink3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`rapports publiés`)
};

const uk_runresultsnotelink3 = /** @type {(inputs: Runresultsnotelink3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`опубліковані звіти`)
};

/**
* | output |
* | --- |
* | "published reports" |
*
* @param {Runresultsnotelink3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const runresultsnotelink3 = /** @type {((inputs?: Runresultsnotelink3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runresultsnotelink3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_runresultsnotelink3(inputs)
	if (locale === "zh") return zh_runresultsnotelink3(inputs)
	if (locale === "ja") return ja_runresultsnotelink3(inputs)
	if (locale === "ko") return ko_runresultsnotelink3(inputs)
	if (locale === "zh-Hant") return zh_hant1_runresultsnotelink3(inputs)
	if (locale === "de") return de_runresultsnotelink3(inputs)
	if (locale === "fr") return fr_runresultsnotelink3(inputs)
	if (locale === "uk") return uk_runresultsnotelink3(inputs)
	return en_runresultsnotelink3(inputs)
});
export { runresultsnotelink3 as "runResultsNoteLink" }