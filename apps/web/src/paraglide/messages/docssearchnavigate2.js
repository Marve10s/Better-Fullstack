/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssearchnavigate2Inputs */

const en_docssearchnavigate2 = /** @type {(inputs: Docssearchnavigate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Navigate`)
};

const es_docssearchnavigate2 = /** @type {(inputs: Docssearchnavigate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Navegar`)
};

const zh_docssearchnavigate2 = /** @type {(inputs: Docssearchnavigate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`导航`)
};

/**
* | output |
* | --- |
* | "Navigate" |
*
* @param {Docssearchnavigate2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const docssearchnavigate2 = /** @type {((inputs?: Docssearchnavigate2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssearchnavigate2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docssearchnavigate2(inputs)
	if (locale === "es") return es_docssearchnavigate2(inputs)
	return zh_docssearchnavigate2(inputs)
});
export { docssearchnavigate2 as "docsSearchNavigate" }