/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclimultiple2Inputs */

const en_docsclimultiple2 = /** @type {(inputs: Docsclimultiple2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`multiple`)
};

const es_docsclimultiple2 = /** @type {(inputs: Docsclimultiple2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`varios valores`)
};

const zh_docsclimultiple2 = /** @type {(inputs: Docsclimultiple2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可接受多个值`)
};

const ja_docsclimultiple2 = /** @type {(inputs: Docsclimultiple2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`複数指定可`)
};

const ko_docsclimultiple2 = /** @type {(inputs: Docsclimultiple2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`여러 값 허용`)
};

const zh_hant1_docsclimultiple2 = /** @type {(inputs: Docsclimultiple2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可接受多個值`)
};

const de_docsclimultiple2 = /** @type {(inputs: Docsclimultiple2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`mehrere Werte`)
};

const fr_docsclimultiple2 = /** @type {(inputs: Docsclimultiple2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`plusieurs valeurs`)
};

const uk_docsclimultiple2 = /** @type {(inputs: Docsclimultiple2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`кілька значень`)
};

/**
* | output |
* | --- |
* | "multiple" |
*
* @param {Docsclimultiple2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclimultiple2 = /** @type {((inputs?: Docsclimultiple2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclimultiple2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclimultiple2(inputs)
	if (locale === "zh") return zh_docsclimultiple2(inputs)
	if (locale === "ja") return ja_docsclimultiple2(inputs)
	if (locale === "ko") return ko_docsclimultiple2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclimultiple2(inputs)
	if (locale === "de") return de_docsclimultiple2(inputs)
	if (locale === "fr") return fr_docsclimultiple2(inputs)
	if (locale === "uk") return uk_docsclimultiple2(inputs)
	return en_docsclimultiple2(inputs)
});
export { docsclimultiple2 as "docsCliMultiple" }