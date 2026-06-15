/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homepickyourstack3Inputs */

const en_homepickyourstack3 = /** @type {(inputs: Homepickyourstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pick your`)
};

const es_homepickyourstack3 = /** @type {(inputs: Homepickyourstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elige tu`)
};

const zh_homepickyourstack3 = /** @type {(inputs: Homepickyourstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`选择你的`)
};

/**
* | output |
* | --- |
* | "Pick your" |
*
* @param {Homepickyourstack3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homepickyourstack3 = /** @type {((inputs?: Homepickyourstack3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homepickyourstack3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homepickyourstack3(inputs)
	if (locale === "es") return es_homepickyourstack3(inputs)
	return zh_homepickyourstack3(inputs)
});
export { homepickyourstack3 as "homePickYourStack" }