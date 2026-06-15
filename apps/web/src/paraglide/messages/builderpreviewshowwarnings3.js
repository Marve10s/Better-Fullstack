/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderpreviewshowwarnings3Inputs */

const en_builderpreviewshowwarnings3 = /** @type {(inputs: Builderpreviewshowwarnings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`show`)
};

const es_builderpreviewshowwarnings3 = /** @type {(inputs: Builderpreviewshowwarnings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`mostrar`)
};

const zh_builderpreviewshowwarnings3 = /** @type {(inputs: Builderpreviewshowwarnings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`显示`)
};

/**
* | output |
* | --- |
* | "show" |
*
* @param {Builderpreviewshowwarnings3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderpreviewshowwarnings3 = /** @type {((inputs?: Builderpreviewshowwarnings3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviewshowwarnings3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderpreviewshowwarnings3(inputs)
	if (locale === "es") return es_builderpreviewshowwarnings3(inputs)
	return zh_builderpreviewshowwarnings3(inputs)
});
export { builderpreviewshowwarnings3 as "builderPreviewShowWarnings" }