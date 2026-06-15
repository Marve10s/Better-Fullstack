/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changeloglatest1Inputs */

const en_changeloglatest1 = /** @type {(inputs: Changeloglatest1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Latest`)
};

const es_changeloglatest1 = /** @type {(inputs: Changeloglatest1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Última`)
};

const zh_changeloglatest1 = /** @type {(inputs: Changeloglatest1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新`)
};

/**
* | output |
* | --- |
* | "Latest" |
*
* @param {Changeloglatest1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const changeloglatest1 = /** @type {((inputs?: Changeloglatest1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changeloglatest1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changeloglatest1(inputs)
	if (locale === "es") return es_changeloglatest1(inputs)
	return zh_changeloglatest1(inputs)
});
export { changeloglatest1 as "changelogLatest" }