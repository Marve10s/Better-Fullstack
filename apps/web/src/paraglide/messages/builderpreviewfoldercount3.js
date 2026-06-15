/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Builderpreviewfoldercount3Inputs */

const en_builderpreviewfoldercount3 = /** @type {(inputs: Builderpreviewfoldercount3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} folders`)
};

const es_builderpreviewfoldercount3 = /** @type {(inputs: Builderpreviewfoldercount3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} carpetas`)
};

const zh_builderpreviewfoldercount3 = /** @type {(inputs: Builderpreviewfoldercount3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 个文件夹`)
};

/**
* | output |
* | --- |
* | "{count} folders" |
*
* @param {Builderpreviewfoldercount3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderpreviewfoldercount3 = /** @type {((inputs: Builderpreviewfoldercount3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviewfoldercount3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderpreviewfoldercount3(inputs)
	if (locale === "es") return es_builderpreviewfoldercount3(inputs)
	return zh_builderpreviewfoldercount3(inputs)
});
export { builderpreviewfoldercount3 as "builderPreviewFolderCount" }