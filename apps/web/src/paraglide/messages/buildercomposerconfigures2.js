/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerconfigures2Inputs */

const en_buildercomposerconfigures2 = /** @type {(inputs: Buildercomposerconfigures2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Then choose`)
};

const es_buildercomposerconfigures2 = /** @type {(inputs: Buildercomposerconfigures2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Luego elige`)
};

const zh_buildercomposerconfigures2 = /** @type {(inputs: Buildercomposerconfigures2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`然后选择`)
};

const ja_buildercomposerconfigures2 = /** @type {(inputs: Buildercomposerconfigures2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`次に選択`)
};

const ko_buildercomposerconfigures2 = /** @type {(inputs: Buildercomposerconfigures2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`다음 선택`)
};

const zh_hant1_buildercomposerconfigures2 = /** @type {(inputs: Buildercomposerconfigures2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`然後選擇`)
};

const de_buildercomposerconfigures2 = /** @type {(inputs: Buildercomposerconfigures2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dann wählen`)
};

const fr_buildercomposerconfigures2 = /** @type {(inputs: Buildercomposerconfigures2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Puis choisissez`)
};

const uk_buildercomposerconfigures2 = /** @type {(inputs: Buildercomposerconfigures2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Потім оберіть`)
};

/**
* | output |
* | --- |
* | "Then choose" |
*
* @param {Buildercomposerconfigures2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerconfigures2 = /** @type {((inputs?: Buildercomposerconfigures2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerconfigures2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerconfigures2(inputs)
	if (locale === "zh") return zh_buildercomposerconfigures2(inputs)
	if (locale === "ja") return ja_buildercomposerconfigures2(inputs)
	if (locale === "ko") return ko_buildercomposerconfigures2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerconfigures2(inputs)
	if (locale === "de") return de_buildercomposerconfigures2(inputs)
	if (locale === "fr") return fr_buildercomposerconfigures2(inputs)
	if (locale === "uk") return uk_buildercomposerconfigures2(inputs)
	return en_buildercomposerconfigures2(inputs)
});
export { buildercomposerconfigures2 as "builderComposerConfigures" }