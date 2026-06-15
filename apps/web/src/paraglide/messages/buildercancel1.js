/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercancel1Inputs */

const en_buildercancel1 = /** @type {(inputs: Buildercancel1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cancel`)
};

const es_buildercancel1 = /** @type {(inputs: Buildercancel1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cancelar`)
};

const zh_buildercancel1 = /** @type {(inputs: Buildercancel1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`取消`)
};

/**
* | output |
* | --- |
* | "Cancel" |
*
* @param {Buildercancel1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const buildercancel1 = /** @type {((inputs?: Buildercancel1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercancel1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildercancel1(inputs)
	if (locale === "es") return es_buildercancel1(inputs)
	return zh_buildercancel1(inputs)
});
export { buildercancel1 as "builderCancel" }