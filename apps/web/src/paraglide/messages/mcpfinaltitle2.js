/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpfinaltitle2Inputs */

const en_mcpfinaltitle2 = /** @type {(inputs: Mcpfinaltitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`2.6× faster than`)
};

const es_mcpfinaltitle2 = /** @type {(inputs: Mcpfinaltitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`2.6× más rápido que`)
};

const zh_mcpfinaltitle2 = /** @type {(inputs: Mcpfinaltitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`比`)
};

const ja_mcpfinaltitle2 = /** @type {(inputs: Mcpfinaltitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`2.6 倍高速`)
};

const ko_mcpfinaltitle2 = /** @type {(inputs: Mcpfinaltitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`2.6배 더 빠르다`)
};

const zh_hant1_mcpfinaltitle2 = /** @type {(inputs: Mcpfinaltitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`比`)
};

const de_mcpfinaltitle2 = /** @type {(inputs: Mcpfinaltitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`2,6× schneller als`)
};

const fr_mcpfinaltitle2 = /** @type {(inputs: Mcpfinaltitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`2,6 fois plus rapide que`)
};

/**
* | output |
* | --- |
* | "2.6× faster than" |
*
* @param {Mcpfinaltitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcpfinaltitle2 = /** @type {((inputs?: Mcpfinaltitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpfinaltitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpfinaltitle2(inputs)
	if (locale === "es") return es_mcpfinaltitle2(inputs)
	if (locale === "zh") return zh_mcpfinaltitle2(inputs)
	if (locale === "ja") return ja_mcpfinaltitle2(inputs)
	if (locale === "ko") return ko_mcpfinaltitle2(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpfinaltitle2(inputs)
	if (locale === "de") return de_mcpfinaltitle2(inputs)
	return fr_mcpfinaltitle2(inputs)
});
export { mcpfinaltitle2 as "mcpFinalTitle" }