/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderpreviousstep2Inputs */

const en_builderpreviousstep2 = /** @type {(inputs: Builderpreviousstep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Previous step`)
};

const es_builderpreviousstep2 = /** @type {(inputs: Builderpreviousstep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Paso anterior`)
};

const zh_builderpreviousstep2 = /** @type {(inputs: Builderpreviousstep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上一步`)
};

const ja_builderpreviousstep2 = /** @type {(inputs: Builderpreviousstep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`前のステップ`)
};

const ko_builderpreviousstep2 = /** @type {(inputs: Builderpreviousstep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이전 단계`)
};

const zh_hant1_builderpreviousstep2 = /** @type {(inputs: Builderpreviousstep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上一步`)
};

const de_builderpreviousstep2 = /** @type {(inputs: Builderpreviousstep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vorheriger Schritt`)
};

const fr_builderpreviousstep2 = /** @type {(inputs: Builderpreviousstep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Étape précédente`)
};

/**
* | output |
* | --- |
* | "Previous step" |
*
* @param {Builderpreviousstep2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderpreviousstep2 = /** @type {((inputs?: Builderpreviousstep2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviousstep2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderpreviousstep2(inputs)
	if (locale === "es") return es_builderpreviousstep2(inputs)
	if (locale === "zh") return zh_builderpreviousstep2(inputs)
	if (locale === "ja") return ja_builderpreviousstep2(inputs)
	if (locale === "ko") return ko_builderpreviousstep2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderpreviousstep2(inputs)
	if (locale === "de") return de_builderpreviousstep2(inputs)
	return fr_builderpreviousstep2(inputs)
});
export { builderpreviousstep2 as "builderPreviousStep" }