/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecopycommand2Inputs */

const en_homecopycommand2 = /** @type {(inputs: Homecopycommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copy command`)
};

const es_homecopycommand2 = /** @type {(inputs: Homecopycommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copiar comando`)
};

const zh_homecopycommand2 = /** @type {(inputs: Homecopycommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制命令`)
};

/**
* | output |
* | --- |
* | "Copy command" |
*
* @param {Homecopycommand2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homecopycommand2 = /** @type {((inputs?: Homecopycommand2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecopycommand2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homecopycommand2(inputs)
	if (locale === "es") return es_homecopycommand2(inputs)
	return zh_homecopycommand2(inputs)
});
export { homecopycommand2 as "homeCopyCommand" }