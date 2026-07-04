/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changeloglatestupdate2Inputs */

const en_changeloglatestupdate2 = /** @type {(inputs: Changeloglatestupdate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Latest update`)
};

const es_changeloglatestupdate2 = /** @type {(inputs: Changeloglatestupdate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Última actualización`)
};

const zh_changeloglatestupdate2 = /** @type {(inputs: Changeloglatestupdate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新更新`)
};

const ja_changeloglatestupdate2 = /** @type {(inputs: Changeloglatestupdate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新のアップデート`)
};

const ko_changeloglatestupdate2 = /** @type {(inputs: Changeloglatestupdate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`최신 업데이트`)
};

const zh_hant1_changeloglatestupdate2 = /** @type {(inputs: Changeloglatestupdate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新更新`)
};

const de_changeloglatestupdate2 = /** @type {(inputs: Changeloglatestupdate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Neuestes Update`)
};

const fr_changeloglatestupdate2 = /** @type {(inputs: Changeloglatestupdate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dernière mise à jour`)
};

const uk_changeloglatestupdate2 = /** @type {(inputs: Changeloglatestupdate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Останнє оновлення`)
};

/**
* | output |
* | --- |
* | "Latest update" |
*
* @param {Changeloglatestupdate2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changeloglatestupdate2 = /** @type {((inputs?: Changeloglatestupdate2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changeloglatestupdate2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changeloglatestupdate2(inputs)
	if (locale === "es") return es_changeloglatestupdate2(inputs)
	if (locale === "zh") return zh_changeloglatestupdate2(inputs)
	if (locale === "ja") return ja_changeloglatestupdate2(inputs)
	if (locale === "ko") return ko_changeloglatestupdate2(inputs)
	if (locale === "zh-Hant") return zh_hant1_changeloglatestupdate2(inputs)
	if (locale === "de") return de_changeloglatestupdate2(inputs)
	if (locale === "fr") return fr_changeloglatestupdate2(inputs)
	return uk_changeloglatestupdate2(inputs)
});
export { changeloglatestupdate2 as "changelogLatestUpdate" }