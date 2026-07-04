/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runquickstarttitle2Inputs */

const en_runquickstarttitle2 = /** @type {(inputs: Runquickstarttitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Three steps`)
};

const es_runquickstarttitle2 = /** @type {(inputs: Runquickstarttitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tres pasos`)
};

const zh_runquickstarttitle2 = /** @type {(inputs: Runquickstarttitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`三步`)
};

const ja_runquickstarttitle2 = /** @type {(inputs: Runquickstarttitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`3つのステップ`)
};

const ko_runquickstarttitle2 = /** @type {(inputs: Runquickstarttitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`세 단계`)
};

const zh_hant1_runquickstarttitle2 = /** @type {(inputs: Runquickstarttitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`三步`)
};

const de_runquickstarttitle2 = /** @type {(inputs: Runquickstarttitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Drei Schritte`)
};

const fr_runquickstarttitle2 = /** @type {(inputs: Runquickstarttitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Trois étapes`)
};

const uk_runquickstarttitle2 = /** @type {(inputs: Runquickstarttitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Три кроки`)
};

/**
* | output |
* | --- |
* | "Three steps" |
*
* @param {Runquickstarttitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const runquickstarttitle2 = /** @type {((inputs?: Runquickstarttitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runquickstarttitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runquickstarttitle2(inputs)
	if (locale === "es") return es_runquickstarttitle2(inputs)
	if (locale === "zh") return zh_runquickstarttitle2(inputs)
	if (locale === "ja") return ja_runquickstarttitle2(inputs)
	if (locale === "ko") return ko_runquickstarttitle2(inputs)
	if (locale === "zh-Hant") return zh_hant1_runquickstarttitle2(inputs)
	if (locale === "de") return de_runquickstarttitle2(inputs)
	if (locale === "fr") return fr_runquickstarttitle2(inputs)
	return uk_runquickstarttitle2(inputs)
});
export { runquickstarttitle2 as "runQuickstartTitle" }