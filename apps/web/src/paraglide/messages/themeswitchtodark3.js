/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Themeswitchtodark3Inputs */

const en_themeswitchtodark3 = /** @type {(inputs: Themeswitchtodark3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Switch to dark mode`)
};

const es_themeswitchtodark3 = /** @type {(inputs: Themeswitchtodark3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cambiar al modo oscuro`)
};

const zh_themeswitchtodark3 = /** @type {(inputs: Themeswitchtodark3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`切换到深色模式`)
};

/**
* | output |
* | --- |
* | "Switch to dark mode" |
*
* @param {Themeswitchtodark3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const themeswitchtodark3 = /** @type {((inputs?: Themeswitchtodark3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Themeswitchtodark3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_themeswitchtodark3(inputs)
	if (locale === "es") return es_themeswitchtodark3(inputs)
	return zh_themeswitchtodark3(inputs)
});
export { themeswitchtodark3 as "themeSwitchToDark" }