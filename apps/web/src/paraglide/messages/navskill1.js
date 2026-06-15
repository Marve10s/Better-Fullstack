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

/**
* | output |
* | --- |
* | "Skill" |
*
* @param {Navskill1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const navskill1 = /** @type {((inputs?: Navskill1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navskill1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navskill1(inputs)
	if (locale === "es") return es_navskill1(inputs)
	return zh_navskill1(inputs)
});
export { navskill1 as "navSkill" }