/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presetfuturestackeffectserver4Inputs */

const en_presetfuturestackeffectserver4 = /** @type {(inputs: Presetfuturestackeffectserver4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`On its own server`)
};

const es_presetfuturestackeffectserver4 = /** @type {(inputs: Presetfuturestackeffectserver4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`En su propio servidor`)
};

const zh_presetfuturestackeffectserver4 = /** @type {(inputs: Presetfuturestackeffectserver4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`独立服务器`)
};

const ja_presetfuturestackeffectserver4 = /** @type {(inputs: Presetfuturestackeffectserver4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`専用サーバー`)
};

const ko_presetfuturestackeffectserver4 = /** @type {(inputs: Presetfuturestackeffectserver4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`별도 서버에서`)
};

const zh_hant1_presetfuturestackeffectserver4 = /** @type {(inputs: Presetfuturestackeffectserver4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`獨立伺服器`)
};

const de_presetfuturestackeffectserver4 = /** @type {(inputs: Presetfuturestackeffectserver4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Auf eigenem Server`)
};

const fr_presetfuturestackeffectserver4 = /** @type {(inputs: Presetfuturestackeffectserver4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sur son propre serveur`)
};

const uk_presetfuturestackeffectserver4 = /** @type {(inputs: Presetfuturestackeffectserver4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`На окремому сервері`)
};

/**
* | output |
* | --- |
* | "On its own server" |
*
* @param {Presetfuturestackeffectserver4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presetfuturestackeffectserver4 = /** @type {((inputs?: Presetfuturestackeffectserver4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetfuturestackeffectserver4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_presetfuturestackeffectserver4(inputs)
	if (locale === "zh") return zh_presetfuturestackeffectserver4(inputs)
	if (locale === "ja") return ja_presetfuturestackeffectserver4(inputs)
	if (locale === "ko") return ko_presetfuturestackeffectserver4(inputs)
	if (locale === "zh-Hant") return zh_hant1_presetfuturestackeffectserver4(inputs)
	if (locale === "de") return de_presetfuturestackeffectserver4(inputs)
	if (locale === "fr") return fr_presetfuturestackeffectserver4(inputs)
	if (locale === "uk") return uk_presetfuturestackeffectserver4(inputs)
	return en_presetfuturestackeffectserver4(inputs)
});
export { presetfuturestackeffectserver4 as "presetFutureStackEffectServer" }