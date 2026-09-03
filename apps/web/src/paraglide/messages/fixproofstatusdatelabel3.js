/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofstatusdatelabel3Inputs */

const en_fixproofstatusdatelabel3 = /** @type {(inputs: Fixproofstatusdatelabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Date`)
};

const es_fixproofstatusdatelabel3 = /** @type {(inputs: Fixproofstatusdatelabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Date`)
};

const zh_fixproofstatusdatelabel3 = /** @type {(inputs: Fixproofstatusdatelabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Date`)
};

const ja_fixproofstatusdatelabel3 = /** @type {(inputs: Fixproofstatusdatelabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Date`)
};

const ko_fixproofstatusdatelabel3 = /** @type {(inputs: Fixproofstatusdatelabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Date`)
};

const zh_hant1_fixproofstatusdatelabel3 = /** @type {(inputs: Fixproofstatusdatelabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Date`)
};

const de_fixproofstatusdatelabel3 = /** @type {(inputs: Fixproofstatusdatelabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Date`)
};

const fr_fixproofstatusdatelabel3 = /** @type {(inputs: Fixproofstatusdatelabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Date`)
};

const uk_fixproofstatusdatelabel3 = /** @type {(inputs: Fixproofstatusdatelabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Date`)
};

/**
* | output |
* | --- |
* | "Date" |
*
* @param {Fixproofstatusdatelabel3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofstatusdatelabel3 = /** @type {((inputs?: Fixproofstatusdatelabel3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofstatusdatelabel3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofstatusdatelabel3(inputs)
	if (locale === "zh") return zh_fixproofstatusdatelabel3(inputs)
	if (locale === "ja") return ja_fixproofstatusdatelabel3(inputs)
	if (locale === "ko") return ko_fixproofstatusdatelabel3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofstatusdatelabel3(inputs)
	if (locale === "de") return de_fixproofstatusdatelabel3(inputs)
	if (locale === "fr") return fr_fixproofstatusdatelabel3(inputs)
	if (locale === "uk") return uk_fixproofstatusdatelabel3(inputs)
	return en_fixproofstatusdatelabel3(inputs)
});
export { fixproofstatusdatelabel3 as "fixproofStatusDateLabel" }