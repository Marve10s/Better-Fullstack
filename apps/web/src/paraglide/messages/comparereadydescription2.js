/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparereadydescription2Inputs */

const en_comparereadydescription2 = /** @type {(inputs: Comparereadydescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Configure your stack visually or jump straight into the CLI.`)
};

const es_comparereadydescription2 = /** @type {(inputs: Comparereadydescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Configura tu stack visualmente o salta directo a la CLI.`)
};

const zh_comparereadydescription2 = /** @type {(inputs: Comparereadydescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可以可视化配置 stack，也可以直接使用 CLI。`)
};

/**
* | output |
* | --- |
* | "Configure your stack visually or jump straight into the CLI." |
*
* @param {Comparereadydescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const comparereadydescription2 = /** @type {((inputs?: Comparereadydescription2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparereadydescription2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparereadydescription2(inputs)
	if (locale === "es") return es_comparereadydescription2(inputs)
	return zh_comparereadydescription2(inputs)
});
export { comparereadydescription2 as "compareReadyDescription" }