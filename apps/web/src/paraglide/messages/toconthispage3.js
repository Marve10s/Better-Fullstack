/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Toconthispage3Inputs */

const en_toconthispage3 = /** @type {(inputs: Toconthispage3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`On this page`)
};

const es_toconthispage3 = /** @type {(inputs: Toconthispage3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`En esta página`)
};

const zh_toconthispage3 = /** @type {(inputs: Toconthispage3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`本页内容`)
};

const ja_toconthispage3 = /** @type {(inputs: Toconthispage3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`このページでは`)
};

const ko_toconthispage3 = /** @type {(inputs: Toconthispage3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이 페이지에서`)
};

const zh_hant1_toconthispage3 = /** @type {(inputs: Toconthispage3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`本頁內容`)
};

const de_toconthispage3 = /** @type {(inputs: Toconthispage3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Auf dieser Seite`)
};

const fr_toconthispage3 = /** @type {(inputs: Toconthispage3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sur cette page`)
};

/**
* | output |
* | --- |
* | "On this page" |
*
* @param {Toconthispage3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const toconthispage3 = /** @type {((inputs?: Toconthispage3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Toconthispage3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_toconthispage3(inputs)
	if (locale === "es") return es_toconthispage3(inputs)
	if (locale === "zh") return zh_toconthispage3(inputs)
	if (locale === "ja") return ja_toconthispage3(inputs)
	if (locale === "ko") return ko_toconthispage3(inputs)
	if (locale === "zh-Hant") return zh_hant1_toconthispage3(inputs)
	if (locale === "de") return de_toconthispage3(inputs)
	return fr_toconthispage3(inputs)
});
export { toconthispage3 as "tocOnThisPage" }