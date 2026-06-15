/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedviewfullstack3Inputs */

const en_savedviewfullstack3 = /** @type {(inputs: Savedviewfullstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`View Full Stack`)
};

const es_savedviewfullstack3 = /** @type {(inputs: Savedviewfullstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ver stack completo`)
};

const zh_savedviewfullstack3 = /** @type {(inputs: Savedviewfullstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`查看完整 Stack`)
};

/**
* | output |
* | --- |
* | "View Full Stack" |
*
* @param {Savedviewfullstack3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const savedviewfullstack3 = /** @type {((inputs?: Savedviewfullstack3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedviewfullstack3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedviewfullstack3(inputs)
	if (locale === "es") return es_savedviewfullstack3(inputs)
	return zh_savedviewfullstack3(inputs)
});
export { savedviewfullstack3 as "savedViewFullStack" }