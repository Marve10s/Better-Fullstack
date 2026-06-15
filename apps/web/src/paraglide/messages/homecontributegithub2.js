/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecontributegithub2Inputs */

const en_homecontributegithub2 = /** @type {(inputs: Homecontributegithub2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Contribute on GitHub`)
};

const es_homecontributegithub2 = /** @type {(inputs: Homecontributegithub2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Contribuir en GitHub`)
};

const zh_homecontributegithub2 = /** @type {(inputs: Homecontributegithub2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在 GitHub 贡献`)
};

/**
* | output |
* | --- |
* | "Contribute on GitHub" |
*
* @param {Homecontributegithub2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homecontributegithub2 = /** @type {((inputs?: Homecontributegithub2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecontributegithub2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homecontributegithub2(inputs)
	if (locale === "es") return es_homecontributegithub2(inputs)
	return zh_homecontributegithub2(inputs)
});
export { homecontributegithub2 as "homeContributeGithub" }