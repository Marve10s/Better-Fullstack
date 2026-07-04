/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildersharelinkcopied3Inputs */

const en_buildersharelinkcopied3 = /** @type {(inputs: Buildersharelinkcopied3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Share link copied!`)
};

const es_buildersharelinkcopied3 = /** @type {(inputs: Buildersharelinkcopied3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enlace copiado.`)
};

const zh_buildersharelinkcopied3 = /** @type {(inputs: Buildersharelinkcopied3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`分享链接已复制！`)
};

const ja_buildersharelinkcopied3 = /** @type {(inputs: Buildersharelinkcopied3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`共有リンクがコピーされました!`)
};

const ko_buildersharelinkcopied3 = /** @type {(inputs: Buildersharelinkcopied3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`공유 링크가 복사되었습니다!`)
};

const zh_hant1_buildersharelinkcopied3 = /** @type {(inputs: Buildersharelinkcopied3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`分享連結已複製！`)
};

const de_buildersharelinkcopied3 = /** @type {(inputs: Buildersharelinkcopied3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Teilen-Link kopiert!`)
};

const fr_buildersharelinkcopied3 = /** @type {(inputs: Buildersharelinkcopied3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lien de partage copié !`)
};

const uk_buildersharelinkcopied3 = /** @type {(inputs: Buildersharelinkcopied3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Посилання для спільного доступу скопійовано!`)
};

/**
* | output |
* | --- |
* | "Share link copied!" |
*
* @param {Buildersharelinkcopied3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildersharelinkcopied3 = /** @type {((inputs?: Buildersharelinkcopied3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildersharelinkcopied3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildersharelinkcopied3(inputs)
	if (locale === "es") return es_buildersharelinkcopied3(inputs)
	if (locale === "zh") return zh_buildersharelinkcopied3(inputs)
	if (locale === "ja") return ja_buildersharelinkcopied3(inputs)
	if (locale === "ko") return ko_buildersharelinkcopied3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildersharelinkcopied3(inputs)
	if (locale === "de") return de_buildersharelinkcopied3(inputs)
	if (locale === "fr") return fr_buildersharelinkcopied3(inputs)
	return uk_buildersharelinkcopied3(inputs)
});
export { buildersharelinkcopied3 as "builderShareLinkCopied" }