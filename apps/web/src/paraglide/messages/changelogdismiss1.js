/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogdismiss1Inputs */

const en_changelogdismiss1 = /** @type {(inputs: Changelogdismiss1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dismiss`)
};

const es_changelogdismiss1 = /** @type {(inputs: Changelogdismiss1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dismiss`)
};

const zh_changelogdismiss1 = /** @type {(inputs: Changelogdismiss1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dismiss`)
};

const ja_changelogdismiss1 = /** @type {(inputs: Changelogdismiss1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dismiss`)
};

const ko_changelogdismiss1 = /** @type {(inputs: Changelogdismiss1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dismiss`)
};

const zh_hant1_changelogdismiss1 = /** @type {(inputs: Changelogdismiss1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dismiss`)
};

const de_changelogdismiss1 = /** @type {(inputs: Changelogdismiss1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dismiss`)
};

const fr_changelogdismiss1 = /** @type {(inputs: Changelogdismiss1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dismiss`)
};

const uk_changelogdismiss1 = /** @type {(inputs: Changelogdismiss1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dismiss`)
};

/**
* | output |
* | --- |
* | "Dismiss" |
*
* @param {Changelogdismiss1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changelogdismiss1 = /** @type {((inputs?: Changelogdismiss1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogdismiss1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_changelogdismiss1(inputs)
	if (locale === "zh") return zh_changelogdismiss1(inputs)
	if (locale === "ja") return ja_changelogdismiss1(inputs)
	if (locale === "ko") return ko_changelogdismiss1(inputs)
	if (locale === "zh-Hant") return zh_hant1_changelogdismiss1(inputs)
	if (locale === "de") return de_changelogdismiss1(inputs)
	if (locale === "fr") return fr_changelogdismiss1(inputs)
	if (locale === "uk") return uk_changelogdismiss1(inputs)
	return en_changelogdismiss1(inputs)
});
export { changelogdismiss1 as "changelogDismiss" }