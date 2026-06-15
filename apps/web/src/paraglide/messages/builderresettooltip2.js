/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderresettooltip2Inputs */

const en_builderresettooltip2 = /** @type {(inputs: Builderresettooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Reset all builder options to defaults`)
};

const es_builderresettooltip2 = /** @type {(inputs: Builderresettooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Restablecer todas las opciones del constructor`)
};

const zh_builderresettooltip2 = /** @type {(inputs: Builderresettooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重置构建器的所有选项`)
};

/**
* | output |
* | --- |
* | "Reset all builder options to defaults" |
*
* @param {Builderresettooltip2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderresettooltip2 = /** @type {((inputs?: Builderresettooltip2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderresettooltip2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderresettooltip2(inputs)
	if (locale === "es") return es_builderresettooltip2(inputs)
	return zh_builderresettooltip2(inputs)
});
export { builderresettooltip2 as "builderResetTooltip" }