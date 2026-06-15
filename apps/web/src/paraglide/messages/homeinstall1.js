/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeinstall1Inputs */

const en_homeinstall1 = /** @type {(inputs: Homeinstall1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`install`)
};

const es_homeinstall1 = /** @type {(inputs: Homeinstall1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`instalar`)
};

const zh_homeinstall1 = /** @type {(inputs: Homeinstall1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`安装`)
};

/**
* | output |
* | --- |
* | "install" |
*
* @param {Homeinstall1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homeinstall1 = /** @type {((inputs?: Homeinstall1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeinstall1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homeinstall1(inputs)
	if (locale === "es") return es_homeinstall1(inputs)
	return zh_homeinstall1(inputs)
});
export { homeinstall1 as "homeInstall" }