/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildernewbadge2Inputs */

const en_buildernewbadge2 = /** @type {(inputs: Buildernewbadge2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`New`)
};

const es_buildernewbadge2 = /** @type {(inputs: Buildernewbadge2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nuevo`)
};

const zh_buildernewbadge2 = /** @type {(inputs: Buildernewbadge2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`新`)
};

const ja_buildernewbadge2 = /** @type {(inputs: Buildernewbadge2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`New`)
};

const ko_buildernewbadge2 = /** @type {(inputs: Buildernewbadge2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`New`)
};

const zh_hant1_buildernewbadge2 = /** @type {(inputs: Buildernewbadge2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`新`)
};

const de_buildernewbadge2 = /** @type {(inputs: Buildernewbadge2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Neu`)
};

const fr_buildernewbadge2 = /** @type {(inputs: Buildernewbadge2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nouveau`)
};

const uk_buildernewbadge2 = /** @type {(inputs: Buildernewbadge2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Нове`)
};

/**
* | output |
* | --- |
* | "New" |
*
* @param {Buildernewbadge2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildernewbadge2 = /** @type {((inputs?: Buildernewbadge2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildernewbadge2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildernewbadge2(inputs)
	if (locale === "zh") return zh_buildernewbadge2(inputs)
	if (locale === "ja") return ja_buildernewbadge2(inputs)
	if (locale === "ko") return ko_buildernewbadge2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildernewbadge2(inputs)
	if (locale === "de") return de_buildernewbadge2(inputs)
	if (locale === "fr") return fr_buildernewbadge2(inputs)
	if (locale === "uk") return uk_buildernewbadge2(inputs)
	return en_buildernewbadge2(inputs)
});
export { buildernewbadge2 as "builderNewBadge" }