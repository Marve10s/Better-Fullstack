/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogdismiss1Inputs */

const en_changelogdismiss1 = /** @type {(inputs: Changelogdismiss1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dismiss`)
};

const es_changelogdismiss1 = /** @type {(inputs: Changelogdismiss1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Descartar`)
};

const zh_changelogdismiss1 = /** @type {(inputs: Changelogdismiss1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关闭`)
};

const ja_changelogdismiss1 = /** @type {(inputs: Changelogdismiss1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`閉じる`)
};

const ko_changelogdismiss1 = /** @type {(inputs: Changelogdismiss1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`닫기`)
};

const zh_hant1_changelogdismiss1 = /** @type {(inputs: Changelogdismiss1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`關閉`)
};

const de_changelogdismiss1 = /** @type {(inputs: Changelogdismiss1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Schließen`)
};

const fr_changelogdismiss1 = /** @type {(inputs: Changelogdismiss1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ignorer`)
};

const uk_changelogdismiss1 = /** @type {(inputs: Changelogdismiss1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Закрити`)
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