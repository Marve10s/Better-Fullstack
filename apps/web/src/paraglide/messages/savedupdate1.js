/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedupdate1Inputs */

const en_savedupdate1 = /** @type {(inputs: Savedupdate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Update`)
};

const es_savedupdate1 = /** @type {(inputs: Savedupdate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Actualizar`)
};

const zh_savedupdate1 = /** @type {(inputs: Savedupdate1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更新`)
};

/**
* | output |
* | --- |
* | "Update" |
*
* @param {Savedupdate1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const savedupdate1 = /** @type {((inputs?: Savedupdate1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedupdate1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedupdate1(inputs)
	if (locale === "es") return es_savedupdate1(inputs)
	return zh_savedupdate1(inputs)
});
export { savedupdate1 as "savedUpdate" }