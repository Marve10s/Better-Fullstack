/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationnotverified3Inputs */

const en_docsverificationnotverified3 = /** @type {(inputs: Docsverificationnotverified3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Not verified`)
};

const es_docsverificationnotverified3 = /** @type {(inputs: Docsverificationnotverified3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sin verificar`)
};

const zh_docsverificationnotverified3 = /** @type {(inputs: Docsverificationnotverified3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未验证`)
};

const ja_docsverificationnotverified3 = /** @type {(inputs: Docsverificationnotverified3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未検証`)
};

const ko_docsverificationnotverified3 = /** @type {(inputs: Docsverificationnotverified3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`검증되지 않음`)
};

const zh_hant1_docsverificationnotverified3 = /** @type {(inputs: Docsverificationnotverified3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未驗證`)
};

const de_docsverificationnotverified3 = /** @type {(inputs: Docsverificationnotverified3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nicht verifiziert`)
};

const fr_docsverificationnotverified3 = /** @type {(inputs: Docsverificationnotverified3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Non vérifié`)
};

const uk_docsverificationnotverified3 = /** @type {(inputs: Docsverificationnotverified3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Не перевірено`)
};

/**
* | output |
* | --- |
* | "Not verified" |
*
* @param {Docsverificationnotverified3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationnotverified3 = /** @type {((inputs?: Docsverificationnotverified3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationnotverified3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationnotverified3(inputs)
	if (locale === "zh") return zh_docsverificationnotverified3(inputs)
	if (locale === "ja") return ja_docsverificationnotverified3(inputs)
	if (locale === "ko") return ko_docsverificationnotverified3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationnotverified3(inputs)
	if (locale === "de") return de_docsverificationnotverified3(inputs)
	if (locale === "fr") return fr_docsverificationnotverified3(inputs)
	if (locale === "uk") return uk_docsverificationnotverified3(inputs)
	return en_docsverificationnotverified3(inputs)
});
export { docsverificationnotverified3 as "docsVerificationNotVerified" }