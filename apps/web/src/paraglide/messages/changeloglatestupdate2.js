/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changeloglatestupdate2Inputs */

const en_changeloglatestupdate2 = /** @type {(inputs: Changeloglatestupdate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Latest update`)
};

const es_changeloglatestupdate2 = /** @type {(inputs: Changeloglatestupdate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Última actualización`)
};

const zh_changeloglatestupdate2 = /** @type {(inputs: Changeloglatestupdate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新更新`)
};

/**
* | output |
* | --- |
* | "Latest update" |
*
* @param {Changeloglatestupdate2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const changeloglatestupdate2 = /** @type {((inputs?: Changeloglatestupdate2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changeloglatestupdate2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changeloglatestupdate2(inputs)
	if (locale === "es") return es_changeloglatestupdate2(inputs)
	return zh_changeloglatestupdate2(inputs)
});
export { changeloglatestupdate2 as "changelogLatestUpdate" }