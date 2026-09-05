/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerreview2Inputs */

const en_buildercomposerreview2 = /** @type {(inputs: Buildercomposerreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Review`)
};

const es_buildercomposerreview2 = /** @type {(inputs: Buildercomposerreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Revisar`)
};

const zh_buildercomposerreview2 = /** @type {(inputs: Buildercomposerreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`检查`)
};

const ja_buildercomposerreview2 = /** @type {(inputs: Buildercomposerreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`確認`)
};

const ko_buildercomposerreview2 = /** @type {(inputs: Buildercomposerreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`검토`)
};

const zh_hant1_buildercomposerreview2 = /** @type {(inputs: Buildercomposerreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`檢查`)
};

const de_buildercomposerreview2 = /** @type {(inputs: Buildercomposerreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Überprüfen`)
};

const fr_buildercomposerreview2 = /** @type {(inputs: Buildercomposerreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vérifier`)
};

const uk_buildercomposerreview2 = /** @type {(inputs: Buildercomposerreview2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Перевірка`)
};

/**
* | output |
* | --- |
* | "Review" |
*
* @param {Buildercomposerreview2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerreview2 = /** @type {((inputs?: Buildercomposerreview2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerreview2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerreview2(inputs)
	if (locale === "zh") return zh_buildercomposerreview2(inputs)
	if (locale === "ja") return ja_buildercomposerreview2(inputs)
	if (locale === "ko") return ko_buildercomposerreview2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerreview2(inputs)
	if (locale === "de") return de_buildercomposerreview2(inputs)
	if (locale === "fr") return fr_buildercomposerreview2(inputs)
	if (locale === "uk") return uk_buildercomposerreview2(inputs)
	return en_buildercomposerreview2(inputs)
});
export { buildercomposerreview2 as "builderComposerReview" }