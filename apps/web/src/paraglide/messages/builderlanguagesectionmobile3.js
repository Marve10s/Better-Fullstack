/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderlanguagesectionmobile3Inputs */

const en_builderlanguagesectionmobile3 = /** @type {(inputs: Builderlanguagesectionmobile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mobile`)
};

const es_builderlanguagesectionmobile3 = /** @type {(inputs: Builderlanguagesectionmobile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Móvil`)
};

const zh_builderlanguagesectionmobile3 = /** @type {(inputs: Builderlanguagesectionmobile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`移动端`)
};

const ja_builderlanguagesectionmobile3 = /** @type {(inputs: Builderlanguagesectionmobile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`モバイル`)
};

const ko_builderlanguagesectionmobile3 = /** @type {(inputs: Builderlanguagesectionmobile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`모바일`)
};

const zh_hant1_builderlanguagesectionmobile3 = /** @type {(inputs: Builderlanguagesectionmobile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`行動裝置`)
};

const de_builderlanguagesectionmobile3 = /** @type {(inputs: Builderlanguagesectionmobile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mobile`)
};

const fr_builderlanguagesectionmobile3 = /** @type {(inputs: Builderlanguagesectionmobile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mobile`)
};

const uk_builderlanguagesectionmobile3 = /** @type {(inputs: Builderlanguagesectionmobile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Мобільні`)
};

/**
* | output |
* | --- |
* | "Mobile" |
*
* @param {Builderlanguagesectionmobile3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderlanguagesectionmobile3 = /** @type {((inputs?: Builderlanguagesectionmobile3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderlanguagesectionmobile3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_builderlanguagesectionmobile3(inputs)
	if (locale === "zh") return zh_builderlanguagesectionmobile3(inputs)
	if (locale === "ja") return ja_builderlanguagesectionmobile3(inputs)
	if (locale === "ko") return ko_builderlanguagesectionmobile3(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderlanguagesectionmobile3(inputs)
	if (locale === "de") return de_builderlanguagesectionmobile3(inputs)
	if (locale === "fr") return fr_builderlanguagesectionmobile3(inputs)
	if (locale === "uk") return uk_builderlanguagesectionmobile3(inputs)
	return en_builderlanguagesectionmobile3(inputs)
});
export { builderlanguagesectionmobile3 as "builderLanguageSectionMobile" }