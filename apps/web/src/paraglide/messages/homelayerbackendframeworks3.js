/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homelayerbackendframeworks3Inputs */

const en_homelayerbackendframeworks3 = /** @type {(inputs: Homelayerbackendframeworks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`BACKEND FRAMEWORKS`)
};

const es_homelayerbackendframeworks3 = /** @type {(inputs: Homelayerbackendframeworks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`FRAMEWORKS BACKEND`)
};

const zh_homelayerbackendframeworks3 = /** @type {(inputs: Homelayerbackendframeworks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`后端框架`)
};

const ja_homelayerbackendframeworks3 = /** @type {(inputs: Homelayerbackendframeworks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`バックエンドフレームワーク`)
};

const ko_homelayerbackendframeworks3 = /** @type {(inputs: Homelayerbackendframeworks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`백엔드 프레임워크`)
};

const zh_hant1_homelayerbackendframeworks3 = /** @type {(inputs: Homelayerbackendframeworks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`後端框架`)
};

const de_homelayerbackendframeworks3 = /** @type {(inputs: Homelayerbackendframeworks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`BACKEND-FRAMEWORKS`)
};

const fr_homelayerbackendframeworks3 = /** @type {(inputs: Homelayerbackendframeworks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`CADRES BACKEND`)
};

const uk_homelayerbackendframeworks3 = /** @type {(inputs: Homelayerbackendframeworks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`БЕКЕНД ФРЕЙМВОРКИ`)
};

/**
* | output |
* | --- |
* | "BACKEND FRAMEWORKS" |
*
* @param {Homelayerbackendframeworks3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homelayerbackendframeworks3 = /** @type {((inputs?: Homelayerbackendframeworks3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homelayerbackendframeworks3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homelayerbackendframeworks3(inputs)
	if (locale === "es") return es_homelayerbackendframeworks3(inputs)
	if (locale === "zh") return zh_homelayerbackendframeworks3(inputs)
	if (locale === "ja") return ja_homelayerbackendframeworks3(inputs)
	if (locale === "ko") return ko_homelayerbackendframeworks3(inputs)
	if (locale === "zh-Hant") return zh_hant1_homelayerbackendframeworks3(inputs)
	if (locale === "de") return de_homelayerbackendframeworks3(inputs)
	if (locale === "fr") return fr_homelayerbackendframeworks3(inputs)
	return uk_homelayerbackendframeworks3(inputs)
});
export { homelayerbackendframeworks3 as "homeLayerBackendFrameworks" }