/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Stackdependencies1Inputs */

const en_stackdependencies1 = /** @type {(inputs: Stackdependencies1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dependencies`)
};

const es_stackdependencies1 = /** @type {(inputs: Stackdependencies1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dependencias`)
};

const zh_stackdependencies1 = /** @type {(inputs: Stackdependencies1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`依赖`)
};

/**
* | output |
* | --- |
* | "Dependencies" |
*
* @param {Stackdependencies1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const stackdependencies1 = /** @type {((inputs?: Stackdependencies1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Stackdependencies1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_stackdependencies1(inputs)
	if (locale === "es") return es_stackdependencies1(inputs)
	return zh_stackdependencies1(inputs)
});
export { stackdependencies1 as "stackDependencies" }