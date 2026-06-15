/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footerchangelog1Inputs */

const en_footerchangelog1 = /** @type {(inputs: Footerchangelog1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Changelog`)
};

const es_footerchangelog1 = /** @type {(inputs: Footerchangelog1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Changelog`)
};

const zh_footerchangelog1 = /** @type {(inputs: Footerchangelog1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更新日志`)
};

/**
* | output |
* | --- |
* | "Changelog" |
*
* @param {Footerchangelog1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const footerchangelog1 = /** @type {((inputs?: Footerchangelog1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footerchangelog1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_footerchangelog1(inputs)
	if (locale === "es") return es_footerchangelog1(inputs)
	return zh_footerchangelog1(inputs)
});
export { footerchangelog1 as "footerChangelog" }