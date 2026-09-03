/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofstatusrunlabel3Inputs */

const en_fixproofstatusrunlabel3 = /** @type {(inputs: Fixproofstatusrunlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dry run`)
};

const es_fixproofstatusrunlabel3 = /** @type {(inputs: Fixproofstatusrunlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ejecución de prueba`)
};

const zh_fixproofstatusrunlabel3 = /** @type {(inputs: Fixproofstatusrunlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`试运行`)
};

const ja_fixproofstatusrunlabel3 = /** @type {(inputs: Fixproofstatusrunlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ドライラン`)
};

const ko_fixproofstatusrunlabel3 = /** @type {(inputs: Fixproofstatusrunlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`드라이런`)
};

const zh_hant1_fixproofstatusrunlabel3 = /** @type {(inputs: Fixproofstatusrunlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`試執行`)
};

const de_fixproofstatusrunlabel3 = /** @type {(inputs: Fixproofstatusrunlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Testlauf`)
};

const fr_fixproofstatusrunlabel3 = /** @type {(inputs: Fixproofstatusrunlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Essai à blanc`)
};

const uk_fixproofstatusrunlabel3 = /** @type {(inputs: Fixproofstatusrunlabel3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Пробний запуск`)
};

/**
* | output |
* | --- |
* | "Dry run" |
*
* @param {Fixproofstatusrunlabel3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofstatusrunlabel3 = /** @type {((inputs?: Fixproofstatusrunlabel3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofstatusrunlabel3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofstatusrunlabel3(inputs)
	if (locale === "zh") return zh_fixproofstatusrunlabel3(inputs)
	if (locale === "ja") return ja_fixproofstatusrunlabel3(inputs)
	if (locale === "ko") return ko_fixproofstatusrunlabel3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofstatusrunlabel3(inputs)
	if (locale === "de") return de_fixproofstatusrunlabel3(inputs)
	if (locale === "fr") return fr_fixproofstatusrunlabel3(inputs)
	if (locale === "uk") return uk_fixproofstatusrunlabel3(inputs)
	return en_fixproofstatusrunlabel3(inputs)
});
export { fixproofstatusrunlabel3 as "fixproofStatusRunLabel" }