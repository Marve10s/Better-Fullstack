/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20261001imagealt3Inputs */

const en_changelogrelease20261001imagealt3 = /** @type {(inputs: Changelogrelease20261001imagealt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Solid, Effect, and TanStack logos on a soft neutral background`)
};

const es_changelogrelease20261001imagealt3 = /** @type {(inputs: Changelogrelease20261001imagealt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Logotipos de Solid, Effect y TanStack sobre un fondo neutro suave`)
};

const zh_changelogrelease20261001imagealt3 = /** @type {(inputs: Changelogrelease20261001imagealt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`柔和中性背景上的 Solid、Effect 和 TanStack 标志`)
};

const ja_changelogrelease20261001imagealt3 = /** @type {(inputs: Changelogrelease20261001imagealt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`淡いニュートラルな背景に Solid、Effect、TanStack のロゴ`)
};

const ko_changelogrelease20261001imagealt3 = /** @type {(inputs: Changelogrelease20261001imagealt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`부드러운 중립 배경 위의 Solid, Effect, TanStack 로고`)
};

const zh_hant1_changelogrelease20261001imagealt3 = /** @type {(inputs: Changelogrelease20261001imagealt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`柔和中性背景上的 Solid、Effect 與 TanStack 標誌`)
};

const de_changelogrelease20261001imagealt3 = /** @type {(inputs: Changelogrelease20261001imagealt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Logos von Solid, Effect und TanStack auf hellem, neutralem Hintergrund`)
};

const fr_changelogrelease20261001imagealt3 = /** @type {(inputs: Changelogrelease20261001imagealt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Logos de Solid, Effect et TanStack sur un fond neutre et doux`)
};

const uk_changelogrelease20261001imagealt3 = /** @type {(inputs: Changelogrelease20261001imagealt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Логотипи Solid, Effect і TanStack на м'якому нейтральному тлі`)
};

/**
* | output |
* | --- |
* | "Solid, Effect, and TanStack logos on a soft neutral background" |
*
* @param {Changelogrelease20261001imagealt3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changelogrelease20261001imagealt3 = /** @type {((inputs?: Changelogrelease20261001imagealt3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20261001imagealt3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_changelogrelease20261001imagealt3(inputs)
	if (locale === "zh") return zh_changelogrelease20261001imagealt3(inputs)
	if (locale === "ja") return ja_changelogrelease20261001imagealt3(inputs)
	if (locale === "ko") return ko_changelogrelease20261001imagealt3(inputs)
	if (locale === "zh-Hant") return zh_hant1_changelogrelease20261001imagealt3(inputs)
	if (locale === "de") return de_changelogrelease20261001imagealt3(inputs)
	if (locale === "fr") return fr_changelogrelease20261001imagealt3(inputs)
	if (locale === "uk") return uk_changelogrelease20261001imagealt3(inputs)
	return en_changelogrelease20261001imagealt3(inputs)
});
export { changelogrelease20261001imagealt3 as "changelogRelease20261001ImageAlt" }