/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationpassed2Inputs */

const en_docsverificationpassed2 = /** @type {(inputs: Docsverificationpassed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Passed`)
};

const es_docsverificationpassed2 = /** @type {(inputs: Docsverificationpassed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Superado`)
};

const zh_docsverificationpassed2 = /** @type {(inputs: Docsverificationpassed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`通过`)
};

const ja_docsverificationpassed2 = /** @type {(inputs: Docsverificationpassed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`合格`)
};

const ko_docsverificationpassed2 = /** @type {(inputs: Docsverificationpassed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`통과`)
};

const zh_hant1_docsverificationpassed2 = /** @type {(inputs: Docsverificationpassed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`通過`)
};

const de_docsverificationpassed2 = /** @type {(inputs: Docsverificationpassed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bestanden`)
};

const fr_docsverificationpassed2 = /** @type {(inputs: Docsverificationpassed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Réussi`)
};

const uk_docsverificationpassed2 = /** @type {(inputs: Docsverificationpassed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Пройдено`)
};

/**
* | output |
* | --- |
* | "Passed" |
*
* @param {Docsverificationpassed2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationpassed2 = /** @type {((inputs?: Docsverificationpassed2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationpassed2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationpassed2(inputs)
	if (locale === "zh") return zh_docsverificationpassed2(inputs)
	if (locale === "ja") return ja_docsverificationpassed2(inputs)
	if (locale === "ko") return ko_docsverificationpassed2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationpassed2(inputs)
	if (locale === "de") return de_docsverificationpassed2(inputs)
	if (locale === "fr") return fr_docsverificationpassed2(inputs)
	if (locale === "uk") return uk_docsverificationpassed2(inputs)
	return en_docsverificationpassed2(inputs)
});
export { docsverificationpassed2 as "docsVerificationPassed" }