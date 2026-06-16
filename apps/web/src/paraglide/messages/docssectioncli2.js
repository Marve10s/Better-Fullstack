/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssectioncli2Inputs */

const en_docssectioncli2 = /** @type {(inputs: Docssectioncli2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`CLI`)
};

const es_docssectioncli2 = /** @type {(inputs: Docssectioncli2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`CLI`)
};

const zh_docssectioncli2 = /** @type {(inputs: Docssectioncli2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`CLI`)
};

/**
* | output |
* | --- |
* | "CLI" |
*
* @param {Docssectioncli2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const docssectioncli2 = /** @type {((inputs?: Docssectioncli2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssectioncli2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docssectioncli2(inputs)
	if (locale === "es") return es_docssectioncli2(inputs)
	return zh_docssectioncli2(inputs)
});
export { docssectioncli2 as "docsSectionCli" }