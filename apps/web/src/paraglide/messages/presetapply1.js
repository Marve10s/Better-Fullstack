/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presetapply1Inputs */

const en_presetapply1 = /** @type {(inputs: Presetapply1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Apply`)
};

const es_presetapply1 = /** @type {(inputs: Presetapply1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aplicar`)
};

const zh_presetapply1 = /** @type {(inputs: Presetapply1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`应用`)
};

/**
* | output |
* | --- |
* | "Apply" |
*
* @param {Presetapply1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const presetapply1 = /** @type {((inputs?: Presetapply1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetapply1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presetapply1(inputs)
	if (locale === "es") return es_presetapply1(inputs)
	return zh_presetapply1(inputs)
});
export { presetapply1 as "presetApply" }