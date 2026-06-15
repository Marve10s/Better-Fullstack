/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homefactecosystems2Inputs */

const en_homefactecosystems2 = /** @type {(inputs: Homefactecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Across TypeScript, React Native, Rust, Python, Go, and Java`)
};

const es_homefactecosystems2 = /** @type {(inputs: Homefactecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`En TypeScript, React Native, Rust, Python, Go y Java`)
};

const zh_homefactecosystems2 = /** @type {(inputs: Homefactecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`覆盖 TypeScript、React Native、Rust、Python、Go 和 Java`)
};

/**
* | output |
* | --- |
* | "Across TypeScript, React Native, Rust, Python, Go, and Java" |
*
* @param {Homefactecosystems2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homefactecosystems2 = /** @type {((inputs?: Homefactecosystems2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homefactecosystems2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homefactecosystems2(inputs)
	if (locale === "es") return es_homefactecosystems2(inputs)
	return zh_homefactecosystems2(inputs)
});
export { homefactecosystems2 as "homeFactEcosystems" }