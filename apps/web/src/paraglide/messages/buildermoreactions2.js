/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildermoreactions2Inputs */

const en_buildermoreactions2 = /** @type {(inputs: Buildermoreactions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`More actions`)
};

const es_buildermoreactions2 = /** @type {(inputs: Buildermoreactions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Más acciones`)
};

const zh_buildermoreactions2 = /** @type {(inputs: Buildermoreactions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更多操作`)
};

const ja_buildermoreactions2 = /** @type {(inputs: Buildermoreactions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`その他のアクション`)
};

const ko_buildermoreactions2 = /** @type {(inputs: Buildermoreactions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`추가 작업`)
};

const zh_hant1_buildermoreactions2 = /** @type {(inputs: Buildermoreactions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更多操作`)
};

const de_buildermoreactions2 = /** @type {(inputs: Buildermoreactions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Weitere Aktionen`)
};

const fr_buildermoreactions2 = /** @type {(inputs: Buildermoreactions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Plus d'actions`)
};

const uk_buildermoreactions2 = /** @type {(inputs: Buildermoreactions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Більше дій`)
};

/**
* | output |
* | --- |
* | "More actions" |
*
* @param {Buildermoreactions2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildermoreactions2 = /** @type {((inputs?: Buildermoreactions2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildermoreactions2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildermoreactions2(inputs)
	if (locale === "zh") return zh_buildermoreactions2(inputs)
	if (locale === "ja") return ja_buildermoreactions2(inputs)
	if (locale === "ko") return ko_buildermoreactions2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildermoreactions2(inputs)
	if (locale === "de") return de_buildermoreactions2(inputs)
	if (locale === "fr") return fr_buildermoreactions2(inputs)
	if (locale === "uk") return uk_buildermoreactions2(inputs)
	return en_buildermoreactions2(inputs)
});
export { buildermoreactions2 as "builderMoreActions" }