/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedduplicate1Inputs */

const en_savedduplicate1 = /** @type {(inputs: Savedduplicate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Duplicate`)
};

const es_savedduplicate1 = /** @type {(inputs: Savedduplicate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Duplicar`)
};

const zh_savedduplicate1 = /** @type {(inputs: Savedduplicate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制一份`)
};

/**
* | output |
* | --- |
* | "Duplicate" |
*
* @param {Savedduplicate1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const savedduplicate1 = /** @type {((inputs?: Savedduplicate1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedduplicate1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedduplicate1(inputs)
	if (locale === "es") return es_savedduplicate1(inputs)
	return zh_savedduplicate1(inputs)
});
export { savedduplicate1 as "savedDuplicate" }