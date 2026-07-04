/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackrestapiname4Inputs */

const en_presettrackrestapiname4 = /** @type {(inputs: Presettrackrestapiname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`REST API`)
};

const es_presettrackrestapiname4 = /** @type {(inputs: Presettrackrestapiname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`REST API`)
};

const zh_presettrackrestapiname4 = /** @type {(inputs: Presettrackrestapiname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`REST API`)
};

const ja_presettrackrestapiname4 = /** @type {(inputs: Presettrackrestapiname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`REST API`)
};

const ko_presettrackrestapiname4 = /** @type {(inputs: Presettrackrestapiname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`REST API`)
};

const zh_hant1_presettrackrestapiname4 = /** @type {(inputs: Presettrackrestapiname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`REST API`)
};

const de_presettrackrestapiname4 = /** @type {(inputs: Presettrackrestapiname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`REST API`)
};

const fr_presettrackrestapiname4 = /** @type {(inputs: Presettrackrestapiname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`REST API`)
};

const uk_presettrackrestapiname4 = /** @type {(inputs: Presettrackrestapiname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`REST API`)
};

/**
* | output |
* | --- |
* | "REST API" |
*
* @param {Presettrackrestapiname4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presettrackrestapiname4 = /** @type {((inputs?: Presettrackrestapiname4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackrestapiname4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackrestapiname4(inputs)
	if (locale === "es") return es_presettrackrestapiname4(inputs)
	if (locale === "zh") return zh_presettrackrestapiname4(inputs)
	if (locale === "ja") return ja_presettrackrestapiname4(inputs)
	if (locale === "ko") return ko_presettrackrestapiname4(inputs)
	if (locale === "zh-Hant") return zh_hant1_presettrackrestapiname4(inputs)
	if (locale === "de") return de_presettrackrestapiname4(inputs)
	if (locale === "fr") return fr_presettrackrestapiname4(inputs)
	return uk_presettrackrestapiname4(inputs)
});
export { presettrackrestapiname4 as "presetTrackRestApiName" }