/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationlisted2Inputs */

const en_docsverificationlisted2 = /** @type {(inputs: Docsverificationlisted2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Listed`)
};

const es_docsverificationlisted2 = /** @type {(inputs: Docsverificationlisted2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Listado`)
};

const zh_docsverificationlisted2 = /** @type {(inputs: Docsverificationlisted2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已列出`)
};

const ja_docsverificationlisted2 = /** @type {(inputs: Docsverificationlisted2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`記載済み`)
};

const ko_docsverificationlisted2 = /** @type {(inputs: Docsverificationlisted2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`목록에 포함`)
};

const zh_hant1_docsverificationlisted2 = /** @type {(inputs: Docsverificationlisted2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已列出`)
};

const de_docsverificationlisted2 = /** @type {(inputs: Docsverificationlisted2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aufgeführt`)
};

const fr_docsverificationlisted2 = /** @type {(inputs: Docsverificationlisted2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Répertorié`)
};

const uk_docsverificationlisted2 = /** @type {(inputs: Docsverificationlisted2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`У списку`)
};

/**
* | output |
* | --- |
* | "Listed" |
*
* @param {Docsverificationlisted2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationlisted2 = /** @type {((inputs?: Docsverificationlisted2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationlisted2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationlisted2(inputs)
	if (locale === "zh") return zh_docsverificationlisted2(inputs)
	if (locale === "ja") return ja_docsverificationlisted2(inputs)
	if (locale === "ko") return ko_docsverificationlisted2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationlisted2(inputs)
	if (locale === "de") return de_docsverificationlisted2(inputs)
	if (locale === "fr") return fr_docsverificationlisted2(inputs)
	if (locale === "uk") return uk_docsverificationlisted2(inputs)
	return en_docsverificationlisted2(inputs)
});
export { docsverificationlisted2 as "docsVerificationListed" }