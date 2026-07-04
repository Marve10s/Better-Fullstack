/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ date: NonNullable<unknown> }} Changeloglatestpublished2Inputs */

const en_changeloglatestpublished2 = /** @type {(inputs: Changeloglatestpublished2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Latest release published ${i?.date}.`)
};

const es_changeloglatestpublished2 = /** @type {(inputs: Changeloglatestpublished2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Última versión publicada el ${i?.date}.`)
};

const zh_changeloglatestpublished2 = /** @type {(inputs: Changeloglatestpublished2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`最新版本发布于 ${i?.date}。`)
};

const ja_changeloglatestpublished2 = /** @type {(inputs: Changeloglatestpublished2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`最新リリースは ${i?.date} として公開されました。`)
};

const ko_changeloglatestpublished2 = /** @type {(inputs: Changeloglatestpublished2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`최신 릴리스는 ${i?.date}에 게시되었습니다.`)
};

const zh_hant1_changeloglatestpublished2 = /** @type {(inputs: Changeloglatestpublished2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`最新版本發佈於 ${i?.date}。`)
};

const de_changeloglatestpublished2 = /** @type {(inputs: Changeloglatestpublished2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Neueste Version veröffentlicht ${i?.date}.`)
};

const fr_changeloglatestpublished2 = /** @type {(inputs: Changeloglatestpublished2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Dernière version publiée ${i?.date}.`)
};

/**
* | output |
* | --- |
* | "Latest release published {date}." |
*
* @param {Changeloglatestpublished2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const changeloglatestpublished2 = /** @type {((inputs: Changeloglatestpublished2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changeloglatestpublished2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changeloglatestpublished2(inputs)
	if (locale === "es") return es_changeloglatestpublished2(inputs)
	if (locale === "zh") return zh_changeloglatestpublished2(inputs)
	if (locale === "ja") return ja_changeloglatestpublished2(inputs)
	if (locale === "ko") return ko_changeloglatestpublished2(inputs)
	if (locale === "zh-Hant") return zh_hant1_changeloglatestpublished2(inputs)
	if (locale === "de") return de_changeloglatestpublished2(inputs)
	return fr_changeloglatestpublished2(inputs)
});
export { changeloglatestpublished2 as "changelogLatestPublished" }