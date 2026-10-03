/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationecosystems2Inputs */

const en_docsverificationecosystems2 = /** @type {(inputs: Docsverificationecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ecosystems`)
};

const es_docsverificationecosystems2 = /** @type {(inputs: Docsverificationecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ecosistemas`)
};

const zh_docsverificationecosystems2 = /** @type {(inputs: Docsverificationecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生态`)
};

const ja_docsverificationecosystems2 = /** @type {(inputs: Docsverificationecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`エコシステム`)
};

const ko_docsverificationecosystems2 = /** @type {(inputs: Docsverificationecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`생태계`)
};

const zh_hant1_docsverificationecosystems2 = /** @type {(inputs: Docsverificationecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生態系`)
};

const de_docsverificationecosystems2 = /** @type {(inputs: Docsverificationecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ökosysteme`)
};

const fr_docsverificationecosystems2 = /** @type {(inputs: Docsverificationecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Écosystèmes`)
};

const uk_docsverificationecosystems2 = /** @type {(inputs: Docsverificationecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Екосистеми`)
};

/**
* | output |
* | --- |
* | "Ecosystems" |
*
* @param {Docsverificationecosystems2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationecosystems2 = /** @type {((inputs?: Docsverificationecosystems2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationecosystems2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationecosystems2(inputs)
	if (locale === "zh") return zh_docsverificationecosystems2(inputs)
	if (locale === "ja") return ja_docsverificationecosystems2(inputs)
	if (locale === "ko") return ko_docsverificationecosystems2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationecosystems2(inputs)
	if (locale === "de") return de_docsverificationecosystems2(inputs)
	if (locale === "fr") return fr_docsverificationecosystems2(inputs)
	if (locale === "uk") return uk_docsverificationecosystems2(inputs)
	return en_docsverificationecosystems2(inputs)
});
export { docsverificationecosystems2 as "docsVerificationEcosystems" }