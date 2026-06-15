/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Savedpresetupdated2Inputs */

const en_savedpresetupdated2 = /** @type {(inputs: Savedpresetupdated2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Updated preset: ${i?.name}`)
};

const es_savedpresetupdated2 = /** @type {(inputs: Savedpresetupdated2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Plantilla actualizada: ${i?.name}`)
};

const zh_savedpresetupdated2 = /** @type {(inputs: Savedpresetupdated2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已更新预设：${i?.name}`)
};

/**
* | output |
* | --- |
* | "Updated preset: {name}" |
*
* @param {Savedpresetupdated2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const savedpresetupdated2 = /** @type {((inputs: Savedpresetupdated2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedpresetupdated2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedpresetupdated2(inputs)
	if (locale === "es") return es_savedpresetupdated2(inputs)
	return zh_savedpresetupdated2(inputs)
});
export { savedpresetupdated2 as "savedPresetUpdated" }