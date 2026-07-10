/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Blogshareonx3Inputs */

const en_blogshareonx3 = /** @type {(inputs: Blogshareonx3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Share on X`)
};

const es_blogshareonx3 = /** @type {(inputs: Blogshareonx3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Compartir en X`)
};

const zh_blogshareonx3 = /** @type {(inputs: Blogshareonx3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`分享到 X`)
};

const ja_blogshareonx3 = /** @type {(inputs: Blogshareonx3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Xでシェア`)
};

const ko_blogshareonx3 = /** @type {(inputs: Blogshareonx3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`X에 공유`)
};

const zh_hant1_blogshareonx3 = /** @type {(inputs: Blogshareonx3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`分享到 X`)
};

const de_blogshareonx3 = /** @type {(inputs: Blogshareonx3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Auf X teilen`)
};

const fr_blogshareonx3 = /** @type {(inputs: Blogshareonx3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Partager sur X`)
};

const uk_blogshareonx3 = /** @type {(inputs: Blogshareonx3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Поділитися в X`)
};

/**
* | output |
* | --- |
* | "Share on X" |
*
* @param {Blogshareonx3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const blogshareonx3 = /** @type {((inputs?: Blogshareonx3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blogshareonx3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_blogshareonx3(inputs)
	if (locale === "es") return es_blogshareonx3(inputs)
	if (locale === "zh") return zh_blogshareonx3(inputs)
	if (locale === "ja") return ja_blogshareonx3(inputs)
	if (locale === "ko") return ko_blogshareonx3(inputs)
	if (locale === "zh-Hant") return zh_hant1_blogshareonx3(inputs)
	if (locale === "de") return de_blogshareonx3(inputs)
	if (locale === "fr") return fr_blogshareonx3(inputs)
	return uk_blogshareonx3(inputs)
});
export { blogshareonx3 as "blogShareOnX" }