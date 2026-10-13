/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssectionautomate2Inputs */

const en_docssectionautomate2 = /** @type {(inputs: Docssectionautomate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Automate`)
};

const es_docssectionautomate2 = /** @type {(inputs: Docssectionautomate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Automatizar`)
};

const zh_docssectionautomate2 = /** @type {(inputs: Docssectionautomate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`自动化`)
};

const ja_docssectionautomate2 = /** @type {(inputs: Docssectionautomate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`自動化`)
};

const ko_docssectionautomate2 = /** @type {(inputs: Docssectionautomate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`자동화`)
};

const zh_hant1_docssectionautomate2 = /** @type {(inputs: Docssectionautomate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`自動化`)
};

const de_docssectionautomate2 = /** @type {(inputs: Docssectionautomate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Automatisieren`)
};

const fr_docssectionautomate2 = /** @type {(inputs: Docssectionautomate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Automatiser`)
};

const uk_docssectionautomate2 = /** @type {(inputs: Docssectionautomate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Автоматизація`)
};

/**
* | output |
* | --- |
* | "Automate" |
*
* @param {Docssectionautomate2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docssectionautomate2 = /** @type {((inputs?: Docssectionautomate2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssectionautomate2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docssectionautomate2(inputs)
	if (locale === "zh") return zh_docssectionautomate2(inputs)
	if (locale === "ja") return ja_docssectionautomate2(inputs)
	if (locale === "ko") return ko_docssectionautomate2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docssectionautomate2(inputs)
	if (locale === "de") return de_docssectionautomate2(inputs)
	if (locale === "fr") return fr_docssectionautomate2(inputs)
	if (locale === "uk") return uk_docssectionautomate2(inputs)
	return en_docssectionautomate2(inputs)
});
export { docssectionautomate2 as "docsSectionAutomate" }