/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changeloglatestrelease2Inputs */

const en_changeloglatestrelease2 = /** @type {(inputs: Changeloglatestrelease2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Latest release`)
};

const es_changeloglatestrelease2 = /** @type {(inputs: Changeloglatestrelease2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Última versión`)
};

const zh_changeloglatestrelease2 = /** @type {(inputs: Changeloglatestrelease2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新版本`)
};

const ja_changeloglatestrelease2 = /** @type {(inputs: Changeloglatestrelease2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新リリース`)
};

const ko_changeloglatestrelease2 = /** @type {(inputs: Changeloglatestrelease2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`최신 릴리스`)
};

const zh_hant1_changeloglatestrelease2 = /** @type {(inputs: Changeloglatestrelease2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新版本`)
};

const de_changeloglatestrelease2 = /** @type {(inputs: Changeloglatestrelease2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Neueste Veröffentlichung`)
};

const fr_changeloglatestrelease2 = /** @type {(inputs: Changeloglatestrelease2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dernière version`)
};

/**
* | output |
* | --- |
* | "Latest release" |
*
* @param {Changeloglatestrelease2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const changeloglatestrelease2 = /** @type {((inputs?: Changeloglatestrelease2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changeloglatestrelease2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changeloglatestrelease2(inputs)
	if (locale === "es") return es_changeloglatestrelease2(inputs)
	if (locale === "zh") return zh_changeloglatestrelease2(inputs)
	if (locale === "ja") return ja_changeloglatestrelease2(inputs)
	if (locale === "ko") return ko_changeloglatestrelease2(inputs)
	if (locale === "zh-Hant") return zh_hant1_changeloglatestrelease2(inputs)
	if (locale === "de") return de_changeloglatestrelease2(inputs)
	return fr_changeloglatestrelease2(inputs)
});
export { changeloglatestrelease2 as "changelogLatestRelease" }