/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationcommit2Inputs */

const en_docsverificationcommit2 = /** @type {(inputs: Docsverificationcommit2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Commit`)
};

const es_docsverificationcommit2 = /** @type {(inputs: Docsverificationcommit2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Commit`)
};

const zh_docsverificationcommit2 = /** @type {(inputs: Docsverificationcommit2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`提交`)
};

const ja_docsverificationcommit2 = /** @type {(inputs: Docsverificationcommit2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`コミット`)
};

const ko_docsverificationcommit2 = /** @type {(inputs: Docsverificationcommit2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`커밋`)
};

const zh_hant1_docsverificationcommit2 = /** @type {(inputs: Docsverificationcommit2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Commit`)
};

const de_docsverificationcommit2 = /** @type {(inputs: Docsverificationcommit2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Commit`)
};

const fr_docsverificationcommit2 = /** @type {(inputs: Docsverificationcommit2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Commit`)
};

const uk_docsverificationcommit2 = /** @type {(inputs: Docsverificationcommit2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Коміт`)
};

/**
* | output |
* | --- |
* | "Commit" |
*
* @param {Docsverificationcommit2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationcommit2 = /** @type {((inputs?: Docsverificationcommit2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationcommit2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationcommit2(inputs)
	if (locale === "zh") return zh_docsverificationcommit2(inputs)
	if (locale === "ja") return ja_docsverificationcommit2(inputs)
	if (locale === "ko") return ko_docsverificationcommit2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationcommit2(inputs)
	if (locale === "de") return de_docsverificationcommit2(inputs)
	if (locale === "fr") return fr_docsverificationcommit2(inputs)
	if (locale === "uk") return uk_docsverificationcommit2(inputs)
	return en_docsverificationcommit2(inputs)
});
export { docsverificationcommit2 as "docsVerificationCommit" }