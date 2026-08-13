/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navskill1Inputs */

const en_navskill1 = /** @type {(inputs: Navskill1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Skill`)
};

const es_navskill1 = /** @type {(inputs: Navskill1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Skill`)
};

const zh_navskill1 = /** @type {(inputs: Navskill1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`技能`)
};

const ja_navskill1 = /** @type {(inputs: Navskill1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`スキル`)
};

const ko_navskill1 = /** @type {(inputs: Navskill1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Skill`)
};

const zh_hant1_navskill1 = /** @type {(inputs: Navskill1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`技能`)
};

const de_navskill1 = /** @type {(inputs: Navskill1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Skill`)
};

const fr_navskill1 = /** @type {(inputs: Navskill1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Skill`)
};

const uk_navskill1 = /** @type {(inputs: Navskill1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Skill`)
};

/**
* | output |
* | --- |
* | "Skill" |
*
* @param {Navskill1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navskill1 = /** @type {((inputs?: Navskill1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navskill1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_navskill1(inputs)
	if (locale === "zh") return zh_navskill1(inputs)
	if (locale === "ja") return ja_navskill1(inputs)
	if (locale === "ko") return ko_navskill1(inputs)
	if (locale === "zh-Hant") return zh_hant1_navskill1(inputs)
	if (locale === "de") return de_navskill1(inputs)
	if (locale === "fr") return fr_navskill1(inputs)
	if (locale === "uk") return uk_navskill1(inputs)
	return en_navskill1(inputs)
});
export { navskill1 as "navSkill" }