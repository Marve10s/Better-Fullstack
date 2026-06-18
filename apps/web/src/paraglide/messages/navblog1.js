/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navblog1Inputs */

const en_navblog1 = /** @type {(inputs: Navblog1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Blog`)
};

const es_navblog1 = /** @type {(inputs: Navblog1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Blog`)
};

const zh_navblog1 = /** @type {(inputs: Navblog1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`博客`)
};

const ja_navblog1 = /** @type {(inputs: Navblog1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ブログ`)
};

const ko_navblog1 = /** @type {(inputs: Navblog1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`블로그`)
};

const zh_hant1_navblog1 = /** @type {(inputs: Navblog1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`部落格`)
};

const de_navblog1 = /** @type {(inputs: Navblog1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Blog`)
};

const fr_navblog1 = /** @type {(inputs: Navblog1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Blogue`)
};

/**
* | output |
* | --- |
* | "Blog" |
*
* @param {Navblog1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const navblog1 = /** @type {((inputs?: Navblog1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navblog1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navblog1(inputs)
	if (locale === "es") return es_navblog1(inputs)
	if (locale === "zh") return zh_navblog1(inputs)
	if (locale === "ja") return ja_navblog1(inputs)
	if (locale === "ko") return ko_navblog1(inputs)
	if (locale === "zh-Hant") return zh_hant1_navblog1(inputs)
	if (locale === "de") return de_navblog1(inputs)
	return fr_navblog1(inputs)
});
export { navblog1 as "navBlog" }