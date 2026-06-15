/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildersavecurrentstacktooltip4Inputs */

const en_buildersavecurrentstacktooltip4 = /** @type {(inputs: Buildersavecurrentstacktooltip4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save the current stack as a named preset`)
};

const es_buildersavecurrentstacktooltip4 = /** @type {(inputs: Buildersavecurrentstacktooltip4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Guarda el stack actual como una plantilla con nombre`)
};

const zh_buildersavecurrentstacktooltip4 = /** @type {(inputs: Buildersavecurrentstacktooltip4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`将当前 stack 保存为具名预设`)
};

/**
* | output |
* | --- |
* | "Save the current stack as a named preset" |
*
* @param {Buildersavecurrentstacktooltip4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const buildersavecurrentstacktooltip4 = /** @type {((inputs?: Buildersavecurrentstacktooltip4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildersavecurrentstacktooltip4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildersavecurrentstacktooltip4(inputs)
	if (locale === "es") return es_buildersavecurrentstacktooltip4(inputs)
	return zh_buildersavecurrentstacktooltip4(inputs)
});
export { buildersavecurrentstacktooltip4 as "builderSaveCurrentStackTooltip" }