/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Compareormcount2Inputs */

const en_compareormcount2 = /** @type {(inputs: Compareormcount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} ORMs`)
};

const es_compareormcount2 = /** @type {(inputs: Compareormcount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} ORMs`)
};

const zh_compareormcount2 = /** @type {(inputs: Compareormcount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 个 ORM`)
};

/**
* | output |
* | --- |
* | "{count} ORMs" |
*
* @param {Compareormcount2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const compareormcount2 = /** @type {((inputs: Compareormcount2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareormcount2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_compareormcount2(inputs)
	if (locale === "es") return es_compareormcount2(inputs)
	return zh_compareormcount2(inputs)
});
export { compareormcount2 as "compareOrmCount" }