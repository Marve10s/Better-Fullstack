/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildershowless2Inputs */

const en_buildershowless2 = /** @type {(inputs: Buildershowless2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Show less`)
};

const es_buildershowless2 = /** @type {(inputs: Buildershowless2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mostrar menos`)
};

const zh_buildershowless2 = /** @type {(inputs: Buildershowless2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`收起`)
};

const ja_buildershowless2 = /** @type {(inputs: Buildershowless2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`折りたたむ`)
};

const ko_buildershowless2 = /** @type {(inputs: Buildershowless2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`접기`)
};

const zh_hant1_buildershowless2 = /** @type {(inputs: Buildershowless2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`收起`)
};

const de_buildershowless2 = /** @type {(inputs: Buildershowless2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Weniger anzeigen`)
};

const fr_buildershowless2 = /** @type {(inputs: Buildershowless2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Afficher moins`)
};

const uk_buildershowless2 = /** @type {(inputs: Buildershowless2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Показати менше`)
};

/**
* | output |
* | --- |
* | "Show less" |
*
* @param {Buildershowless2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildershowless2 = /** @type {((inputs?: Buildershowless2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildershowless2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildershowless2(inputs)
	if (locale === "zh") return zh_buildershowless2(inputs)
	if (locale === "ja") return ja_buildershowless2(inputs)
	if (locale === "ko") return ko_buildershowless2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildershowless2(inputs)
	if (locale === "de") return de_buildershowless2(inputs)
	if (locale === "fr") return fr_buildershowless2(inputs)
	if (locale === "uk") return uk_buildershowless2(inputs)
	return en_buildershowless2(inputs)
});
export { buildershowless2 as "builderShowLess" }