/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderstepfinalize2Inputs */

const en_builderstepfinalize2 = /** @type {(inputs: Builderstepfinalize2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Finalize`)
};

const es_builderstepfinalize2 = /** @type {(inputs: Builderstepfinalize2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Finalizar`)
};

const zh_builderstepfinalize2 = /** @type {(inputs: Builderstepfinalize2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`完成`)
};

/**
* | output |
* | --- |
* | "Finalize" |
*
* @param {Builderstepfinalize2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderstepfinalize2 = /** @type {((inputs?: Builderstepfinalize2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderstepfinalize2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderstepfinalize2(inputs)
	if (locale === "es") return es_builderstepfinalize2(inputs)
	return zh_builderstepfinalize2(inputs)
});
export { builderstepfinalize2 as "builderStepFinalize" }