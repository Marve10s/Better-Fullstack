/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildersettings1Inputs */

const en_buildersettings1 = /** @type {(inputs: Buildersettings1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Builder settings`)
};

const es_buildersettings1 = /** @type {(inputs: Buildersettings1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ajustes del constructor`)
};

const zh_buildersettings1 = /** @type {(inputs: Buildersettings1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`构建器设置`)
};

/**
* | output |
* | --- |
* | "Builder settings" |
*
* @param {Buildersettings1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const buildersettings1 = /** @type {((inputs?: Buildersettings1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildersettings1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildersettings1(inputs)
	if (locale === "es") return es_buildersettings1(inputs)
	return zh_buildersettings1(inputs)
});
export { buildersettings1 as "builderSettings" }