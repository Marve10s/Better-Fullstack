/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogallreleases2Inputs */

const en_changelogallreleases2 = /** @type {(inputs: Changelogallreleases2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`All releases`)
};

const es_changelogallreleases2 = /** @type {(inputs: Changelogallreleases2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Todas las versiones`)
};

const zh_changelogallreleases2 = /** @type {(inputs: Changelogallreleases2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`所有版本`)
};

/**
* | output |
* | --- |
* | "All releases" |
*
* @param {Changelogallreleases2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const changelogallreleases2 = /** @type {((inputs?: Changelogallreleases2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogallreleases2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changelogallreleases2(inputs)
	if (locale === "es") return es_changelogallreleases2(inputs)
	return zh_changelogallreleases2(inputs)
});
export { changelogallreleases2 as "changelogAllReleases" }