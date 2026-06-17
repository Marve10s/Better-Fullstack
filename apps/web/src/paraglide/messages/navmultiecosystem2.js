/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navmultiecosystem2Inputs */

const en_navmultiecosystem2 = /** @type {(inputs: Navmultiecosystem2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Multi-Ecosystem`)
};

const es_navmultiecosystem2 = /** @type {(inputs: Navmultiecosystem2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Multi-ecosistema`)
};

const zh_navmultiecosystem2 = /** @type {(inputs: Navmultiecosystem2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`多生态`)
};

const ja_navmultiecosystem2 = /** @type {(inputs: Navmultiecosystem2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`マルチエコシステム`)
};

const ko_navmultiecosystem2 = /** @type {(inputs: Navmultiecosystem2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`다중 생태계`)
};

const zh_hant1_navmultiecosystem2 = /** @type {(inputs: Navmultiecosystem2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`多元生態`)
};

const de_navmultiecosystem2 = /** @type {(inputs: Navmultiecosystem2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Multi-Ökosystem`)
};

const fr_navmultiecosystem2 = /** @type {(inputs: Navmultiecosystem2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Multi-écosystème`)
};

/**
* | output |
* | --- |
* | "Multi-Ecosystem" |
*
* @param {Navmultiecosystem2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const navmultiecosystem2 = /** @type {((inputs?: Navmultiecosystem2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navmultiecosystem2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navmultiecosystem2(inputs)
	if (locale === "es") return es_navmultiecosystem2(inputs)
	if (locale === "zh") return zh_navmultiecosystem2(inputs)
	if (locale === "ja") return ja_navmultiecosystem2(inputs)
	if (locale === "ko") return ko_navmultiecosystem2(inputs)
	if (locale === "zh-Hant") return zh_hant1_navmultiecosystem2(inputs)
	if (locale === "de") return de_navmultiecosystem2(inputs)
	return fr_navmultiecosystem2(inputs)
});
export { navmultiecosystem2 as "navMultiEcosystem" }