/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homestartshipping2Inputs */

const en_homestartshipping2 = /** @type {(inputs: Homestartshipping2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Start shipping.`)
};

const es_homestartshipping2 = /** @type {(inputs: Homestartshipping2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Empieza a lanzar.`)
};

const zh_homestartshipping2 = /** @type {(inputs: Homestartshipping2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`开始发布。`)
};

const ja_homestartshipping2 = /** @type {(inputs: Homestartshipping2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`さあ、出荷しよう。`)
};

const ko_homestartshipping2 = /** @type {(inputs: Homestartshipping2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`출시를 시작하세요.`)
};

const zh_hant1_homestartshipping2 = /** @type {(inputs: Homestartshipping2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`開始發布。`)
};

const de_homestartshipping2 = /** @type {(inputs: Homestartshipping2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Jetzt ausliefern.`)
};

const fr_homestartshipping2 = /** @type {(inputs: Homestartshipping2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Commencez à livrer.`)
};

const uk_homestartshipping2 = /** @type {(inputs: Homestartshipping2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`За секунди.`)
};

/**
* | output |
* | --- |
* | "Start shipping." |
*
* @param {Homestartshipping2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homestartshipping2 = /** @type {((inputs?: Homestartshipping2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homestartshipping2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_homestartshipping2(inputs)
	if (locale === "zh") return zh_homestartshipping2(inputs)
	if (locale === "ja") return ja_homestartshipping2(inputs)
	if (locale === "ko") return ko_homestartshipping2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homestartshipping2(inputs)
	if (locale === "de") return de_homestartshipping2(inputs)
	if (locale === "fr") return fr_homestartshipping2(inputs)
	if (locale === "uk") return uk_homestartshipping2(inputs)
	return en_homestartshipping2(inputs)
});
export { homestartshipping2 as "homeStartShipping" }