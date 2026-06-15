/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Actionsrandom1Inputs */

const en_actionsrandom1 = /** @type {(inputs: Actionsrandom1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Random`)
};

const es_actionsrandom1 = /** @type {(inputs: Actionsrandom1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aleatorio`)
};

const zh_actionsrandom1 = /** @type {(inputs: Actionsrandom1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`随机`)
};

/**
* | output |
* | --- |
* | "Random" |
*
* @param {Actionsrandom1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const actionsrandom1 = /** @type {((inputs?: Actionsrandom1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Actionsrandom1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_actionsrandom1(inputs)
	if (locale === "es") return es_actionsrandom1(inputs)
	return zh_actionsrandom1(inputs)
});
export { actionsrandom1 as "actionsRandom" }