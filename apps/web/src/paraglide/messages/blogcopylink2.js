/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Blogcopylink2Inputs */

const en_blogcopylink2 = /** @type {(inputs: Blogcopylink2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copy link`)
};

const es_blogcopylink2 = /** @type {(inputs: Blogcopylink2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copiar enlace`)
};

const zh_blogcopylink2 = /** @type {(inputs: Blogcopylink2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制链接`)
};

const ja_blogcopylink2 = /** @type {(inputs: Blogcopylink2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`リンクをコピー`)
};

const ko_blogcopylink2 = /** @type {(inputs: Blogcopylink2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`링크 복사`)
};

const zh_hant1_blogcopylink2 = /** @type {(inputs: Blogcopylink2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`複製連結`)
};

const de_blogcopylink2 = /** @type {(inputs: Blogcopylink2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Link kopieren`)
};

const fr_blogcopylink2 = /** @type {(inputs: Blogcopylink2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copier le lien`)
};

const uk_blogcopylink2 = /** @type {(inputs: Blogcopylink2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Копіювати посилання`)
};

/**
* | output |
* | --- |
* | "Copy link" |
*
* @param {Blogcopylink2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const blogcopylink2 = /** @type {((inputs?: Blogcopylink2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blogcopylink2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_blogcopylink2(inputs)
	if (locale === "es") return es_blogcopylink2(inputs)
	if (locale === "zh") return zh_blogcopylink2(inputs)
	if (locale === "ja") return ja_blogcopylink2(inputs)
	if (locale === "ko") return ko_blogcopylink2(inputs)
	if (locale === "zh-Hant") return zh_hant1_blogcopylink2(inputs)
	if (locale === "de") return de_blogcopylink2(inputs)
	if (locale === "fr") return fr_blogcopylink2(inputs)
	return uk_blogcopylink2(inputs)
});
export { blogcopylink2 as "blogCopyLink" }