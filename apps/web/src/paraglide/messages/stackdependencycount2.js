/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Stackdependencycount2Inputs */

const en_stackdependencycount2 = /** @type {(inputs: Stackdependencycount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} dependencies`)
};

const es_stackdependencycount2 = /** @type {(inputs: Stackdependencycount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} dependencias`)
};

const zh_stackdependencycount2 = /** @type {(inputs: Stackdependencycount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 个依赖`)
};

/**
* | output |
* | --- |
* | "{count} dependencies" |
*
* @param {Stackdependencycount2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const stackdependencycount2 = /** @type {((inputs: Stackdependencycount2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Stackdependencycount2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_stackdependencycount2(inputs)
	if (locale === "es") return es_stackdependencycount2(inputs)
	return zh_stackdependencycount2(inputs)
});
export { stackdependencycount2 as "stackDependencyCount" }