/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navcommandcopied2Inputs */

const en_navcommandcopied2 = /** @type {(inputs: Navcommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Command copied`)
};

const es_navcommandcopied2 = /** @type {(inputs: Navcommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Comando copiado`)
};

const zh_navcommandcopied2 = /** @type {(inputs: Navcommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`命令已复制`)
};

/**
* | output |
* | --- |
* | "Command copied" |
*
* @param {Navcommandcopied2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const navcommandcopied2 = /** @type {((inputs?: Navcommandcopied2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navcommandcopied2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navcommandcopied2(inputs)
	if (locale === "es") return es_navcommandcopied2(inputs)
	return zh_navcommandcopied2(inputs)
});
export { navcommandcopied2 as "navCommandCopied" }