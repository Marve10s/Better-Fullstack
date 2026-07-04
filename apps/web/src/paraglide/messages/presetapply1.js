/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presetapply1Inputs */

const en_presetapply1 = /** @type {(inputs: Presetapply1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Apply`)
};

const es_presetapply1 = /** @type {(inputs: Presetapply1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aplicar`)
};

const zh_presetapply1 = /** @type {(inputs: Presetapply1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`应用`)
};

const ja_presetapply1 = /** @type {(inputs: Presetapply1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`適用する`)
};

const ko_presetapply1 = /** @type {(inputs: Presetapply1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`적용하다`)
};

const zh_hant1_presetapply1 = /** @type {(inputs: Presetapply1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`應用`)
};

const de_presetapply1 = /** @type {(inputs: Presetapply1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Anwenden`)
};

const fr_presetapply1 = /** @type {(inputs: Presetapply1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Appliquer`)
};

/**
* | output |
* | --- |
* | "Apply" |
*
* @param {Presetapply1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const presetapply1 = /** @type {((inputs?: Presetapply1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetapply1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presetapply1(inputs)
	if (locale === "es") return es_presetapply1(inputs)
	if (locale === "zh") return zh_presetapply1(inputs)
	if (locale === "ja") return ja_presetapply1(inputs)
	if (locale === "ko") return ko_presetapply1(inputs)
	if (locale === "zh-Hant") return zh_hant1_presetapply1(inputs)
	if (locale === "de") return de_presetapply1(inputs)
	return fr_presetapply1(inputs)
});
export { presetapply1 as "presetApply" }