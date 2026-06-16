/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Docssearchsectionsindexed3Inputs */

const en_docssearchsectionsindexed3 = /** @type {(inputs: Docssearchsectionsindexed3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} sections indexed`)
};

const es_docssearchsectionsindexed3 = /** @type {(inputs: Docssearchsectionsindexed3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} secciones indexadas`)
};

const zh_docssearchsectionsindexed3 = /** @type {(inputs: Docssearchsectionsindexed3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已索引 ${i?.count} 个章节`)
};

/**
* | output |
* | --- |
* | "{count} sections indexed" |
*
* @param {Docssearchsectionsindexed3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const docssearchsectionsindexed3 = /** @type {((inputs: Docssearchsectionsindexed3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssearchsectionsindexed3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docssearchsectionsindexed3(inputs)
	if (locale === "es") return es_docssearchsectionsindexed3(inputs)
	return zh_docssearchsectionsindexed3(inputs)
});
export { docssearchsectionsindexed3 as "docsSearchSectionsIndexed" }