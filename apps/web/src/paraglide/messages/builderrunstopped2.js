/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunstopped2Inputs */

const en_builderrunstopped2 = /** @type {(inputs: Builderrunstopped2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Runtime stopped`)
};

const es_builderrunstopped2 = /** @type {(inputs: Builderrunstopped2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Entorno detenido`)
};

const zh_builderrunstopped2 = /** @type {(inputs: Builderrunstopped2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`运行时已停止`)
};

const ja_builderrunstopped2 = /** @type {(inputs: Builderrunstopped2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ランタイムを停止しました`)
};

const ko_builderrunstopped2 = /** @type {(inputs: Builderrunstopped2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`런타임 중지됨`)
};

const zh_hant1_builderrunstopped2 = /** @type {(inputs: Builderrunstopped2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`執行階段已停止`)
};

const de_builderrunstopped2 = /** @type {(inputs: Builderrunstopped2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Laufzeit gestoppt`)
};

const fr_builderrunstopped2 = /** @type {(inputs: Builderrunstopped2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Environnement arrêté`)
};

const uk_builderrunstopped2 = /** @type {(inputs: Builderrunstopped2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Середовище зупинено`)
};

/**
* | output |
* | --- |
* | "Runtime stopped" |
*
* @param {Builderrunstopped2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunstopped2 = /** @type {((inputs?: Builderrunstopped2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunstopped2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_builderrunstopped2(inputs)
	if (locale === "zh") return zh_builderrunstopped2(inputs)
	if (locale === "ja") return ja_builderrunstopped2(inputs)
	if (locale === "ko") return ko_builderrunstopped2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrunstopped2(inputs)
	if (locale === "de") return de_builderrunstopped2(inputs)
	if (locale === "fr") return fr_builderrunstopped2(inputs)
	if (locale === "uk") return uk_builderrunstopped2(inputs)
	return en_builderrunstopped2(inputs)
});
export { builderrunstopped2 as "builderRunStopped" }