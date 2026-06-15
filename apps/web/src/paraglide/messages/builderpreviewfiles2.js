/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderpreviewfiles2Inputs */

const en_builderpreviewfiles2 = /** @type {(inputs: Builderpreviewfiles2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Files`)
};

const es_builderpreviewfiles2 = /** @type {(inputs: Builderpreviewfiles2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Archivos`)
};

const zh_builderpreviewfiles2 = /** @type {(inputs: Builderpreviewfiles2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`文件`)
};

/**
* | output |
* | --- |
* | "Files" |
*
* @param {Builderpreviewfiles2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderpreviewfiles2 = /** @type {((inputs?: Builderpreviewfiles2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviewfiles2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderpreviewfiles2(inputs)
	if (locale === "es") return es_builderpreviewfiles2(inputs)
	return zh_builderpreviewfiles2(inputs)
});
export { builderpreviewfiles2 as "builderPreviewFiles" }