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

const ja_builderpreviewshowwarnings3 = /** @type {(inputs: Builderpreviewshowwarnings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`見せる`)
};

const ko_builderpreviewshowwarnings3 = /** @type {(inputs: Builderpreviewshowwarnings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`보여주다`)
};

const zh_hant1_builderpreviewshowwarnings3 = /** @type {(inputs: Builderpreviewshowwarnings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`顯示`)
};

const de_builderpreviewshowwarnings3 = /** @type {(inputs: Builderpreviewshowwarnings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`zeigen`)
};

const fr_builderpreviewshowwarnings3 = /** @type {(inputs: Builderpreviewshowwarnings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`montrer`)
};

/**
* | output |
* | --- |
* | "show" |
*
* @param {Builderpreviewshowwarnings3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderpreviewshowwarnings3 = /** @type {((inputs?: Builderpreviewshowwarnings3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviewshowwarnings3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderpreviewshowwarnings3(inputs)
	if (locale === "es") return es_builderpreviewshowwarnings3(inputs)
	if (locale === "zh") return zh_builderpreviewshowwarnings3(inputs)
	if (locale === "ja") return ja_builderpreviewshowwarnings3(inputs)
	if (locale === "ko") return ko_builderpreviewshowwarnings3(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderpreviewshowwarnings3(inputs)
	if (locale === "de") return de_builderpreviewshowwarnings3(inputs)
	return fr_builderpreviewshowwarnings3(inputs)
});
export { builderpreviewshowwarnings3 as "builderPreviewShowWarnings" }