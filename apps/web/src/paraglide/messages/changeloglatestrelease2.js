/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changeloglatestrelease2Inputs */

const en_changeloglatestrelease2 = /** @type {(inputs: Changeloglatestrelease2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Latest release`)
};

const es_changeloglatestrelease2 = /** @type {(inputs: Changeloglatestrelease2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Última versión`)
};

const zh_changeloglatestrelease2 = /** @type {(inputs: Changeloglatestrelease2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新版本`)
};

/**
* | output |
* | --- |
* | "Latest release" |
*
* @param {Changeloglatestrelease2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const changeloglatestrelease2 = /** @type {((inputs?: Changeloglatestrelease2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changeloglatestrelease2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changeloglatestrelease2(inputs)
	if (locale === "es") return es_changeloglatestrelease2(inputs)
	return zh_changeloglatestrelease2(inputs)
});
export { changeloglatestrelease2 as "changelogLatestRelease" }