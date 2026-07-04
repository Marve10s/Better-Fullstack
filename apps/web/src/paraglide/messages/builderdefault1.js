/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderdefault1Inputs */

const en_builderdefault1 = /** @type {(inputs: Builderdefault1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Default`)
};

const es_builderdefault1 = /** @type {(inputs: Builderdefault1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Predeterminado`)
};

const zh_builderdefault1 = /** @type {(inputs: Builderdefault1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`默认`)
};

const ja_builderdefault1 = /** @type {(inputs: Builderdefault1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`デフォルト`)
};

const ko_builderdefault1 = /** @type {(inputs: Builderdefault1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`기본`)
};

const zh_hant1_builderdefault1 = /** @type {(inputs: Builderdefault1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`預設`)
};

const de_builderdefault1 = /** @type {(inputs: Builderdefault1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Standard`)
};

const fr_builderdefault1 = /** @type {(inputs: Builderdefault1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Défaut`)
};

/**
* | output |
* | --- |
* | "Default" |
*
* @param {Builderdefault1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderdefault1 = /** @type {((inputs?: Builderdefault1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderdefault1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderdefault1(inputs)
	if (locale === "es") return es_builderdefault1(inputs)
	if (locale === "zh") return zh_builderdefault1(inputs)
	if (locale === "ja") return ja_builderdefault1(inputs)
	if (locale === "ko") return ko_builderdefault1(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderdefault1(inputs)
	if (locale === "de") return de_builderdefault1(inputs)
	return fr_builderdefault1(inputs)
});
export { builderdefault1 as "builderDefault" }