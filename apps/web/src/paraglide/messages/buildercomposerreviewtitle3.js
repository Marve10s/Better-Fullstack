/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Buildercomposerreviewtitle3Inputs */



/**
* | output |
* | --- |
* | "Review {name}" |
*
* @param {Buildercomposerreviewtitle3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerreviewtitle3 = /** @type {((inputs: Buildercomposerreviewtitle3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerreviewtitle3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`Revisar ${i?.name}`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`检查 ${i?.name}`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.name} を確認`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`${i?.name} 검토`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`檢查 ${i?.name}`)
	if (locale === "de") return /** @type {LocalizedString} */ (`${i?.name} überprüfen`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`Vérifier ${i?.name}`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`Перевірити ${i?.name}`)
	return /** @type {LocalizedString} */ (`Review ${i?.name}`)
});
export { buildercomposerreviewtitle3 as "builderComposerReviewTitle" }