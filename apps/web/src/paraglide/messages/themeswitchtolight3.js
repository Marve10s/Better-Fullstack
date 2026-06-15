/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Themeswitchtolight3Inputs */

const en_themeswitchtolight3 = /** @type {(inputs: Themeswitchtolight3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Switch to light mode`)
};

const es_themeswitchtolight3 = /** @type {(inputs: Themeswitchtolight3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cambiar al modo claro`)
};

const zh_themeswitchtolight3 = /** @type {(inputs: Themeswitchtolight3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`切换到浅色模式`)
};

/**
* | output |
* | --- |
* | "Switch to light mode" |
*
* @param {Themeswitchtolight3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const themeswitchtolight3 = /** @type {((inputs?: Themeswitchtolight3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Themeswitchtolight3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_themeswitchtolight3(inputs)
	if (locale === "es") return es_themeswitchtolight3(inputs)
	return zh_themeswitchtolight3(inputs)
});
export { themeswitchtolight3 as "themeSwitchToLight" }