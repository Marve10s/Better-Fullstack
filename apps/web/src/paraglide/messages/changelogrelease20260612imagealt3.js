/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20260612imagealt3Inputs */

const en_changelogrelease20260612imagealt3 = /** @type {(inputs: Changelogrelease20260612imagealt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abstract colorful gradient artwork`)
};

const es_changelogrelease20260612imagealt3 = /** @type {(inputs: Changelogrelease20260612imagealt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Arte abstracto de gradiente colorido`)
};

const zh_changelogrelease20260612imagealt3 = /** @type {(inputs: Changelogrelease20260612imagealt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`抽象彩色渐变艺术图`)
};

const ja_changelogrelease20260612imagealt3 = /** @type {(inputs: Changelogrelease20260612imagealt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`抽象的なカラフルなグラデーションのアートワーク`)
};

const ko_changelogrelease20260612imagealt3 = /** @type {(inputs: Changelogrelease20260612imagealt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`추상 화려한 그라데이션 작품`)
};

const zh_hant1_changelogrelease20260612imagealt3 = /** @type {(inputs: Changelogrelease20260612imagealt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`抽象彩色漸層藝術圖`)
};

const de_changelogrelease20260612imagealt3 = /** @type {(inputs: Changelogrelease20260612imagealt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abstrakte farbenfrohe Farbverlaufsgrafik`)
};

const fr_changelogrelease20260612imagealt3 = /** @type {(inputs: Changelogrelease20260612imagealt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Oeuvre abstraite dégradé coloré`)
};

/**
* | output |
* | --- |
* | "Abstract colorful gradient artwork" |
*
* @param {Changelogrelease20260612imagealt3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const changelogrelease20260612imagealt3 = /** @type {((inputs?: Changelogrelease20260612imagealt3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20260612imagealt3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changelogrelease20260612imagealt3(inputs)
	if (locale === "es") return es_changelogrelease20260612imagealt3(inputs)
	if (locale === "zh") return zh_changelogrelease20260612imagealt3(inputs)
	if (locale === "ja") return ja_changelogrelease20260612imagealt3(inputs)
	if (locale === "ko") return ko_changelogrelease20260612imagealt3(inputs)
	if (locale === "zh-Hant") return zh_hant1_changelogrelease20260612imagealt3(inputs)
	if (locale === "de") return de_changelogrelease20260612imagealt3(inputs)
	return fr_changelogrelease20260612imagealt3(inputs)
});
export { changelogrelease20260612imagealt3 as "changelogRelease20260612ImageAlt" }