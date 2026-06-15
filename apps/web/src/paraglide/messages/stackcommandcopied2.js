/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Stackcommandcopied2Inputs */

const en_stackcommandcopied2 = /** @type {(inputs: Stackcommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Command copied to clipboard!`)
};

const es_stackcommandcopied2 = /** @type {(inputs: Stackcommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Comando copiado al portapapeles.`)
};

const zh_stackcommandcopied2 = /** @type {(inputs: Stackcommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`命令已复制到剪贴板！`)
};

/**
* | output |
* | --- |
* | "Command copied to clipboard!" |
*
* @param {Stackcommandcopied2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const stackcommandcopied2 = /** @type {((inputs?: Stackcommandcopied2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Stackcommandcopied2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_stackcommandcopied2(inputs)
	if (locale === "es") return es_stackcommandcopied2(inputs)
	return zh_stackcommandcopied2(inputs)
});
export { stackcommandcopied2 as "stackCommandCopied" }