/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogaria1Inputs */

const en_changelogaria1 = /** @type {(inputs: Changelogaria1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Changelog`)
};

const es_changelogaria1 = /** @type {(inputs: Changelogaria1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Changelog`)
};

const zh_changelogaria1 = /** @type {(inputs: Changelogaria1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更新日志`)
};

/**
* | output |
* | --- |
* | "Changelog" |
*
* @param {Changelogaria1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const changelogaria1 = /** @type {((inputs?: Changelogaria1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogaria1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changelogaria1(inputs)
	if (locale === "es") return es_changelogaria1(inputs)
	return zh_changelogaria1(inputs)
});
export { changelogaria1 as "changelogAria" }