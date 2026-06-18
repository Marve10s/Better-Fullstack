/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderstepmobile2Inputs */

const en_builderstepmobile2 = /** @type {(inputs: Builderstepmobile2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mobile`)
};

const es_builderstepmobile2 = /** @type {(inputs: Builderstepmobile2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Móvil`)
};

const zh_builderstepmobile2 = /** @type {(inputs: Builderstepmobile2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`移动`)
};

const ja_builderstepmobile2 = /** @type {(inputs: Builderstepmobile2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`携帯`)
};

const ko_builderstepmobile2 = /** @type {(inputs: Builderstepmobile2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이동하는`)
};

const zh_hant1_builderstepmobile2 = /** @type {(inputs: Builderstepmobile2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`移動`)
};

const de_builderstepmobile2 = /** @type {(inputs: Builderstepmobile2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mobile`)
};

const fr_builderstepmobile2 = /** @type {(inputs: Builderstepmobile2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mobile`)
};

/**
* | output |
* | --- |
* | "Mobile" |
*
* @param {Builderstepmobile2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderstepmobile2 = /** @type {((inputs?: Builderstepmobile2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderstepmobile2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderstepmobile2(inputs)
	if (locale === "es") return es_builderstepmobile2(inputs)
	if (locale === "zh") return zh_builderstepmobile2(inputs)
	if (locale === "ja") return ja_builderstepmobile2(inputs)
	if (locale === "ko") return ko_builderstepmobile2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderstepmobile2(inputs)
	if (locale === "de") return de_builderstepmobile2(inputs)
	return fr_builderstepmobile2(inputs)
});
export { builderstepmobile2 as "builderStepMobile" }