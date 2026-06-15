/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptooladdfeaturedescription4Inputs */

const en_mcptooladdfeaturedescription4 = /** @type {(inputs: Mcptooladdfeaturedescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add features to an existing project`)
};

const es_mcptooladdfeaturedescription4 = /** @type {(inputs: Mcptooladdfeaturedescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Añade funciones a un proyecto existente`)
};

const zh_mcptooladdfeaturedescription4 = /** @type {(inputs: Mcptooladdfeaturedescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`为现有项目添加功能`)
};

/**
* | output |
* | --- |
* | "Add features to an existing project" |
*
* @param {Mcptooladdfeaturedescription4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcptooladdfeaturedescription4 = /** @type {((inputs?: Mcptooladdfeaturedescription4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptooladdfeaturedescription4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcptooladdfeaturedescription4(inputs)
	if (locale === "es") return es_mcptooladdfeaturedescription4(inputs)
	return zh_mcptooladdfeaturedescription4(inputs)
});
export { mcptooladdfeaturedescription4 as "mcpToolAddFeatureDescription" }