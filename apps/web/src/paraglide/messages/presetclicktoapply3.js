/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presetclicktoapply3Inputs */

const en_presetclicktoapply3 = /** @type {(inputs: Presetclicktoapply3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Click to apply`)
};

const es_presetclicktoapply3 = /** @type {(inputs: Presetclicktoapply3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Haz clic para aplicar`)
};

const zh_presetclicktoapply3 = /** @type {(inputs: Presetclicktoapply3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`点击应用`)
};

/**
* | output |
* | --- |
* | "Click to apply" |
*
* @param {Presetclicktoapply3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const presetclicktoapply3 = /** @type {((inputs?: Presetclicktoapply3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetclicktoapply3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presetclicktoapply3(inputs)
	if (locale === "es") return es_presetclicktoapply3(inputs)
	return zh_presetclicktoapply3(inputs)
});
export { presetclicktoapply3 as "presetClickToApply" }