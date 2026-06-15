/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercommandcopied2Inputs */

const en_buildercommandcopied2 = /** @type {(inputs: Buildercommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Command copied`)
};

const es_buildercommandcopied2 = /** @type {(inputs: Buildercommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Comando copiado`)
};

const zh_buildercommandcopied2 = /** @type {(inputs: Buildercommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`命令已复制`)
};

/**
* | output |
* | --- |
* | "Command copied" |
*
* @param {Buildercommandcopied2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const buildercommandcopied2 = /** @type {((inputs?: Buildercommandcopied2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercommandcopied2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildercommandcopied2(inputs)
	if (locale === "es") return es_buildercommandcopied2(inputs)
	return zh_buildercommandcopied2(inputs)
});
export { buildercommandcopied2 as "builderCommandCopied" }