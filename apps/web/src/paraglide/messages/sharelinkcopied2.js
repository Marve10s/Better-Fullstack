/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sharelinkcopied2Inputs */

const en_sharelinkcopied2 = /** @type {(inputs: Sharelinkcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Link copied to clipboard!`)
};

const es_sharelinkcopied2 = /** @type {(inputs: Sharelinkcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enlace copiado al portapapeles.`)
};

const zh_sharelinkcopied2 = /** @type {(inputs: Sharelinkcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`链接已复制到剪贴板！`)
};

const ja_sharelinkcopied2 = /** @type {(inputs: Sharelinkcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`リンクがクリップボードにコピーされました!`)
};

const ko_sharelinkcopied2 = /** @type {(inputs: Sharelinkcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`링크가 클립보드에 복사되었습니다!`)
};

const zh_hant1_sharelinkcopied2 = /** @type {(inputs: Sharelinkcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`連結已複製到剪貼簿！`)
};

const de_sharelinkcopied2 = /** @type {(inputs: Sharelinkcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Link in die Zwischenablage kopiert!`)
};

const fr_sharelinkcopied2 = /** @type {(inputs: Sharelinkcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lien copié dans le presse-papier !`)
};

const uk_sharelinkcopied2 = /** @type {(inputs: Sharelinkcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Посилання скопійовано в буфер обміну!`)
};

/**
* | output |
* | --- |
* | "Link copied to clipboard!" |
*
* @param {Sharelinkcopied2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const sharelinkcopied2 = /** @type {((inputs?: Sharelinkcopied2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sharelinkcopied2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sharelinkcopied2(inputs)
	if (locale === "es") return es_sharelinkcopied2(inputs)
	if (locale === "zh") return zh_sharelinkcopied2(inputs)
	if (locale === "ja") return ja_sharelinkcopied2(inputs)
	if (locale === "ko") return ko_sharelinkcopied2(inputs)
	if (locale === "zh-Hant") return zh_hant1_sharelinkcopied2(inputs)
	if (locale === "de") return de_sharelinkcopied2(inputs)
	if (locale === "fr") return fr_sharelinkcopied2(inputs)
	return uk_sharelinkcopied2(inputs)
});
export { sharelinkcopied2 as "shareLinkCopied" }