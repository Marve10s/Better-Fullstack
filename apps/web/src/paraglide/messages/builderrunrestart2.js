/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunrestart2Inputs */

const en_builderrunrestart2 = /** @type {(inputs: Builderrunrestart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Restart`)
};

const es_builderrunrestart2 = /** @type {(inputs: Builderrunrestart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Reiniciar`)
};

const zh_builderrunrestart2 = /** @type {(inputs: Builderrunrestart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重新启动`)
};

const ja_builderrunrestart2 = /** @type {(inputs: Builderrunrestart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`再起動`)
};

const ko_builderrunrestart2 = /** @type {(inputs: Builderrunrestart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`다시 시작`)
};

const zh_hant1_builderrunrestart2 = /** @type {(inputs: Builderrunrestart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重新啟動`)
};

const de_builderrunrestart2 = /** @type {(inputs: Builderrunrestart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Neu starten`)
};

const fr_builderrunrestart2 = /** @type {(inputs: Builderrunrestart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Redémarrer`)
};

const uk_builderrunrestart2 = /** @type {(inputs: Builderrunrestart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Перезапустити`)
};

/**
* | output |
* | --- |
* | "Restart" |
*
* @param {Builderrunrestart2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunrestart2 = /** @type {((inputs?: Builderrunrestart2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunrestart2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderrunrestart2(inputs)
	if (locale === "es") return es_builderrunrestart2(inputs)
	if (locale === "zh") return zh_builderrunrestart2(inputs)
	if (locale === "ja") return ja_builderrunrestart2(inputs)
	if (locale === "ko") return ko_builderrunrestart2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrunrestart2(inputs)
	if (locale === "de") return de_builderrunrestart2(inputs)
	if (locale === "fr") return fr_builderrunrestart2(inputs)
	return uk_builderrunrestart2(inputs)
});
export { builderrunrestart2 as "builderRunRestart" }