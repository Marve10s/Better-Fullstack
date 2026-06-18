/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeopenbuilder2Inputs */

const en_homeopenbuilder2 = /** @type {(inputs: Homeopenbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open the builder`)
};

const es_homeopenbuilder2 = /** @type {(inputs: Homeopenbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abrir el constructor`)
};

const zh_homeopenbuilder2 = /** @type {(inputs: Homeopenbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打开构建器`)
};

const ja_homeopenbuilder2 = /** @type {(inputs: Homeopenbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ビルダーを開く`)
};

const ko_homeopenbuilder2 = /** @type {(inputs: Homeopenbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`빌더 열기`)
};

const zh_hant1_homeopenbuilder2 = /** @type {(inputs: Homeopenbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打開建構器`)
};

const de_homeopenbuilder2 = /** @type {(inputs: Homeopenbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Öffnen Sie den Builder`)
};

const fr_homeopenbuilder2 = /** @type {(inputs: Homeopenbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ouvrir le constructeur`)
};

/**
* | output |
* | --- |
* | "Open the builder" |
*
* @param {Homeopenbuilder2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homeopenbuilder2 = /** @type {((inputs?: Homeopenbuilder2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeopenbuilder2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homeopenbuilder2(inputs)
	if (locale === "es") return es_homeopenbuilder2(inputs)
	if (locale === "zh") return zh_homeopenbuilder2(inputs)
	if (locale === "ja") return ja_homeopenbuilder2(inputs)
	if (locale === "ko") return ko_homeopenbuilder2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homeopenbuilder2(inputs)
	if (locale === "de") return de_homeopenbuilder2(inputs)
	return fr_homeopenbuilder2(inputs)
});
export { homeopenbuilder2 as "homeOpenBuilder" }