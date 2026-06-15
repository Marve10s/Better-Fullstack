/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Builderpreviewfilecount3Inputs */

const en_builderpreviewfilecount3 = /** @type {(inputs: Builderpreviewfilecount3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} files`)
};

const es_builderpreviewfilecount3 = /** @type {(inputs: Builderpreviewfilecount3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} archivos`)
};

const zh_builderpreviewfilecount3 = /** @type {(inputs: Builderpreviewfilecount3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 个文件`)
};

/**
* | output |
* | --- |
* | "{count} files" |
*
* @param {Builderpreviewfilecount3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderpreviewfilecount3 = /** @type {((inputs: Builderpreviewfilecount3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviewfilecount3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderpreviewfilecount3(inputs)
	if (locale === "es") return es_builderpreviewfilecount3(inputs)
	return zh_builderpreviewfilecount3(inputs)
});
export { builderpreviewfilecount3 as "builderPreviewFileCount" }