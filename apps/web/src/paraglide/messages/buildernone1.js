/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildernone1Inputs */

const en_buildernone1 = /** @type {(inputs: Buildernone1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`None`)
};

const es_buildernone1 = /** @type {(inputs: Buildernone1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ninguno`)
};

const zh_buildernone1 = /** @type {(inputs: Buildernone1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`无`)
};

const ja_buildernone1 = /** @type {(inputs: Buildernone1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`なし`)
};

const ko_buildernone1 = /** @type {(inputs: Buildernone1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`없음`)
};

const zh_hant1_buildernone1 = /** @type {(inputs: Buildernone1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`無`)
};

const de_buildernone1 = /** @type {(inputs: Buildernone1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Keiner`)
};

const fr_buildernone1 = /** @type {(inputs: Buildernone1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aucun`)
};

/**
* | output |
* | --- |
* | "None" |
*
* @param {Buildernone1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const buildernone1 = /** @type {((inputs?: Buildernone1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildernone1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildernone1(inputs)
	if (locale === "es") return es_buildernone1(inputs)
	if (locale === "zh") return zh_buildernone1(inputs)
	if (locale === "ja") return ja_buildernone1(inputs)
	if (locale === "ko") return ko_buildernone1(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildernone1(inputs)
	if (locale === "de") return de_buildernone1(inputs)
	return fr_buildernone1(inputs)
});
export { buildernone1 as "builderNone" }