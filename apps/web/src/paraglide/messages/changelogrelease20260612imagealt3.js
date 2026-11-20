/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20260612imagealt3Inputs */



/**
* | output |
* | --- |
* | "Abstract colorful gradient artwork" |
*
* @param {Changelogrelease20260612imagealt3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changelogrelease20260612imagealt3 = /** @type {((inputs?: Changelogrelease20260612imagealt3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20260612imagealt3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Arte abstracto de gradiente colorido")
	if (locale === "zh") return /** @type {LocalizedString} */ ("抽象彩色渐变艺术图")
	if (locale === "ja") return /** @type {LocalizedString} */ ("抽象的なカラフルなグラデーションのアートワーク")
	if (locale === "ko") return /** @type {LocalizedString} */ ("추상 화려한 그라데이션 작품")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("抽象彩色漸層藝術圖")
	if (locale === "de") return /** @type {LocalizedString} */ ("Abstrakte farbenfrohe Farbverlaufsgrafik")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Oeuvre abstraite dégradé coloré")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Абстрактна кольорова градієнтна ілюстрація")
	return /** @type {LocalizedString} */ ("Abstract colorful gradient artwork")
});
export { changelogrelease20260612imagealt3 as "changelogRelease20260612ImageAlt" }