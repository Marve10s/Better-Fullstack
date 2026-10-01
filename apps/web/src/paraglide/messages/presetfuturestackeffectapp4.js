/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presetfuturestackeffectapp4Inputs */

const en_presetfuturestackeffectapp4 = /** @type {(inputs: Presetfuturestackeffectapp4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`In the app`)
};

const es_presetfuturestackeffectapp4 = /** @type {(inputs: Presetfuturestackeffectapp4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`En la app`)
};

const zh_presetfuturestackeffectapp4 = /** @type {(inputs: Presetfuturestackeffectapp4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`应用内`)
};

const ja_presetfuturestackeffectapp4 = /** @type {(inputs: Presetfuturestackeffectapp4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`アプリ内`)
};

const ko_presetfuturestackeffectapp4 = /** @type {(inputs: Presetfuturestackeffectapp4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`앱 안에서`)
};

const zh_hant1_presetfuturestackeffectapp4 = /** @type {(inputs: Presetfuturestackeffectapp4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`應用程式內`)
};

const de_presetfuturestackeffectapp4 = /** @type {(inputs: Presetfuturestackeffectapp4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`In der App`)
};

const fr_presetfuturestackeffectapp4 = /** @type {(inputs: Presetfuturestackeffectapp4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dans l'application`)
};

const uk_presetfuturestackeffectapp4 = /** @type {(inputs: Presetfuturestackeffectapp4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`У застосунку`)
};

/**
* | output |
* | --- |
* | "In the app" |
*
* @param {Presetfuturestackeffectapp4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presetfuturestackeffectapp4 = /** @type {((inputs?: Presetfuturestackeffectapp4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetfuturestackeffectapp4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_presetfuturestackeffectapp4(inputs)
	if (locale === "zh") return zh_presetfuturestackeffectapp4(inputs)
	if (locale === "ja") return ja_presetfuturestackeffectapp4(inputs)
	if (locale === "ko") return ko_presetfuturestackeffectapp4(inputs)
	if (locale === "zh-Hant") return zh_hant1_presetfuturestackeffectapp4(inputs)
	if (locale === "de") return de_presetfuturestackeffectapp4(inputs)
	if (locale === "fr") return fr_presetfuturestackeffectapp4(inputs)
	if (locale === "uk") return uk_presetfuturestackeffectapp4(inputs)
	return en_presetfuturestackeffectapp4(inputs)
});
export { presetfuturestackeffectapp4 as "presetFutureStackEffectApp" }