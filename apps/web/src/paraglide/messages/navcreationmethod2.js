/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navcreationmethod2Inputs */

const en_navcreationmethod2 = /** @type {(inputs: Navcreationmethod2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Creation method`)
};

const es_navcreationmethod2 = /** @type {(inputs: Navcreationmethod2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Método de creación`)
};

const zh_navcreationmethod2 = /** @type {(inputs: Navcreationmethod2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`创建方式`)
};

/**
* | output |
* | --- |
* | "Creation method" |
*
* @param {Navcreationmethod2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const navcreationmethod2 = /** @type {((inputs?: Navcreationmethod2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navcreationmethod2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navcreationmethod2(inputs)
	if (locale === "es") return es_navcreationmethod2(inputs)
	return zh_navcreationmethod2(inputs)
});
export { navcreationmethod2 as "navCreationMethod" }