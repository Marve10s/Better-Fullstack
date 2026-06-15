/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Comparetargetcount2Inputs */

const en_comparetargetcount2 = /** @type {(inputs: Comparetargetcount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} targets`)
};

const es_comparetargetcount2 = /** @type {(inputs: Comparetargetcount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} destinos`)
};

const zh_comparetargetcount2 = /** @type {(inputs: Comparetargetcount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 个目标`)
};

/**
* | output |
* | --- |
* | "{count} targets" |
*
* @param {Comparetargetcount2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const comparetargetcount2 = /** @type {((inputs: Comparetargetcount2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparetargetcount2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparetargetcount2(inputs)
	if (locale === "es") return es_comparetargetcount2(inputs)
	return zh_comparetargetcount2(inputs)
});
export { comparetargetcount2 as "compareTargetCount" }