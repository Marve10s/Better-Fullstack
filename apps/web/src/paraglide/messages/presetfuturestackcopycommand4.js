/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presetfuturestackcopycommand4Inputs */

const en_presetfuturestackcopycommand4 = /** @type {(inputs: Presetfuturestackcopycommand4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copy command`)
};

const es_presetfuturestackcopycommand4 = /** @type {(inputs: Presetfuturestackcopycommand4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copiar comando`)
};

const zh_presetfuturestackcopycommand4 = /** @type {(inputs: Presetfuturestackcopycommand4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制命令`)
};

const ja_presetfuturestackcopycommand4 = /** @type {(inputs: Presetfuturestackcopycommand4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`コマンドをコピー`)
};

const ko_presetfuturestackcopycommand4 = /** @type {(inputs: Presetfuturestackcopycommand4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`명령 복사`)
};

const zh_hant1_presetfuturestackcopycommand4 = /** @type {(inputs: Presetfuturestackcopycommand4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`複製指令`)
};

const de_presetfuturestackcopycommand4 = /** @type {(inputs: Presetfuturestackcopycommand4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Befehl kopieren`)
};

const fr_presetfuturestackcopycommand4 = /** @type {(inputs: Presetfuturestackcopycommand4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copier la commande`)
};

const uk_presetfuturestackcopycommand4 = /** @type {(inputs: Presetfuturestackcopycommand4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Копіювати команду`)
};

/**
* | output |
* | --- |
* | "Copy command" |
*
* @param {Presetfuturestackcopycommand4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presetfuturestackcopycommand4 = /** @type {((inputs?: Presetfuturestackcopycommand4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetfuturestackcopycommand4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_presetfuturestackcopycommand4(inputs)
	if (locale === "zh") return zh_presetfuturestackcopycommand4(inputs)
	if (locale === "ja") return ja_presetfuturestackcopycommand4(inputs)
	if (locale === "ko") return ko_presetfuturestackcopycommand4(inputs)
	if (locale === "zh-Hant") return zh_hant1_presetfuturestackcopycommand4(inputs)
	if (locale === "de") return de_presetfuturestackcopycommand4(inputs)
	if (locale === "fr") return fr_presetfuturestackcopycommand4(inputs)
	if (locale === "uk") return uk_presetfuturestackcopycommand4(inputs)
	return en_presetfuturestackcopycommand4(inputs)
});
export { presetfuturestackcopycommand4 as "presetFutureStackCopyCommand" }