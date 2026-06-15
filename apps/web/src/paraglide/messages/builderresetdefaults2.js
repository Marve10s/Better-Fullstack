/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderresetdefaults2Inputs */

const en_builderresetdefaults2 = /** @type {(inputs: Builderresetdefaults2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Reset to defaults`)
};

const es_builderresetdefaults2 = /** @type {(inputs: Builderresetdefaults2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Restablecer valores`)
};

const zh_builderresetdefaults2 = /** @type {(inputs: Builderresetdefaults2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重置为默认值`)
};

/**
* | output |
* | --- |
* | "Reset to defaults" |
*
* @param {Builderresetdefaults2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderresetdefaults2 = /** @type {((inputs?: Builderresetdefaults2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderresetdefaults2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderresetdefaults2(inputs)
	if (locale === "es") return es_builderresetdefaults2(inputs)
	return zh_builderresetdefaults2(inputs)
});
export { builderresetdefaults2 as "builderResetDefaults" }