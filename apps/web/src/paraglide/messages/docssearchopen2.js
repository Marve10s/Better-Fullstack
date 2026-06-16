/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssearchopen2Inputs */

const en_docssearchopen2 = /** @type {(inputs: Docssearchopen2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open`)
};

const es_docssearchopen2 = /** @type {(inputs: Docssearchopen2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abrir`)
};

const zh_docssearchopen2 = /** @type {(inputs: Docssearchopen2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打开`)
};

/**
* | output |
* | --- |
* | "Open" |
*
* @param {Docssearchopen2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const docssearchopen2 = /** @type {((inputs?: Docssearchopen2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssearchopen2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docssearchopen2(inputs)
	if (locale === "es") return es_docssearchopen2(inputs)
	return zh_docssearchopen2(inputs)
});
export { docssearchopen2 as "docsSearchOpen" }