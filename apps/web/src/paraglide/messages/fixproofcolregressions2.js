/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofcolregressions2Inputs */

const en_fixproofcolregressions2 = /** @type {(inputs: Fixproofcolregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Regressions`)
};

const es_fixproofcolregressions2 = /** @type {(inputs: Fixproofcolregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Regresiones`)
};

const zh_fixproofcolregressions2 = /** @type {(inputs: Fixproofcolregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`回归`)
};

const ja_fixproofcolregressions2 = /** @type {(inputs: Fixproofcolregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`リグレッション`)
};

const ko_fixproofcolregressions2 = /** @type {(inputs: Fixproofcolregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`회귀`)
};

const zh_hant1_fixproofcolregressions2 = /** @type {(inputs: Fixproofcolregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`迴歸`)
};

const de_fixproofcolregressions2 = /** @type {(inputs: Fixproofcolregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Regressionen`)
};

const fr_fixproofcolregressions2 = /** @type {(inputs: Fixproofcolregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Régressions`)
};

const uk_fixproofcolregressions2 = /** @type {(inputs: Fixproofcolregressions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Регресії`)
};

/**
* | output |
* | --- |
* | "Regressions" |
*
* @param {Fixproofcolregressions2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofcolregressions2 = /** @type {((inputs?: Fixproofcolregressions2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofcolregressions2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofcolregressions2(inputs)
	if (locale === "zh") return zh_fixproofcolregressions2(inputs)
	if (locale === "ja") return ja_fixproofcolregressions2(inputs)
	if (locale === "ko") return ko_fixproofcolregressions2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofcolregressions2(inputs)
	if (locale === "de") return de_fixproofcolregressions2(inputs)
	if (locale === "fr") return fr_fixproofcolregressions2(inputs)
	if (locale === "uk") return uk_fixproofcolregressions2(inputs)
	return en_fixproofcolregressions2(inputs)
});
export { fixproofcolregressions2 as "fixproofColRegressions" }