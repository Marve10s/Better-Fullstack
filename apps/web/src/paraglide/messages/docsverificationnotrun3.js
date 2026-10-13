/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationnotrun3Inputs */

const en_docsverificationnotrun3 = /** @type {(inputs: Docsverificationnotrun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Not run`)
};

const es_docsverificationnotrun3 = /** @type {(inputs: Docsverificationnotrun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sin ejecutar`)
};

const zh_docsverificationnotrun3 = /** @type {(inputs: Docsverificationnotrun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未运行`)
};

const ja_docsverificationnotrun3 = /** @type {(inputs: Docsverificationnotrun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未実行`)
};

const ko_docsverificationnotrun3 = /** @type {(inputs: Docsverificationnotrun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`실행 안 함`)
};

const zh_hant1_docsverificationnotrun3 = /** @type {(inputs: Docsverificationnotrun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未執行`)
};

const de_docsverificationnotrun3 = /** @type {(inputs: Docsverificationnotrun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nicht ausgeführt`)
};

const fr_docsverificationnotrun3 = /** @type {(inputs: Docsverificationnotrun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Non exécuté`)
};

const uk_docsverificationnotrun3 = /** @type {(inputs: Docsverificationnotrun3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Не запускалося`)
};

/**
* | output |
* | --- |
* | "Not run" |
*
* @param {Docsverificationnotrun3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationnotrun3 = /** @type {((inputs?: Docsverificationnotrun3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationnotrun3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationnotrun3(inputs)
	if (locale === "zh") return zh_docsverificationnotrun3(inputs)
	if (locale === "ja") return ja_docsverificationnotrun3(inputs)
	if (locale === "ko") return ko_docsverificationnotrun3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationnotrun3(inputs)
	if (locale === "de") return de_docsverificationnotrun3(inputs)
	if (locale === "fr") return fr_docsverificationnotrun3(inputs)
	if (locale === "uk") return uk_docsverificationnotrun3(inputs)
	return en_docsverificationnotrun3(inputs)
});
export { docsverificationnotrun3 as "docsVerificationNotRun" }