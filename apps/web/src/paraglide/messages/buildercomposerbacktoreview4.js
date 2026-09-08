/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerbacktoreview4Inputs */

const en_buildercomposerbacktoreview4 = /** @type {(inputs: Buildercomposerbacktoreview4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Back to review`)
};

const es_buildercomposerbacktoreview4 = /** @type {(inputs: Buildercomposerbacktoreview4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Volver a la revisión`)
};

const zh_buildercomposerbacktoreview4 = /** @type {(inputs: Buildercomposerbacktoreview4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`返回审核`)
};

const ja_buildercomposerbacktoreview4 = /** @type {(inputs: Buildercomposerbacktoreview4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`確認に戻る`)
};

const ko_buildercomposerbacktoreview4 = /** @type {(inputs: Buildercomposerbacktoreview4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`검토로 돌아가기`)
};

const zh_hant1_buildercomposerbacktoreview4 = /** @type {(inputs: Buildercomposerbacktoreview4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`返回檢閱`)
};

const de_buildercomposerbacktoreview4 = /** @type {(inputs: Buildercomposerbacktoreview4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Zurück zur Übersicht`)
};

const fr_buildercomposerbacktoreview4 = /** @type {(inputs: Buildercomposerbacktoreview4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Retour à la révision`)
};

const uk_buildercomposerbacktoreview4 = /** @type {(inputs: Buildercomposerbacktoreview4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Назад до огляду`)
};

/**
* | output |
* | --- |
* | "Back to review" |
*
* @param {Buildercomposerbacktoreview4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerbacktoreview4 = /** @type {((inputs?: Buildercomposerbacktoreview4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerbacktoreview4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerbacktoreview4(inputs)
	if (locale === "zh") return zh_buildercomposerbacktoreview4(inputs)
	if (locale === "ja") return ja_buildercomposerbacktoreview4(inputs)
	if (locale === "ko") return ko_buildercomposerbacktoreview4(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerbacktoreview4(inputs)
	if (locale === "de") return de_buildercomposerbacktoreview4(inputs)
	if (locale === "fr") return fr_buildercomposerbacktoreview4(inputs)
	if (locale === "uk") return uk_buildercomposerbacktoreview4(inputs)
	return en_buildercomposerbacktoreview4(inputs)
});
export { buildercomposerbacktoreview4 as "builderComposerBackToReview" }