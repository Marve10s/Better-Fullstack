/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssearchretry2Inputs */

const en_docssearchretry2 = /** @type {(inputs: Docssearchretry2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Try again`)
};

const es_docssearchretry2 = /** @type {(inputs: Docssearchretry2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Intentar de nuevo`)
};

const zh_docssearchretry2 = /** @type {(inputs: Docssearchretry2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重试`)
};

const ja_docssearchretry2 = /** @type {(inputs: Docssearchretry2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`再試行`)
};

const ko_docssearchretry2 = /** @type {(inputs: Docssearchretry2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`다시 시도`)
};

const zh_hant1_docssearchretry2 = /** @type {(inputs: Docssearchretry2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重試`)
};

const de_docssearchretry2 = /** @type {(inputs: Docssearchretry2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Erneut versuchen`)
};

const fr_docssearchretry2 = /** @type {(inputs: Docssearchretry2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Réessayer`)
};

const uk_docssearchretry2 = /** @type {(inputs: Docssearchretry2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Спробувати ще раз`)
};

/**
* | output |
* | --- |
* | "Try again" |
*
* @param {Docssearchretry2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docssearchretry2 = /** @type {((inputs?: Docssearchretry2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssearchretry2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docssearchretry2(inputs)
	if (locale === "zh") return zh_docssearchretry2(inputs)
	if (locale === "ja") return ja_docssearchretry2(inputs)
	if (locale === "ko") return ko_docssearchretry2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docssearchretry2(inputs)
	if (locale === "de") return de_docssearchretry2(inputs)
	if (locale === "fr") return fr_docssearchretry2(inputs)
	if (locale === "uk") return uk_docssearchretry2(inputs)
	return en_docssearchretry2(inputs)
});
export { docssearchretry2 as "docsSearchRetry" }