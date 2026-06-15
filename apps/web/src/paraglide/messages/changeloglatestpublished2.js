/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ date: NonNullable<unknown> }} Changeloglatestpublished2Inputs */

const en_changeloglatestpublished2 = /** @type {(inputs: Changeloglatestpublished2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Latest release published ${i?.date}.`)
};

const es_changeloglatestpublished2 = /** @type {(inputs: Changeloglatestpublished2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Última versión publicada el ${i?.date}.`)
};

const zh_changeloglatestpublished2 = /** @type {(inputs: Changeloglatestpublished2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`最新版本发布于 ${i?.date}。`)
};

/**
* | output |
* | --- |
* | "Latest release published {date}." |
*
* @param {Changeloglatestpublished2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const changeloglatestpublished2 = /** @type {((inputs: Changeloglatestpublished2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changeloglatestpublished2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changeloglatestpublished2(inputs)
	if (locale === "es") return es_changeloglatestpublished2(inputs)
	return zh_changeloglatestpublished2(inputs)
});
export { changeloglatestpublished2 as "changelogLatestPublished" }