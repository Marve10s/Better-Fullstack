/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderpreviewhidewarnings3Inputs */

const en_builderpreviewhidewarnings3 = /** @type {(inputs: Builderpreviewhidewarnings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`hide`)
};

const es_builderpreviewhidewarnings3 = /** @type {(inputs: Builderpreviewhidewarnings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ocultar`)
};

const zh_builderpreviewhidewarnings3 = /** @type {(inputs: Builderpreviewhidewarnings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`隐藏`)
};

/**
* | output |
* | --- |
* | "hide" |
*
* @param {Builderpreviewhidewarnings3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderpreviewhidewarnings3 = /** @type {((inputs?: Builderpreviewhidewarnings3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviewhidewarnings3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderpreviewhidewarnings3(inputs)
	if (locale === "es") return es_builderpreviewhidewarnings3(inputs)
	return zh_builderpreviewhidewarnings3(inputs)
});
export { builderpreviewhidewarnings3 as "builderPreviewHideWarnings" }