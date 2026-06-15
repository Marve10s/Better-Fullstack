/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navopendocsmenu3Inputs */

const en_navopendocsmenu3 = /** @type {(inputs: Navopendocsmenu3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open documentation menu`)
};

const es_navopendocsmenu3 = /** @type {(inputs: Navopendocsmenu3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abrir menú de documentación`)
};

const zh_navopendocsmenu3 = /** @type {(inputs: Navopendocsmenu3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打开文档菜单`)
};

/**
* | output |
* | --- |
* | "Open documentation menu" |
*
* @param {Navopendocsmenu3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const navopendocsmenu3 = /** @type {((inputs?: Navopendocsmenu3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navopendocsmenu3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navopendocsmenu3(inputs)
	if (locale === "es") return es_navopendocsmenu3(inputs)
	return zh_navopendocsmenu3(inputs)
});
export { navopendocsmenu3 as "navOpenDocsMenu" }