/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsprevious1Inputs */

const en_docsprevious1 = /** @type {(inputs: Docsprevious1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Previous`)
};

const es_docsprevious1 = /** @type {(inputs: Docsprevious1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Anterior`)
};

const zh_docsprevious1 = /** @type {(inputs: Docsprevious1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上一页`)
};

/**
* | output |
* | --- |
* | "Previous" |
*
* @param {Docsprevious1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const docsprevious1 = /** @type {((inputs?: Docsprevious1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsprevious1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docsprevious1(inputs)
	if (locale === "es") return es_docsprevious1(inputs)
	return zh_docsprevious1(inputs)
});
export { docsprevious1 as "docsPrevious" }