/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderlegacytooltip2Inputs */

const en_builderlegacytooltip2 = /** @type {(inputs: Builderlegacytooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No longer actively maintained`)
};

const es_builderlegacytooltip2 = /** @type {(inputs: Builderlegacytooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ya no se mantiene activamente`)
};

const zh_builderlegacytooltip2 = /** @type {(inputs: Builderlegacytooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`不再积极维护`)
};

/**
* | output |
* | --- |
* | "No longer actively maintained" |
*
* @param {Builderlegacytooltip2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderlegacytooltip2 = /** @type {((inputs?: Builderlegacytooltip2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderlegacytooltip2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderlegacytooltip2(inputs)
	if (locale === "es") return es_builderlegacytooltip2(inputs)
	return zh_builderlegacytooltip2(inputs)
});
export { builderlegacytooltip2 as "builderLegacyTooltip" }