/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ecosystem: NonNullable<unknown> }} Builderbackendgroup2Inputs */

const en_builderbackendgroup2 = /** @type {(inputs: Builderbackendgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} Backend`)
};

const es_builderbackendgroup2 = /** @type {(inputs: Builderbackendgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Backend ${i?.ecosystem}`)
};

const zh_builderbackendgroup2 = /** @type {(inputs: Builderbackendgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} 后端`)
};

/**
* | output |
* | --- |
* | "{ecosystem} Backend" |
*
* @param {Builderbackendgroup2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderbackendgroup2 = /** @type {((inputs: Builderbackendgroup2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderbackendgroup2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderbackendgroup2(inputs)
	if (locale === "es") return es_builderbackendgroup2(inputs)
	return zh_builderbackendgroup2(inputs)
});
export { builderbackendgroup2 as "builderBackendGroup" }