/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunstop2Inputs */

const en_builderrunstop2 = /** @type {(inputs: Builderrunstop2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stop`)
};

const es_builderrunstop2 = /** @type {(inputs: Builderrunstop2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Detener`)
};

const zh_builderrunstop2 = /** @type {(inputs: Builderrunstop2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`停止`)
};

const ja_builderrunstop2 = /** @type {(inputs: Builderrunstop2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`停止`)
};

const ko_builderrunstop2 = /** @type {(inputs: Builderrunstop2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`중지`)
};

const zh_hant1_builderrunstop2 = /** @type {(inputs: Builderrunstop2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`停止`)
};

const de_builderrunstop2 = /** @type {(inputs: Builderrunstop2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stoppen`)
};

const fr_builderrunstop2 = /** @type {(inputs: Builderrunstop2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Arrêter`)
};

const uk_builderrunstop2 = /** @type {(inputs: Builderrunstop2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Зупинити`)
};

/**
* | output |
* | --- |
* | "Stop" |
*
* @param {Builderrunstop2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunstop2 = /** @type {((inputs?: Builderrunstop2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunstop2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderrunstop2(inputs)
	if (locale === "es") return es_builderrunstop2(inputs)
	if (locale === "zh") return zh_builderrunstop2(inputs)
	if (locale === "ja") return ja_builderrunstop2(inputs)
	if (locale === "ko") return ko_builderrunstop2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrunstop2(inputs)
	if (locale === "de") return de_builderrunstop2(inputs)
	if (locale === "fr") return fr_builderrunstop2(inputs)
	return uk_builderrunstop2(inputs)
});
export { builderrunstop2 as "builderRunStop" }