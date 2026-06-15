/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderstepmobile2Inputs */

const en_builderstepmobile2 = /** @type {(inputs: Builderstepmobile2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mobile`)
};

const es_builderstepmobile2 = /** @type {(inputs: Builderstepmobile2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Móvil`)
};

const zh_builderstepmobile2 = /** @type {(inputs: Builderstepmobile2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`移动`)
};

/**
* | output |
* | --- |
* | "Mobile" |
*
* @param {Builderstepmobile2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderstepmobile2 = /** @type {((inputs?: Builderstepmobile2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderstepmobile2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderstepmobile2(inputs)
	if (locale === "es") return es_builderstepmobile2(inputs)
	return zh_builderstepmobile2(inputs)
});
export { builderstepmobile2 as "builderStepMobile" }