/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunclearlogs3Inputs */

const en_builderrunclearlogs3 = /** @type {(inputs: Builderrunclearlogs3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Clear`)
};

const es_builderrunclearlogs3 = /** @type {(inputs: Builderrunclearlogs3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Limpiar`)
};

const zh_builderrunclearlogs3 = /** @type {(inputs: Builderrunclearlogs3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`清除`)
};

const ja_builderrunclearlogs3 = /** @type {(inputs: Builderrunclearlogs3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`クリア`)
};

const ko_builderrunclearlogs3 = /** @type {(inputs: Builderrunclearlogs3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`지우기`)
};

const zh_hant1_builderrunclearlogs3 = /** @type {(inputs: Builderrunclearlogs3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`清除`)
};

const de_builderrunclearlogs3 = /** @type {(inputs: Builderrunclearlogs3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Leeren`)
};

const fr_builderrunclearlogs3 = /** @type {(inputs: Builderrunclearlogs3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Effacer`)
};

const uk_builderrunclearlogs3 = /** @type {(inputs: Builderrunclearlogs3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Очистити`)
};

/**
* | output |
* | --- |
* | "Clear" |
*
* @param {Builderrunclearlogs3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunclearlogs3 = /** @type {((inputs?: Builderrunclearlogs3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunclearlogs3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderrunclearlogs3(inputs)
	if (locale === "es") return es_builderrunclearlogs3(inputs)
	if (locale === "zh") return zh_builderrunclearlogs3(inputs)
	if (locale === "ja") return ja_builderrunclearlogs3(inputs)
	if (locale === "ko") return ko_builderrunclearlogs3(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrunclearlogs3(inputs)
	if (locale === "de") return de_builderrunclearlogs3(inputs)
	if (locale === "fr") return fr_builderrunclearlogs3(inputs)
	return uk_builderrunclearlogs3(inputs)
});
export { builderrunclearlogs3 as "builderRunClearLogs" }