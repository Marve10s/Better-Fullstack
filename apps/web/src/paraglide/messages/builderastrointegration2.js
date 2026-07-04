/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderastrointegration2Inputs */

const en_builderastrointegration2 = /** @type {(inputs: Builderastrointegration2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Astro Integration`)
};

const es_builderastrointegration2 = /** @type {(inputs: Builderastrointegration2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Integración de Astro`)
};

const zh_builderastrointegration2 = /** @type {(inputs: Builderastrointegration2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Astro 集成`)
};

const ja_builderastrointegration2 = /** @type {(inputs: Builderastrointegration2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Astro 統合`)
};

const ko_builderastrointegration2 = /** @type {(inputs: Builderastrointegration2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Astro 통합`)
};

const zh_hant1_builderastrointegration2 = /** @type {(inputs: Builderastrointegration2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Astro 集成`)
};

const de_builderastrointegration2 = /** @type {(inputs: Builderastrointegration2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Astro Integration`)
};

const fr_builderastrointegration2 = /** @type {(inputs: Builderastrointegration2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Astro Intégration`)
};

/**
* | output |
* | --- |
* | "Astro Integration" |
*
* @param {Builderastrointegration2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderastrointegration2 = /** @type {((inputs?: Builderastrointegration2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderastrointegration2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderastrointegration2(inputs)
	if (locale === "es") return es_builderastrointegration2(inputs)
	if (locale === "zh") return zh_builderastrointegration2(inputs)
	if (locale === "ja") return ja_builderastrointegration2(inputs)
	if (locale === "ko") return ko_builderastrointegration2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderastrointegration2(inputs)
	if (locale === "de") return de_builderastrointegration2(inputs)
	return fr_builderastrointegration2(inputs)
});
export { builderastrointegration2 as "builderAstroIntegration" }