/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildergroupedaddons2Inputs */

const en_buildergroupedaddons2 = /** @type {(inputs: Buildergroupedaddons2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Grouped add-ons:`)
};

const es_buildergroupedaddons2 = /** @type {(inputs: Buildergroupedaddons2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add-ons agrupados:`)
};

const zh_buildergroupedaddons2 = /** @type {(inputs: Buildergroupedaddons2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`分组 add-ons：`)
};

const ja_buildergroupedaddons2 = /** @type {(inputs: Buildergroupedaddons2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`グループ化されたアドオン:`)
};

const ko_buildergroupedaddons2 = /** @type {(inputs: Buildergroupedaddons2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`그룹화된 추가 기능:`)
};

const zh_hant1_buildergroupedaddons2 = /** @type {(inputs: Buildergroupedaddons2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`分組 add-ons：`)
};

const de_buildergroupedaddons2 = /** @type {(inputs: Buildergroupedaddons2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gruppierte Add-ons:`)
};

const fr_buildergroupedaddons2 = /** @type {(inputs: Buildergroupedaddons2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Modules complémentaires groupés :`)
};

/**
* | output |
* | --- |
* | "Grouped add-ons:" |
*
* @param {Buildergroupedaddons2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const buildergroupedaddons2 = /** @type {((inputs?: Buildergroupedaddons2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildergroupedaddons2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildergroupedaddons2(inputs)
	if (locale === "es") return es_buildergroupedaddons2(inputs)
	if (locale === "zh") return zh_buildergroupedaddons2(inputs)
	if (locale === "ja") return ja_buildergroupedaddons2(inputs)
	if (locale === "ko") return ko_buildergroupedaddons2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildergroupedaddons2(inputs)
	if (locale === "de") return de_buildergroupedaddons2(inputs)
	return fr_buildergroupedaddons2(inputs)
});
export { buildergroupedaddons2 as "builderGroupedAddons" }