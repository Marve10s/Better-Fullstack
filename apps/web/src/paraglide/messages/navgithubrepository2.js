/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navgithubrepository2Inputs */

const en_navgithubrepository2 = /** @type {(inputs: Navgithubrepository2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`GitHub repository`)
};

const es_navgithubrepository2 = /** @type {(inputs: Navgithubrepository2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Repositorio de GitHub`)
};

const zh_navgithubrepository2 = /** @type {(inputs: Navgithubrepository2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`GitHub 仓库`)
};

/**
* | output |
* | --- |
* | "GitHub repository" |
*
* @param {Navgithubrepository2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const navgithubrepository2 = /** @type {((inputs?: Navgithubrepository2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navgithubrepository2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navgithubrepository2(inputs)
	if (locale === "es") return es_navgithubrepository2(inputs)
	return zh_navgithubrepository2(inputs)
});
export { navgithubrepository2 as "navGithubRepository" }