/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navupdates1Inputs */

const en_navupdates1 = /** @type {(inputs: Navupdates1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Updates`)
};

const es_navupdates1 = /** @type {(inputs: Navupdates1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Novedades`)
};

const zh_navupdates1 = /** @type {(inputs: Navupdates1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更新`)
};

const ja_navupdates1 = /** @type {(inputs: Navupdates1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`アップデート`)
};

const ko_navupdates1 = /** @type {(inputs: Navupdates1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`업데이트`)
};

const zh_hant1_navupdates1 = /** @type {(inputs: Navupdates1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更新`)
};

const de_navupdates1 = /** @type {(inputs: Navupdates1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Updates`)
};

const fr_navupdates1 = /** @type {(inputs: Navupdates1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nouveautés`)
};

const uk_navupdates1 = /** @type {(inputs: Navupdates1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Оновлення`)
};

/**
* | output |
* | --- |
* | "Updates" |
*
* @param {Navupdates1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navupdates1 = /** @type {((inputs?: Navupdates1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navupdates1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navupdates1(inputs)
	if (locale === "es") return es_navupdates1(inputs)
	if (locale === "zh") return zh_navupdates1(inputs)
	if (locale === "ja") return ja_navupdates1(inputs)
	if (locale === "ko") return ko_navupdates1(inputs)
	if (locale === "zh-Hant") return zh_hant1_navupdates1(inputs)
	if (locale === "de") return de_navupdates1(inputs)
	if (locale === "fr") return fr_navupdates1(inputs)
	return uk_navupdates1(inputs)
});
export { navupdates1 as "navUpdates" }