/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildermobileapp2Inputs */

const en_buildermobileapp2 = /** @type {(inputs: Buildermobileapp2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mobile App`)
};

const es_buildermobileapp2 = /** @type {(inputs: Buildermobileapp2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`App móvil`)
};

const zh_buildermobileapp2 = /** @type {(inputs: Buildermobileapp2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`移动应用`)
};

const ja_buildermobileapp2 = /** @type {(inputs: Buildermobileapp2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`モバイルアプリ`)
};

const ko_buildermobileapp2 = /** @type {(inputs: Buildermobileapp2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`모바일 앱`)
};

const zh_hant1_buildermobileapp2 = /** @type {(inputs: Buildermobileapp2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`行動應用`)
};

const de_buildermobileapp2 = /** @type {(inputs: Buildermobileapp2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mobile App`)
};

const fr_buildermobileapp2 = /** @type {(inputs: Buildermobileapp2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Application mobile`)
};

/**
* | output |
* | --- |
* | "Mobile App" |
*
* @param {Buildermobileapp2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const buildermobileapp2 = /** @type {((inputs?: Buildermobileapp2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildermobileapp2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildermobileapp2(inputs)
	if (locale === "es") return es_buildermobileapp2(inputs)
	if (locale === "zh") return zh_buildermobileapp2(inputs)
	if (locale === "ja") return ja_buildermobileapp2(inputs)
	if (locale === "ko") return ko_buildermobileapp2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildermobileapp2(inputs)
	if (locale === "de") return de_buildermobileapp2(inputs)
	return fr_buildermobileapp2(inputs)
});
export { buildermobileapp2 as "builderMobileApp" }