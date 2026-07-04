/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sharelinkcopyfailed3Inputs */

const en_sharelinkcopyfailed3 = /** @type {(inputs: Sharelinkcopyfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to copy link`)
};

const es_sharelinkcopyfailed3 = /** @type {(inputs: Sharelinkcopyfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No se pudo copiar el enlace`)
};

const zh_sharelinkcopyfailed3 = /** @type {(inputs: Sharelinkcopyfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制链接失败`)
};

const ja_sharelinkcopyfailed3 = /** @type {(inputs: Sharelinkcopyfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`リンクのコピーに失敗しました`)
};

const ko_sharelinkcopyfailed3 = /** @type {(inputs: Sharelinkcopyfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`링크를 복사하지 못했습니다.`)
};

const zh_hant1_sharelinkcopyfailed3 = /** @type {(inputs: Sharelinkcopyfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`複製連結失敗`)
};

const de_sharelinkcopyfailed3 = /** @type {(inputs: Sharelinkcopyfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Link konnte nicht kopiert werden`)
};

const fr_sharelinkcopyfailed3 = /** @type {(inputs: Sharelinkcopyfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Échec de la copie du lien`)
};

/**
* | output |
* | --- |
* | "Failed to copy link" |
*
* @param {Sharelinkcopyfailed3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const sharelinkcopyfailed3 = /** @type {((inputs?: Sharelinkcopyfailed3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sharelinkcopyfailed3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sharelinkcopyfailed3(inputs)
	if (locale === "es") return es_sharelinkcopyfailed3(inputs)
	if (locale === "zh") return zh_sharelinkcopyfailed3(inputs)
	if (locale === "ja") return ja_sharelinkcopyfailed3(inputs)
	if (locale === "ko") return ko_sharelinkcopyfailed3(inputs)
	if (locale === "zh-Hant") return zh_hant1_sharelinkcopyfailed3(inputs)
	if (locale === "de") return de_sharelinkcopyfailed3(inputs)
	return fr_sharelinkcopyfailed3(inputs)
});
export { sharelinkcopyfailed3 as "shareLinkCopyFailed" }