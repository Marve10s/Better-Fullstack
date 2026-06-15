/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Actionsreset1Inputs */

const en_actionsreset1 = /** @type {(inputs: Actionsreset1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Reset`)
};

const es_actionsreset1 = /** @type {(inputs: Actionsreset1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Restablecer`)
};

const zh_actionsreset1 = /** @type {(inputs: Actionsreset1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重置`)
};

/**
* | output |
* | --- |
* | "Reset" |
*
* @param {Actionsreset1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const actionsreset1 = /** @type {((inputs?: Actionsreset1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Actionsreset1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_actionsreset1(inputs)
	if (locale === "es") return es_actionsreset1(inputs)
	return zh_actionsreset1(inputs)
});
export { actionsreset1 as "actionsReset" }