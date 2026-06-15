/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Savedpresetsaved2Inputs */

const en_savedpresetsaved2 = /** @type {(inputs: Savedpresetsaved2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Saved preset: ${i?.name}`)
};

const es_savedpresetsaved2 = /** @type {(inputs: Savedpresetsaved2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Plantilla guardada: ${i?.name}`)
};

const zh_savedpresetsaved2 = /** @type {(inputs: Savedpresetsaved2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已保存预设：${i?.name}`)
};

/**
* | output |
* | --- |
* | "Saved preset: {name}" |
*
* @param {Savedpresetsaved2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const savedpresetsaved2 = /** @type {((inputs: Savedpresetsaved2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedpresetsaved2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedpresetsaved2(inputs)
	if (locale === "es") return es_savedpresetsaved2(inputs)
	return zh_savedpresetsaved2(inputs)
});
export { savedpresetsaved2 as "savedPresetSaved" }