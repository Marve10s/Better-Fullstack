/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderpreviewinfo2Inputs */

const en_builderpreviewinfo2 = /** @type {(inputs: Builderpreviewinfo2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Preview info`)
};

const es_builderpreviewinfo2 = /** @type {(inputs: Builderpreviewinfo2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Información de vista previa`)
};

const zh_builderpreviewinfo2 = /** @type {(inputs: Builderpreviewinfo2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`预览信息`)
};

/**
* | output |
* | --- |
* | "Preview info" |
*
* @param {Builderpreviewinfo2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderpreviewinfo2 = /** @type {((inputs?: Builderpreviewinfo2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviewinfo2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderpreviewinfo2(inputs)
	if (locale === "es") return es_builderpreviewinfo2(inputs)
	return zh_builderpreviewinfo2(inputs)
});
export { builderpreviewinfo2 as "builderPreviewInfo" }