/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildertabbuilder2Inputs */

const en_buildertabbuilder2 = /** @type {(inputs: Buildertabbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Builder`)
};

const es_buildertabbuilder2 = /** @type {(inputs: Buildertabbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Constructor`)
};

const zh_buildertabbuilder2 = /** @type {(inputs: Buildertabbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`构建器`)
};

const ja_buildertabbuilder2 = /** @type {(inputs: Buildertabbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ビルダー`)
};

const ko_buildertabbuilder2 = /** @type {(inputs: Buildertabbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`빌더`)
};

const zh_hant1_buildertabbuilder2 = /** @type {(inputs: Buildertabbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`建構器`)
};

const de_buildertabbuilder2 = /** @type {(inputs: Buildertabbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Baumeister`)
};

const fr_buildertabbuilder2 = /** @type {(inputs: Buildertabbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Constructeur`)
};

/**
* | output |
* | --- |
* | "Builder" |
*
* @param {Buildertabbuilder2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const buildertabbuilder2 = /** @type {((inputs?: Buildertabbuilder2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildertabbuilder2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildertabbuilder2(inputs)
	if (locale === "es") return es_buildertabbuilder2(inputs)
	if (locale === "zh") return zh_buildertabbuilder2(inputs)
	if (locale === "ja") return ja_buildertabbuilder2(inputs)
	if (locale === "ko") return ko_buildertabbuilder2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildertabbuilder2(inputs)
	if (locale === "de") return de_buildertabbuilder2(inputs)
	return fr_buildertabbuilder2(inputs)
});
export { buildertabbuilder2 as "builderTabBuilder" }