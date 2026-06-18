/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildernext1Inputs */

const en_buildernext1 = /** @type {(inputs: Buildernext1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next`)
};

const es_buildernext1 = /** @type {(inputs: Buildernext1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Siguiente`)
};

const zh_buildernext1 = /** @type {(inputs: Buildernext1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`下一步`)
};

const ja_buildernext1 = /** @type {(inputs: Buildernext1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`次`)
};

const ko_buildernext1 = /** @type {(inputs: Buildernext1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`다음`)
};

const zh_hant1_buildernext1 = /** @type {(inputs: Buildernext1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`下一步`)
};

const de_buildernext1 = /** @type {(inputs: Buildernext1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nächste`)
};

const fr_buildernext1 = /** @type {(inputs: Buildernext1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Suivant`)
};

/**
* | output |
* | --- |
* | "Next" |
*
* @param {Buildernext1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const buildernext1 = /** @type {((inputs?: Buildernext1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildernext1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildernext1(inputs)
	if (locale === "es") return es_buildernext1(inputs)
	if (locale === "zh") return zh_buildernext1(inputs)
	if (locale === "ja") return ja_buildernext1(inputs)
	if (locale === "ko") return ko_buildernext1(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildernext1(inputs)
	if (locale === "de") return de_buildernext1(inputs)
	return fr_buildernext1(inputs)
});
export { buildernext1 as "builderNext" }