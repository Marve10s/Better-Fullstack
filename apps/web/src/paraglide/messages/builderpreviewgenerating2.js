/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderpreviewgenerating2Inputs */

const en_builderpreviewgenerating2 = /** @type {(inputs: Builderpreviewgenerating2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generating preview...`)
};

const es_builderpreviewgenerating2 = /** @type {(inputs: Builderpreviewgenerating2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generando vista previa...`)
};

const zh_builderpreviewgenerating2 = /** @type {(inputs: Builderpreviewgenerating2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在生成预览...`)
};

/**
* | output |
* | --- |
* | "Generating preview..." |
*
* @param {Builderpreviewgenerating2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderpreviewgenerating2 = /** @type {((inputs?: Builderpreviewgenerating2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviewgenerating2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderpreviewgenerating2(inputs)
	if (locale === "es") return es_builderpreviewgenerating2(inputs)
	return zh_builderpreviewgenerating2(inputs)
});
export { builderpreviewgenerating2 as "builderPreviewGenerating" }