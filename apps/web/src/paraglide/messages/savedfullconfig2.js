/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedfullconfig2Inputs */

const en_savedfullconfig2 = /** @type {(inputs: Savedfullconfig2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Full saved configuration for this preset.`)
};

const es_savedfullconfig2 = /** @type {(inputs: Savedfullconfig2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Configuración completa guardada para esta plantilla.`)
};

const zh_savedfullconfig2 = /** @type {(inputs: Savedfullconfig2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`此预设的完整保存配置。`)
};

/**
* | output |
* | --- |
* | "Full saved configuration for this preset." |
*
* @param {Savedfullconfig2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const savedfullconfig2 = /** @type {((inputs?: Savedfullconfig2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedfullconfig2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedfullconfig2(inputs)
	if (locale === "es") return es_savedfullconfig2(inputs)
	return zh_savedfullconfig2(inputs)
});
export { savedfullconfig2 as "savedFullConfig" }