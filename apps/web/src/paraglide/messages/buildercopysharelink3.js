/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercopysharelink3Inputs */

const en_buildercopysharelink3 = /** @type {(inputs: Buildercopysharelink3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copy Share Link`)
};

const es_buildercopysharelink3 = /** @type {(inputs: Buildercopysharelink3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copiar enlace para compartir`)
};

const zh_buildercopysharelink3 = /** @type {(inputs: Buildercopysharelink3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制分享链接`)
};

const ja_buildercopysharelink3 = /** @type {(inputs: Buildercopysharelink3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`共有リンクをコピー`)
};

const ko_buildercopysharelink3 = /** @type {(inputs: Buildercopysharelink3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`공유 링크 복사`)
};

const zh_hant1_buildercopysharelink3 = /** @type {(inputs: Buildercopysharelink3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`複製分享連結`)
};

const de_buildercopysharelink3 = /** @type {(inputs: Buildercopysharelink3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Teilen-Link kopieren`)
};

const fr_buildercopysharelink3 = /** @type {(inputs: Buildercopysharelink3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copier le lien de partage`)
};

/**
* | output |
* | --- |
* | "Copy Share Link" |
*
* @param {Buildercopysharelink3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const buildercopysharelink3 = /** @type {((inputs?: Buildercopysharelink3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercopysharelink3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildercopysharelink3(inputs)
	if (locale === "es") return es_buildercopysharelink3(inputs)
	if (locale === "zh") return zh_buildercopysharelink3(inputs)
	if (locale === "ja") return ja_buildercopysharelink3(inputs)
	if (locale === "ko") return ko_buildercopysharelink3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercopysharelink3(inputs)
	if (locale === "de") return de_buildercopysharelink3(inputs)
	return fr_buildercopysharelink3(inputs)
});
export { buildercopysharelink3 as "builderCopyShareLink" }