/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogclose1Inputs */

const en_changelogclose1 = /** @type {(inputs: Changelogclose1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Close changelog`)
};

const es_changelogclose1 = /** @type {(inputs: Changelogclose1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cerrar changelog`)
};

const zh_changelogclose1 = /** @type {(inputs: Changelogclose1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关闭更新日志`)
};

/**
* | output |
* | --- |
* | "Close changelog" |
*
* @param {Changelogclose1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const changelogclose1 = /** @type {((inputs?: Changelogclose1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogclose1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changelogclose1(inputs)
	if (locale === "es") return es_changelogclose1(inputs)
	return zh_changelogclose1(inputs)
});
export { changelogclose1 as "changelogClose" }