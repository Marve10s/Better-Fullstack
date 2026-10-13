/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryshadcnshadcncolortheme6Inputs */

const en_docsclisummaryshadcnshadcncolortheme6 = /** @type {(inputs: Docsclisummaryshadcnshadcncolortheme6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Color theme.`)
};

const es_docsclisummaryshadcnshadcncolortheme6 = /** @type {(inputs: Docsclisummaryshadcnshadcncolortheme6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tema de colores.`)
};

const zh_docsclisummaryshadcnshadcncolortheme6 = /** @type {(inputs: Docsclisummaryshadcnshadcncolortheme6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`颜色主题。`)
};

const ja_docsclisummaryshadcnshadcncolortheme6 = /** @type {(inputs: Docsclisummaryshadcnshadcncolortheme6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`カラーテーマ。`)
};

const ko_docsclisummaryshadcnshadcncolortheme6 = /** @type {(inputs: Docsclisummaryshadcnshadcncolortheme6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`색상 테마.`)
};

const zh_hant1_docsclisummaryshadcnshadcncolortheme6 = /** @type {(inputs: Docsclisummaryshadcnshadcncolortheme6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`色彩主題。`)
};

const de_docsclisummaryshadcnshadcncolortheme6 = /** @type {(inputs: Docsclisummaryshadcnshadcncolortheme6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Farbthema.`)
};

const fr_docsclisummaryshadcnshadcncolortheme6 = /** @type {(inputs: Docsclisummaryshadcnshadcncolortheme6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Thème de couleurs.`)
};

const uk_docsclisummaryshadcnshadcncolortheme6 = /** @type {(inputs: Docsclisummaryshadcnshadcncolortheme6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Колірна тема.`)
};

/**
* | output |
* | --- |
* | "Color theme." |
*
* @param {Docsclisummaryshadcnshadcncolortheme6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryshadcnshadcncolortheme6 = /** @type {((inputs?: Docsclisummaryshadcnshadcncolortheme6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryshadcnshadcncolortheme6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryshadcnshadcncolortheme6(inputs)
	if (locale === "zh") return zh_docsclisummaryshadcnshadcncolortheme6(inputs)
	if (locale === "ja") return ja_docsclisummaryshadcnshadcncolortheme6(inputs)
	if (locale === "ko") return ko_docsclisummaryshadcnshadcncolortheme6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryshadcnshadcncolortheme6(inputs)
	if (locale === "de") return de_docsclisummaryshadcnshadcncolortheme6(inputs)
	if (locale === "fr") return fr_docsclisummaryshadcnshadcncolortheme6(inputs)
	if (locale === "uk") return uk_docsclisummaryshadcnshadcncolortheme6(inputs)
	return en_docsclisummaryshadcnshadcncolortheme6(inputs)
});
export { docsclisummaryshadcnshadcncolortheme6 as "docsCliSummaryShadcnShadcnColorTheme" }