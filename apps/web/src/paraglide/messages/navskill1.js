/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navskill1Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Skill")
	if (locale === "zh") return /** @type {LocalizedString} */ ("技能")
	if (locale === "ja") return /** @type {LocalizedString} */ ("スキル")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Skill")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("技能")
	if (locale === "de") return /** @type {LocalizedString} */ ("Skill")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Skill")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Skill")
	return /** @type {LocalizedString} */ ("Skill")
});
export { navskill1 as "navSkill" }