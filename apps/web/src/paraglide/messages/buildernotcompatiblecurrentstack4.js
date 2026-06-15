/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildernotcompatiblecurrentstack4Inputs */

const en_buildernotcompatiblecurrentstack4 = /** @type {(inputs: Buildernotcompatiblecurrentstack4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Not compatible with current stack`)
};

const es_buildernotcompatiblecurrentstack4 = /** @type {(inputs: Buildernotcompatiblecurrentstack4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No compatible con el stack actual`)
};

const zh_buildernotcompatiblecurrentstack4 = /** @type {(inputs: Buildernotcompatiblecurrentstack4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`与当前 stack 不兼容`)
};

/**
* | output |
* | --- |
* | "Not compatible with current stack" |
*
* @param {Buildernotcompatiblecurrentstack4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const buildernotcompatiblecurrentstack4 = /** @type {((inputs?: Buildernotcompatiblecurrentstack4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildernotcompatiblecurrentstack4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildernotcompatiblecurrentstack4(inputs)
	if (locale === "es") return es_buildernotcompatiblecurrentstack4(inputs)
	return zh_buildernotcompatiblecurrentstack4(inputs)
});
export { buildernotcompatiblecurrentstack4 as "builderNotCompatibleCurrentStack" }