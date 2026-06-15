/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navcopy1Inputs */

const en_navcopy1 = /** @type {(inputs: Navcopy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copy`)
};

const es_navcopy1 = /** @type {(inputs: Navcopy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copiar`)
};

const zh_navcopy1 = /** @type {(inputs: Navcopy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制`)
};

/**
* | output |
* | --- |
* | "Copy" |
*
* @param {Navcopy1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const navcopy1 = /** @type {((inputs?: Navcopy1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navcopy1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navcopy1(inputs)
	if (locale === "es") return es_navcopy1(inputs)
	return zh_navcopy1(inputs)
});
export { navcopy1 as "navCopy" }