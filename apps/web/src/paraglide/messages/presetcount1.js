/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Presetcount1Inputs */

const en_presetcount1 = /** @type {(inputs: Presetcount1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} presets`)
};

const es_presetcount1 = /** @type {(inputs: Presetcount1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} plantillas`)
};

const zh_presetcount1 = /** @type {(inputs: Presetcount1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 个预设`)
};

/**
* | output |
* | --- |
* | "{count} presets" |
*
* @param {Presetcount1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const presetcount1 = /** @type {((inputs: Presetcount1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetcount1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presetcount1(inputs)
	if (locale === "es") return es_presetcount1(inputs)
	return zh_presetcount1(inputs)
});
export { presetcount1 as "presetCount" }