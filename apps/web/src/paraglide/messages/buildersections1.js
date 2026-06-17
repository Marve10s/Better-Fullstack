/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildersections1Inputs */

const en_buildersections1 = /** @type {(inputs: Buildersections1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sections`)
};

const es_buildersections1 = /** @type {(inputs: Buildersections1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Secciones`)
};

const zh_buildersections1 = /** @type {(inputs: Buildersections1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`分区`)
};

const ja_buildersections1 = /** @type {(inputs: Buildersections1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`セクション`)
};

const ko_buildersections1 = /** @type {(inputs: Buildersections1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`섹션`)
};

const zh_hant1_buildersections1 = /** @type {(inputs: Buildersections1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`分割區`)
};

const de_buildersections1 = /** @type {(inputs: Buildersections1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abschnitte`)
};

const fr_buildersections1 = /** @type {(inputs: Buildersections1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sections`)
};

/**
* | output |
* | --- |
* | "Sections" |
*
* @param {Buildersections1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const buildersections1 = /** @type {((inputs?: Buildersections1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildersections1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildersections1(inputs)
	if (locale === "es") return es_buildersections1(inputs)
	if (locale === "zh") return zh_buildersections1(inputs)
	if (locale === "ja") return ja_buildersections1(inputs)
	if (locale === "ko") return ko_buildersections1(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildersections1(inputs)
	if (locale === "de") return de_buildersections1(inputs)
	return fr_buildersections1(inputs)
});
export { buildersections1 as "builderSections" }