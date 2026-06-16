/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsnoresultsprefix3Inputs */

const en_docsnoresultsprefix3 = /** @type {(inputs: Docsnoresultsprefix3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No results for`)
};

const es_docsnoresultsprefix3 = /** @type {(inputs: Docsnoresultsprefix3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sin resultados para`)
};

const zh_docsnoresultsprefix3 = /** @type {(inputs: Docsnoresultsprefix3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`没有结果：`)
};

/**
* | output |
* | --- |
* | "No results for" |
*
* @param {Docsnoresultsprefix3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const docsnoresultsprefix3 = /** @type {((inputs?: Docsnoresultsprefix3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsnoresultsprefix3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docsnoresultsprefix3(inputs)
	if (locale === "es") return es_docsnoresultsprefix3(inputs)
	return zh_docsnoresultsprefix3(inputs)
});
export { docsnoresultsprefix3 as "docsNoResultsPrefix" }