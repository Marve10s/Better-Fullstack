/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footerbuiltby2Inputs */

const en_footerbuiltby2 = /** @type {(inputs: Footerbuiltby2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Built by`)
};

const es_footerbuiltby2 = /** @type {(inputs: Footerbuiltby2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Construido por`)
};

const zh_footerbuiltby2 = /** @type {(inputs: Footerbuiltby2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`构建者`)
};

/**
* | output |
* | --- |
* | "Built by" |
*
* @param {Footerbuiltby2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const footerbuiltby2 = /** @type {((inputs?: Footerbuiltby2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footerbuiltby2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_footerbuiltby2(inputs)
	if (locale === "es") return es_footerbuiltby2(inputs)
	return zh_footerbuiltby2(inputs)
});
export { footerbuiltby2 as "footerBuiltBy" }