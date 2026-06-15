/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presetcustomize1Inputs */

const en_presetcustomize1 = /** @type {(inputs: Presetcustomize1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Customize preset`)
};

const es_presetcustomize1 = /** @type {(inputs: Presetcustomize1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Personalizar plantilla`)
};

const zh_presetcustomize1 = /** @type {(inputs: Presetcustomize1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`自定义预设`)
};

/**
* | output |
* | --- |
* | "Customize preset" |
*
* @param {Presetcustomize1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const presetcustomize1 = /** @type {((inputs?: Presetcustomize1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetcustomize1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presetcustomize1(inputs)
	if (locale === "es") return es_presetcustomize1(inputs)
	return zh_presetcustomize1(inputs)
});
export { presetcustomize1 as "presetCustomize" }