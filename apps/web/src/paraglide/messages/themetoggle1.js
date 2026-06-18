/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Themetoggle1Inputs */

const en_themetoggle1 = /** @type {(inputs: Themetoggle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Toggle theme`)
};

const es_themetoggle1 = /** @type {(inputs: Themetoggle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cambiar tema`)
};

const zh_themetoggle1 = /** @type {(inputs: Themetoggle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`切换主题`)
};

const ja_themetoggle1 = /** @type {(inputs: Themetoggle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`テーマの切り替え`)
};

const ko_themetoggle1 = /** @type {(inputs: Themetoggle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`테마 전환`)
};

const zh_hant1_themetoggle1 = /** @type {(inputs: Themetoggle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`切換主題`)
};

const de_themetoggle1 = /** @type {(inputs: Themetoggle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Thema umschalten`)
};

const fr_themetoggle1 = /** @type {(inputs: Themetoggle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Changer de thème`)
};

/**
* | output |
* | --- |
* | "Toggle theme" |
*
* @param {Themetoggle1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const themetoggle1 = /** @type {((inputs?: Themetoggle1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Themetoggle1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_themetoggle1(inputs)
	if (locale === "es") return es_themetoggle1(inputs)
	if (locale === "zh") return zh_themetoggle1(inputs)
	if (locale === "ja") return ja_themetoggle1(inputs)
	if (locale === "ko") return ko_themetoggle1(inputs)
	if (locale === "zh-Hant") return zh_hant1_themetoggle1(inputs)
	if (locale === "de") return de_themetoggle1(inputs)
	return fr_themetoggle1(inputs)
});
export { themetoggle1 as "themeToggle" }