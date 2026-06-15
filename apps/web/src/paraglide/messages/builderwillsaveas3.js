/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Builderwillsaveas3Inputs */

const en_builderwillsaveas3 = /** @type {(inputs: Builderwillsaveas3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Will be saved as: ${i?.name}`)
};

const es_builderwillsaveas3 = /** @type {(inputs: Builderwillsaveas3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Se guardará como: ${i?.name}`)
};

const zh_builderwillsaveas3 = /** @type {(inputs: Builderwillsaveas3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`将保存为：${i?.name}`)
};

/**
* | output |
* | --- |
* | "Will be saved as: {name}" |
*
* @param {Builderwillsaveas3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderwillsaveas3 = /** @type {((inputs: Builderwillsaveas3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderwillsaveas3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderwillsaveas3(inputs)
	if (locale === "es") return es_builderwillsaveas3(inputs)
	return zh_builderwillsaveas3(inputs)
});
export { builderwillsaveas3 as "builderWillSaveAs" }