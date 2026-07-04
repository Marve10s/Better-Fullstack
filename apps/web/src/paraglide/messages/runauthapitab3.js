/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runauthapitab3Inputs */

const en_runauthapitab3 = /** @type {(inputs: Runauthapitab3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`API key`)
};

const es_runauthapitab3 = /** @type {(inputs: Runauthapitab3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`clave API`)
};

const zh_runauthapitab3 = /** @type {(inputs: Runauthapitab3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`API密钥`)
};

const ja_runauthapitab3 = /** @type {(inputs: Runauthapitab3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`APIキー`)
};

const ko_runauthapitab3 = /** @type {(inputs: Runauthapitab3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`API 키`)
};

const zh_hant1_runauthapitab3 = /** @type {(inputs: Runauthapitab3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`API金鑰`)
};

const de_runauthapitab3 = /** @type {(inputs: Runauthapitab3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`API-Schlüssel`)
};

const fr_runauthapitab3 = /** @type {(inputs: Runauthapitab3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Clé API`)
};

/**
* | output |
* | --- |
* | "API key" |
*
* @param {Runauthapitab3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const runauthapitab3 = /** @type {((inputs?: Runauthapitab3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runauthapitab3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runauthapitab3(inputs)
	if (locale === "es") return es_runauthapitab3(inputs)
	if (locale === "zh") return zh_runauthapitab3(inputs)
	if (locale === "ja") return ja_runauthapitab3(inputs)
	if (locale === "ko") return ko_runauthapitab3(inputs)
	if (locale === "zh-Hant") return zh_hant1_runauthapitab3(inputs)
	if (locale === "de") return de_runauthapitab3(inputs)
	return fr_runauthapitab3(inputs)
});
export { runauthapitab3 as "runAuthApiTab" }