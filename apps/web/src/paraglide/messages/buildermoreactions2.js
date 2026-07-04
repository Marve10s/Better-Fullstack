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
	return /** @type {LocalizedString} */ (`さらなるアクション`)
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
	return /** @type {LocalizedString} */ (`Plus de propositions`)
};

/**
* | output |
* | --- |
* | "More actions" |
*
* @param {Buildermoreactions2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const buildermoreactions2 = /** @type {((inputs?: Buildermoreactions2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildermoreactions2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildermoreactions2(inputs)
	if (locale === "es") return es_buildermoreactions2(inputs)
	if (locale === "zh") return zh_buildermoreactions2(inputs)
	if (locale === "ja") return ja_buildermoreactions2(inputs)
	if (locale === "ko") return ko_buildermoreactions2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildermoreactions2(inputs)
	if (locale === "de") return de_buildermoreactions2(inputs)
	return fr_buildermoreactions2(inputs)
});
export { buildermoreactions2 as "builderMoreActions" }