/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Themetoggle1Inputs */

const en_themetoggle1 = /** @type {(inputs: Themetoggle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Toggle theme`)
};

const es_themetoggle1 = /** @type {(inputs: Themetoggle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cambiar tema`)
};

const zh_themetoggle1 = /** @type {(inputs: Themetoggle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`切换主题`)
};

/**
* | output |
* | --- |
* | "Toggle theme" |
*
* @param {Themetoggle1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const themetoggle1 = /** @type {((inputs?: Themetoggle1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Themetoggle1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_themetoggle1(inputs)
	if (locale === "es") return es_themetoggle1(inputs)
	return zh_themetoggle1(inputs)
});
export { themetoggle1 as "themeToggle" }