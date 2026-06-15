/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ecosystem: NonNullable<unknown> }} Builderauthgroup2Inputs */

const en_builderauthgroup2 = /** @type {(inputs: Builderauthgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} Auth`)
};

const es_builderauthgroup2 = /** @type {(inputs: Builderauthgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Auth ${i?.ecosystem}`)
};

const zh_builderauthgroup2 = /** @type {(inputs: Builderauthgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} 认证`)
};

/**
* | output |
* | --- |
* | "{ecosystem} Auth" |
*
* @param {Builderauthgroup2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderauthgroup2 = /** @type {((inputs: Builderauthgroup2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderauthgroup2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderauthgroup2(inputs)
	if (locale === "es") return es_builderauthgroup2(inputs)
	return zh_builderauthgroup2(inputs)
});
export { builderauthgroup2 as "builderAuthGroup" }