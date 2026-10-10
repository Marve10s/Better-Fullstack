/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docscliacceptedvalues3Inputs */

const en_docscliacceptedvalues3 = /** @type {(inputs: Docscliacceptedvalues3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Accepted values`)
};

const es_docscliacceptedvalues3 = /** @type {(inputs: Docscliacceptedvalues3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Valores aceptados`)
};

const zh_docscliacceptedvalues3 = /** @type {(inputs: Docscliacceptedvalues3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可接受的值`)
};

const ja_docscliacceptedvalues3 = /** @type {(inputs: Docscliacceptedvalues3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`使用できる値`)
};

const ko_docscliacceptedvalues3 = /** @type {(inputs: Docscliacceptedvalues3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`허용 값`)
};

const zh_hant1_docscliacceptedvalues3 = /** @type {(inputs: Docscliacceptedvalues3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可接受的值`)
};

const de_docscliacceptedvalues3 = /** @type {(inputs: Docscliacceptedvalues3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Akzeptierte Werte`)
};

const fr_docscliacceptedvalues3 = /** @type {(inputs: Docscliacceptedvalues3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Valeurs acceptées`)
};

const uk_docscliacceptedvalues3 = /** @type {(inputs: Docscliacceptedvalues3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Допустимі значення`)
};

/**
* | output |
* | --- |
* | "Accepted values" |
*
* @param {Docscliacceptedvalues3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docscliacceptedvalues3 = /** @type {((inputs?: Docscliacceptedvalues3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docscliacceptedvalues3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docscliacceptedvalues3(inputs)
	if (locale === "zh") return zh_docscliacceptedvalues3(inputs)
	if (locale === "ja") return ja_docscliacceptedvalues3(inputs)
	if (locale === "ko") return ko_docscliacceptedvalues3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docscliacceptedvalues3(inputs)
	if (locale === "de") return de_docscliacceptedvalues3(inputs)
	if (locale === "fr") return fr_docscliacceptedvalues3(inputs)
	if (locale === "uk") return uk_docscliacceptedvalues3(inputs)
	return en_docscliacceptedvalues3(inputs)
});
export { docscliacceptedvalues3 as "docsCliAcceptedValues" }