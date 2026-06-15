/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderpreviewfailedfetch3Inputs */

const en_builderpreviewfailedfetch3 = /** @type {(inputs: Builderpreviewfailedfetch3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to fetch preview`)
};

const es_builderpreviewfailedfetch3 = /** @type {(inputs: Builderpreviewfailedfetch3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No se pudo cargar la vista previa`)
};

const zh_builderpreviewfailedfetch3 = /** @type {(inputs: Builderpreviewfailedfetch3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`获取预览失败`)
};

/**
* | output |
* | --- |
* | "Failed to fetch preview" |
*
* @param {Builderpreviewfailedfetch3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderpreviewfailedfetch3 = /** @type {((inputs?: Builderpreviewfailedfetch3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviewfailedfetch3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderpreviewfailedfetch3(inputs)
	if (locale === "es") return es_builderpreviewfailedfetch3(inputs)
	return zh_builderpreviewfailedfetch3(inputs)
});
export { builderpreviewfailedfetch3 as "builderPreviewFailedFetch" }