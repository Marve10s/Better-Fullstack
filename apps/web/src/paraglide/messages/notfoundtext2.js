/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Notfoundtext2Inputs */

const en_notfoundtext2 = /** @type {(inputs: Notfoundtext2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The page you're looking for doesn't exist.`)
};

const es_notfoundtext2 = /** @type {(inputs: Notfoundtext2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`La página que buscas no existe.`)
};

const zh_notfoundtext2 = /** @type {(inputs: Notfoundtext2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`你要找的页面不存在。`)
};

/**
* | output |
* | --- |
* | "The page you're looking for doesn't exist." |
*
* @param {Notfoundtext2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const notfoundtext2 = /** @type {((inputs?: Notfoundtext2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Notfoundtext2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_notfoundtext2(inputs)
	if (locale === "es") return es_notfoundtext2(inputs)
	return zh_notfoundtext2(inputs)
});
export { notfoundtext2 as "notFoundText" }