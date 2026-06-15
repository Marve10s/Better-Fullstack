/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderintegratedauth2Inputs */

const en_builderintegratedauth2 = /** @type {(inputs: Builderintegratedauth2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Integrated Auth`)
};

const es_builderintegratedauth2 = /** @type {(inputs: Builderintegratedauth2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Auth integrada`)
};

const zh_builderintegratedauth2 = /** @type {(inputs: Builderintegratedauth2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`集成认证`)
};

/**
* | output |
* | --- |
* | "Integrated Auth" |
*
* @param {Builderintegratedauth2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderintegratedauth2 = /** @type {((inputs?: Builderintegratedauth2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderintegratedauth2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderintegratedauth2(inputs)
	if (locale === "es") return es_builderintegratedauth2(inputs)
	return zh_builderintegratedauth2(inputs)
});
export { builderintegratedauth2 as "builderIntegratedAuth" }