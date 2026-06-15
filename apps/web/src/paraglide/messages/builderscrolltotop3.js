/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderscrolltotop3Inputs */

const en_builderscrolltotop3 = /** @type {(inputs: Builderscrolltotop3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Scroll to top`)
};

const es_builderscrolltotop3 = /** @type {(inputs: Builderscrolltotop3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Volver arriba`)
};

const zh_builderscrolltotop3 = /** @type {(inputs: Builderscrolltotop3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`滚动到顶部`)
};

/**
* | output |
* | --- |
* | "Scroll to top" |
*
* @param {Builderscrolltotop3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderscrolltotop3 = /** @type {((inputs?: Builderscrolltotop3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderscrolltotop3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderscrolltotop3(inputs)
	if (locale === "es") return es_builderscrolltotop3(inputs)
	return zh_builderscrolltotop3(inputs)
});
export { builderscrolltotop3 as "builderScrollToTop" }