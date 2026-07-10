/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Blograwmarkdown2Inputs */

const en_blograwmarkdown2 = /** @type {(inputs: Blograwmarkdown2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Markdown`)
};

const es_blograwmarkdown2 = /** @type {(inputs: Blograwmarkdown2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Markdown`)
};

const zh_blograwmarkdown2 = /** @type {(inputs: Blograwmarkdown2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Markdown`)
};

const ja_blograwmarkdown2 = /** @type {(inputs: Blograwmarkdown2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Markdown`)
};

const ko_blograwmarkdown2 = /** @type {(inputs: Blograwmarkdown2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Markdown`)
};

const zh_hant1_blograwmarkdown2 = /** @type {(inputs: Blograwmarkdown2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Markdown`)
};

const de_blograwmarkdown2 = /** @type {(inputs: Blograwmarkdown2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Markdown`)
};

const fr_blograwmarkdown2 = /** @type {(inputs: Blograwmarkdown2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Markdown`)
};

const uk_blograwmarkdown2 = /** @type {(inputs: Blograwmarkdown2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Markdown`)
};

/**
* | output |
* | --- |
* | "Markdown" |
*
* @param {Blograwmarkdown2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const blograwmarkdown2 = /** @type {((inputs?: Blograwmarkdown2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blograwmarkdown2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_blograwmarkdown2(inputs)
	if (locale === "es") return es_blograwmarkdown2(inputs)
	if (locale === "zh") return zh_blograwmarkdown2(inputs)
	if (locale === "ja") return ja_blograwmarkdown2(inputs)
	if (locale === "ko") return ko_blograwmarkdown2(inputs)
	if (locale === "zh-Hant") return zh_hant1_blograwmarkdown2(inputs)
	if (locale === "de") return de_blograwmarkdown2(inputs)
	if (locale === "fr") return fr_blograwmarkdown2(inputs)
	return uk_blograwmarkdown2(inputs)
});
export { blograwmarkdown2 as "blogRawMarkdown" }