/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navcopy1Inputs */

const en_navcopy1 = /** @type {(inputs: Navcopy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copy`)
};

const es_navcopy1 = /** @type {(inputs: Navcopy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copiar`)
};

const zh_navcopy1 = /** @type {(inputs: Navcopy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制`)
};

const ja_navcopy1 = /** @type {(inputs: Navcopy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`コピー`)
};

const ko_navcopy1 = /** @type {(inputs: Navcopy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`복사`)
};

const zh_hant1_navcopy1 = /** @type {(inputs: Navcopy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`複製`)
};

const de_navcopy1 = /** @type {(inputs: Navcopy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kopieren`)
};

const fr_navcopy1 = /** @type {(inputs: Navcopy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copier`)
};

const uk_navcopy1 = /** @type {(inputs: Navcopy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Копіювати`)
};

/**
* | output |
* | --- |
* | "Copy" |
*
* @param {Navcopy1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navcopy1 = /** @type {((inputs?: Navcopy1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navcopy1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_navcopy1(inputs)
	if (locale === "zh") return zh_navcopy1(inputs)
	if (locale === "ja") return ja_navcopy1(inputs)
	if (locale === "ko") return ko_navcopy1(inputs)
	if (locale === "zh-Hant") return zh_hant1_navcopy1(inputs)
	if (locale === "de") return de_navcopy1(inputs)
	if (locale === "fr") return fr_navcopy1(inputs)
	if (locale === "uk") return uk_navcopy1(inputs)
	return en_navcopy1(inputs)
});
export { navcopy1 as "navCopy" }