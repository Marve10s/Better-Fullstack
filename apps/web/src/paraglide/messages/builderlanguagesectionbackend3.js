/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderlanguagesectionbackend3Inputs */

const en_builderlanguagesectionbackend3 = /** @type {(inputs: Builderlanguagesectionbackend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Backend`)
};

const es_builderlanguagesectionbackend3 = /** @type {(inputs: Builderlanguagesectionbackend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Backend`)
};

const zh_builderlanguagesectionbackend3 = /** @type {(inputs: Builderlanguagesectionbackend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`后端`)
};

const ja_builderlanguagesectionbackend3 = /** @type {(inputs: Builderlanguagesectionbackend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`バックエンド`)
};

const ko_builderlanguagesectionbackend3 = /** @type {(inputs: Builderlanguagesectionbackend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`백엔드`)
};

const zh_hant1_builderlanguagesectionbackend3 = /** @type {(inputs: Builderlanguagesectionbackend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`後端`)
};

const de_builderlanguagesectionbackend3 = /** @type {(inputs: Builderlanguagesectionbackend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Backend`)
};

const fr_builderlanguagesectionbackend3 = /** @type {(inputs: Builderlanguagesectionbackend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Backend`)
};

const uk_builderlanguagesectionbackend3 = /** @type {(inputs: Builderlanguagesectionbackend3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Бекенд`)
};

/**
* | output |
* | --- |
* | "Backend" |
*
* @param {Builderlanguagesectionbackend3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderlanguagesectionbackend3 = /** @type {((inputs?: Builderlanguagesectionbackend3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderlanguagesectionbackend3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_builderlanguagesectionbackend3(inputs)
	if (locale === "zh") return zh_builderlanguagesectionbackend3(inputs)
	if (locale === "ja") return ja_builderlanguagesectionbackend3(inputs)
	if (locale === "ko") return ko_builderlanguagesectionbackend3(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderlanguagesectionbackend3(inputs)
	if (locale === "de") return de_builderlanguagesectionbackend3(inputs)
	if (locale === "fr") return fr_builderlanguagesectionbackend3(inputs)
	if (locale === "uk") return uk_builderlanguagesectionbackend3(inputs)
	return en_builderlanguagesectionbackend3(inputs)
});
export { builderlanguagesectionbackend3 as "builderLanguageSectionBackend" }