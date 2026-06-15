/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homestopwiring2Inputs */

const en_homestopwiring2 = /** @type {(inputs: Homestopwiring2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stop wiring.`)
};

const es_homestopwiring2 = /** @type {(inputs: Homestopwiring2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Deja de conectar cables.`)
};

const zh_homestopwiring2 = /** @type {(inputs: Homestopwiring2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`别再手动串联。`)
};

/**
* | output |
* | --- |
* | "Stop wiring." |
*
* @param {Homestopwiring2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homestopwiring2 = /** @type {((inputs?: Homestopwiring2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homestopwiring2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homestopwiring2(inputs)
	if (locale === "es") return es_homestopwiring2(inputs)
	return zh_homestopwiring2(inputs)
});
export { homestopwiring2 as "homeStopWiring" }