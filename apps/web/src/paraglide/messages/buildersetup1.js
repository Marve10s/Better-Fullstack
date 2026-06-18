/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildersetup1Inputs */

const en_buildersetup1 = /** @type {(inputs: Buildersetup1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`setup`)
};

const es_buildersetup1 = /** @type {(inputs: Buildersetup1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`configuración`)
};

const zh_buildersetup1 = /** @type {(inputs: Buildersetup1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`设置`)
};

const ja_buildersetup1 = /** @type {(inputs: Buildersetup1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`設定`)
};

const ko_buildersetup1 = /** @type {(inputs: Buildersetup1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`설정`)
};

const zh_hant1_buildersetup1 = /** @type {(inputs: Buildersetup1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`設定`)
};

const de_buildersetup1 = /** @type {(inputs: Buildersetup1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`aufstellen`)
};

const fr_buildersetup1 = /** @type {(inputs: Buildersetup1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`installation`)
};

/**
* | output |
* | --- |
* | "setup" |
*
* @param {Buildersetup1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const buildersetup1 = /** @type {((inputs?: Buildersetup1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildersetup1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildersetup1(inputs)
	if (locale === "es") return es_buildersetup1(inputs)
	if (locale === "zh") return zh_buildersetup1(inputs)
	if (locale === "ja") return ja_buildersetup1(inputs)
	if (locale === "ko") return ko_buildersetup1(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildersetup1(inputs)
	if (locale === "de") return de_buildersetup1(inputs)
	return fr_buildersetup1(inputs)
});
export { buildersetup1 as "builderSetup" }