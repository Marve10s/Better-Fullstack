/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderselectfiletoview4Inputs */

const en_builderselectfiletoview4 = /** @type {(inputs: Builderselectfiletoview4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Select a file to view its content`)
};

const es_builderselectfiletoview4 = /** @type {(inputs: Builderselectfiletoview4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Selecciona un archivo para ver su contenido`)
};

const zh_builderselectfiletoview4 = /** @type {(inputs: Builderselectfiletoview4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`选择一个文件查看内容`)
};

/**
* | output |
* | --- |
* | "Select a file to view its content" |
*
* @param {Builderselectfiletoview4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderselectfiletoview4 = /** @type {((inputs?: Builderselectfiletoview4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderselectfiletoview4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderselectfiletoview4(inputs)
	if (locale === "es") return es_builderselectfiletoview4(inputs)
	return zh_builderselectfiletoview4(inputs)
});
export { builderselectfiletoview4 as "builderSelectFileToView" }