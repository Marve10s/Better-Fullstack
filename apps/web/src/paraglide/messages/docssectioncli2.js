/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssectioncli2Inputs */

const en_docssectioncli2 = /** @type {(inputs: Docssectioncli2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`CLI`)
};

const es_docssectioncli2 = /** @type {(inputs: Docssectioncli2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`CLI`)
};

const zh_docssectioncli2 = /** @type {(inputs: Docssectioncli2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`CLI`)
};

const ja_docssectioncli2 = /** @type {(inputs: Docssectioncli2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`CLI`)
};

const ko_docssectioncli2 = /** @type {(inputs: Docssectioncli2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`CLI`)
};

const zh_hant1_docssectioncli2 = /** @type {(inputs: Docssectioncli2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`CLI`)
};

const de_docssectioncli2 = /** @type {(inputs: Docssectioncli2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`CLI`)
};

const fr_docssectioncli2 = /** @type {(inputs: Docssectioncli2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`CLI`)
};

const uk_docssectioncli2 = /** @type {(inputs: Docssectioncli2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`CLI`)
};

/**
* | output |
* | --- |
* | "CLI" |
*
* @param {Docssectioncli2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docssectioncli2 = /** @type {((inputs?: Docssectioncli2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssectioncli2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docssectioncli2(inputs)
	if (locale === "es") return es_docssectioncli2(inputs)
	if (locale === "zh") return zh_docssectioncli2(inputs)
	if (locale === "ja") return ja_docssectioncli2(inputs)
	if (locale === "ko") return ko_docssectioncli2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docssectioncli2(inputs)
	if (locale === "de") return de_docssectioncli2(inputs)
	if (locale === "fr") return fr_docssectioncli2(inputs)
	return uk_docssectioncli2(inputs)
});
export { docssectioncli2 as "docsSectionCli" }