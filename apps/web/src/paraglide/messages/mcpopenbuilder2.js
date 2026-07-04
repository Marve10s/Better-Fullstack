/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpopenbuilder2Inputs */

const en_mcpopenbuilder2 = /** @type {(inputs: Mcpopenbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open builder`)
};

const es_mcpopenbuilder2 = /** @type {(inputs: Mcpopenbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abrir constructor`)
};

const zh_mcpopenbuilder2 = /** @type {(inputs: Mcpopenbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打开构建器`)
};

const ja_mcpopenbuilder2 = /** @type {(inputs: Mcpopenbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`オープンビルダー`)
};

const ko_mcpopenbuilder2 = /** @type {(inputs: Mcpopenbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`빌더 열기`)
};

const zh_hant1_mcpopenbuilder2 = /** @type {(inputs: Mcpopenbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打開建構器`)
};

const de_mcpopenbuilder2 = /** @type {(inputs: Mcpopenbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Öffnen Sie den Builder`)
};

const fr_mcpopenbuilder2 = /** @type {(inputs: Mcpopenbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Constructeur ouvert`)
};

/**
* | output |
* | --- |
* | "Open builder" |
*
* @param {Mcpopenbuilder2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcpopenbuilder2 = /** @type {((inputs?: Mcpopenbuilder2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpopenbuilder2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpopenbuilder2(inputs)
	if (locale === "es") return es_mcpopenbuilder2(inputs)
	if (locale === "zh") return zh_mcpopenbuilder2(inputs)
	if (locale === "ja") return ja_mcpopenbuilder2(inputs)
	if (locale === "ko") return ko_mcpopenbuilder2(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpopenbuilder2(inputs)
	if (locale === "de") return de_mcpopenbuilder2(inputs)
	return fr_mcpopenbuilder2(inputs)
});
export { mcpopenbuilder2 as "mcpOpenBuilder" }