/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sharebuttoncopytitle3Inputs */

const en_sharebuttoncopytitle3 = /** @type {(inputs: Sharebuttoncopytitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copy share link`)
};

const es_sharebuttoncopytitle3 = /** @type {(inputs: Sharebuttoncopytitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copiar enlace para compartir`)
};

const zh_sharebuttoncopytitle3 = /** @type {(inputs: Sharebuttoncopytitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制分享链接`)
};

const ja_sharebuttoncopytitle3 = /** @type {(inputs: Sharebuttoncopytitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`共有リンクをコピーする`)
};

const ko_sharebuttoncopytitle3 = /** @type {(inputs: Sharebuttoncopytitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`공유 링크 복사`)
};

const zh_hant1_sharebuttoncopytitle3 = /** @type {(inputs: Sharebuttoncopytitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`複製分享連結`)
};

const de_sharebuttoncopytitle3 = /** @type {(inputs: Sharebuttoncopytitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Teilen-Link kopieren`)
};

const fr_sharebuttoncopytitle3 = /** @type {(inputs: Sharebuttoncopytitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copier le lien de partage`)
};

/**
* | output |
* | --- |
* | "Copy share link" |
*
* @param {Sharebuttoncopytitle3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const sharebuttoncopytitle3 = /** @type {((inputs?: Sharebuttoncopytitle3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sharebuttoncopytitle3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sharebuttoncopytitle3(inputs)
	if (locale === "es") return es_sharebuttoncopytitle3(inputs)
	if (locale === "zh") return zh_sharebuttoncopytitle3(inputs)
	if (locale === "ja") return ja_sharebuttoncopytitle3(inputs)
	if (locale === "ko") return ko_sharebuttoncopytitle3(inputs)
	if (locale === "zh-Hant") return zh_hant1_sharebuttoncopytitle3(inputs)
	if (locale === "de") return de_sharebuttoncopytitle3(inputs)
	return fr_sharebuttoncopytitle3(inputs)
});
export { sharebuttoncopytitle3 as "shareButtonCopyTitle" }