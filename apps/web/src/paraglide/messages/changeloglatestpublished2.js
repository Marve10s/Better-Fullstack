/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ date: NonNullable<unknown> }} Changeloglatestpublished2Inputs */



/**
* | output |
* | --- |
* | "Latest release published {date}." |
*
* @param {Changeloglatestpublished2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changeloglatestpublished2 = /** @type {((inputs: Changeloglatestpublished2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changeloglatestpublished2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`Última versión publicada el ${i?.date}.`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`最新版本发布于 ${i?.date}。`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`最新リリースは ${i?.date} として公開されました。`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`최신 릴리스는 ${i?.date}에 게시되었습니다.`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`最新版本發佈於 ${i?.date}。`)
	if (locale === "de") return /** @type {LocalizedString} */ (`Neueste Version veröffentlicht ${i?.date}.`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`Dernière version publiée ${i?.date}.`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`Останній реліз опубліковано ${i?.date}.`)
	return /** @type {LocalizedString} */ (`Latest release published ${i?.date}.`)
});
export { changeloglatestpublished2 as "changelogLatestPublished" }