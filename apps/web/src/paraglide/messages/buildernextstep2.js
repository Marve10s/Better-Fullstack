/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildernextstep2Inputs */



/**
* | output |
* | --- |
* | "Next step" |
*
* @param {Buildernextstep2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildernextstep2 = /** @type {((inputs?: Buildernextstep2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildernextstep2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Siguiente paso")
	if (locale === "zh") return /** @type {LocalizedString} */ ("下一步")
	if (locale === "ja") return /** @type {LocalizedString} */ ("次のステップ")
	if (locale === "ko") return /** @type {LocalizedString} */ ("다음 단계")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("下一步")
	if (locale === "de") return /** @type {LocalizedString} */ ("Nächster Schritt")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Étape suivante")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Наступний крок")
	return /** @type {LocalizedString} */ ("Next step")
});
export { buildernextstep2 as "builderNextStep" }