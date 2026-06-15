/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ecosystem: NonNullable<unknown> }} Builderfrontendgroup2Inputs */

const en_builderfrontendgroup2 = /** @type {(inputs: Builderfrontendgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} Frontend`)
};

const es_builderfrontendgroup2 = /** @type {(inputs: Builderfrontendgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Frontend ${i?.ecosystem}`)
};

const zh_builderfrontendgroup2 = /** @type {(inputs: Builderfrontendgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} 前端`)
};

/**
* | output |
* | --- |
* | "{ecosystem} Frontend" |
*
* @param {Builderfrontendgroup2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderfrontendgroup2 = /** @type {((inputs: Builderfrontendgroup2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderfrontendgroup2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderfrontendgroup2(inputs)
	if (locale === "es") return es_builderfrontendgroup2(inputs)
	return zh_builderfrontendgroup2(inputs)
});
export { builderfrontendgroup2 as "builderFrontendGroup" }