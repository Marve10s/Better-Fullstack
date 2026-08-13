/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderlibraries1Inputs */

const en_builderlibraries1 = /** @type {(inputs: Builderlibraries1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Libraries`)
};

const es_builderlibraries1 = /** @type {(inputs: Builderlibraries1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Librerías`)
};

const zh_builderlibraries1 = /** @type {(inputs: Builderlibraries1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`库`)
};

const ja_builderlibraries1 = /** @type {(inputs: Builderlibraries1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ライブラリ`)
};

const ko_builderlibraries1 = /** @type {(inputs: Builderlibraries1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`라이브러리`)
};

const zh_hant1_builderlibraries1 = /** @type {(inputs: Builderlibraries1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`庫`)
};

const de_builderlibraries1 = /** @type {(inputs: Builderlibraries1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliotheken`)
};

const fr_builderlibraries1 = /** @type {(inputs: Builderlibraries1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliothèques`)
};

const uk_builderlibraries1 = /** @type {(inputs: Builderlibraries1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Бібліотеки`)
};

/**
* | output |
* | --- |
* | "Libraries" |
*
* @param {Builderlibraries1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderlibraries1 = /** @type {((inputs?: Builderlibraries1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderlibraries1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_builderlibraries1(inputs)
	if (locale === "zh") return zh_builderlibraries1(inputs)
	if (locale === "ja") return ja_builderlibraries1(inputs)
	if (locale === "ko") return ko_builderlibraries1(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderlibraries1(inputs)
	if (locale === "de") return de_builderlibraries1(inputs)
	if (locale === "fr") return fr_builderlibraries1(inputs)
	if (locale === "uk") return uk_builderlibraries1(inputs)
	return en_builderlibraries1(inputs)
});
export { builderlibraries1 as "builderLibraries" }