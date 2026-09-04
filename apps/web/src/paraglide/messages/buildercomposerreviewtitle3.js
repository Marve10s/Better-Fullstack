/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Buildercomposerreviewtitle3Inputs */

const en_buildercomposerreviewtitle3 = /** @type {(inputs: Buildercomposerreviewtitle3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Review ${i?.name}`)
};

const es_buildercomposerreviewtitle3 = /** @type {(inputs: Buildercomposerreviewtitle3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Review ${i?.name}`)
};

const zh_buildercomposerreviewtitle3 = /** @type {(inputs: Buildercomposerreviewtitle3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Review ${i?.name}`)
};

const ja_buildercomposerreviewtitle3 = /** @type {(inputs: Buildercomposerreviewtitle3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Review ${i?.name}`)
};

const ko_buildercomposerreviewtitle3 = /** @type {(inputs: Buildercomposerreviewtitle3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Review ${i?.name}`)
};

const zh_hant1_buildercomposerreviewtitle3 = /** @type {(inputs: Buildercomposerreviewtitle3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Review ${i?.name}`)
};

const de_buildercomposerreviewtitle3 = /** @type {(inputs: Buildercomposerreviewtitle3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Review ${i?.name}`)
};

const fr_buildercomposerreviewtitle3 = /** @type {(inputs: Buildercomposerreviewtitle3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Review ${i?.name}`)
};

const uk_buildercomposerreviewtitle3 = /** @type {(inputs: Buildercomposerreviewtitle3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Review ${i?.name}`)
};

/**
* | output |
* | --- |
* | "Review {name}" |
*
* @param {Buildercomposerreviewtitle3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerreviewtitle3 = /** @type {((inputs: Buildercomposerreviewtitle3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerreviewtitle3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerreviewtitle3(inputs)
	if (locale === "zh") return zh_buildercomposerreviewtitle3(inputs)
	if (locale === "ja") return ja_buildercomposerreviewtitle3(inputs)
	if (locale === "ko") return ko_buildercomposerreviewtitle3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerreviewtitle3(inputs)
	if (locale === "de") return de_buildercomposerreviewtitle3(inputs)
	if (locale === "fr") return fr_buildercomposerreviewtitle3(inputs)
	if (locale === "uk") return uk_buildercomposerreviewtitle3(inputs)
	return en_buildercomposerreviewtitle3(inputs)
});
export { buildercomposerreviewtitle3 as "builderComposerReviewTitle" }