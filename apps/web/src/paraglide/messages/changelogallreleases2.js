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

const ja_changelogallreleases2 = /** @type {(inputs: Changelogallreleases2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`すべてのリリース`)
};

const ko_changelogallreleases2 = /** @type {(inputs: Changelogallreleases2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`모든 릴리스`)
};

const zh_hant1_changelogallreleases2 = /** @type {(inputs: Changelogallreleases2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`所有版本`)
};

const de_changelogallreleases2 = /** @type {(inputs: Changelogallreleases2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Alle Veröffentlichungen`)
};

const fr_changelogallreleases2 = /** @type {(inputs: Changelogallreleases2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Toutes les versions`)
};

/**
* | output |
* | --- |
* | "All releases" |
*
* @param {Changelogallreleases2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const changelogallreleases2 = /** @type {((inputs?: Changelogallreleases2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogallreleases2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changelogallreleases2(inputs)
	if (locale === "es") return es_changelogallreleases2(inputs)
	if (locale === "zh") return zh_changelogallreleases2(inputs)
	if (locale === "ja") return ja_changelogallreleases2(inputs)
	if (locale === "ko") return ko_changelogallreleases2(inputs)
	if (locale === "zh-Hant") return zh_hant1_changelogallreleases2(inputs)
	if (locale === "de") return de_changelogallreleases2(inputs)
	return fr_changelogallreleases2(inputs)
});
export { changelogallreleases2 as "changelogAllReleases" }