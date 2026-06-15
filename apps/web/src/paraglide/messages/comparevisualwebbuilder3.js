/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparevisualwebbuilder3Inputs */

const en_comparevisualwebbuilder3 = /** @type {(inputs: Comparevisualwebbuilder3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Visual web builder`)
};

const es_comparevisualwebbuilder3 = /** @type {(inputs: Comparevisualwebbuilder3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Constructor web visual`)
};

const zh_comparevisualwebbuilder3 = /** @type {(inputs: Comparevisualwebbuilder3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可视化 Web 构建器`)
};

/**
* | output |
* | --- |
* | "Visual web builder" |
*
* @param {Comparevisualwebbuilder3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const comparevisualwebbuilder3 = /** @type {((inputs?: Comparevisualwebbuilder3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparevisualwebbuilder3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparevisualwebbuilder3(inputs)
	if (locale === "es") return es_comparevisualwebbuilder3(inputs)
	return zh_comparevisualwebbuilder3(inputs)
});
export { comparevisualwebbuilder3 as "compareVisualWebBuilder" }