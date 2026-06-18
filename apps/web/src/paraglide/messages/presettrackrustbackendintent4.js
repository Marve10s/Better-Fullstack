/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackrustbackendintent4Inputs */

const en_presettrackrustbackendintent4 = /** @type {(inputs: Presettrackrustbackendintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prefer systems-grade APIs`)
};

const es_presettrackrustbackendintent4 = /** @type {(inputs: Presettrackrustbackendintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Preferir APIs de nivel de sistemas`)
};

const zh_presettrackrustbackendintent4 = /** @type {(inputs: Presettrackrustbackendintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`构建系统级服务`)
};

const ja_presettrackrustbackendintent4 = /** @type {(inputs: Presettrackrustbackendintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`システムグレードの API を優先する`)
};

const ko_presettrackrustbackendintent4 = /** @type {(inputs: Presettrackrustbackendintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`시스템 등급 APIs 선호`)
};

const zh_hant1_presettrackrustbackendintent4 = /** @type {(inputs: Presettrackrustbackendintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`建構系統級服務`)
};

const de_presettrackrustbackendintent4 = /** @type {(inputs: Presettrackrustbackendintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bevorzugen Sie APIs in Systemqualität`)
};

const fr_presettrackrustbackendintent4 = /** @type {(inputs: Presettrackrustbackendintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Préférez les API de qualité système`)
};

/**
* | output |
* | --- |
* | "Prefer systems-grade APIs" |
*
* @param {Presettrackrustbackendintent4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const presettrackrustbackendintent4 = /** @type {((inputs?: Presettrackrustbackendintent4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackrustbackendintent4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackrustbackendintent4(inputs)
	if (locale === "es") return es_presettrackrustbackendintent4(inputs)
	if (locale === "zh") return zh_presettrackrustbackendintent4(inputs)
	if (locale === "ja") return ja_presettrackrustbackendintent4(inputs)
	if (locale === "ko") return ko_presettrackrustbackendintent4(inputs)
	if (locale === "zh-Hant") return zh_hant1_presettrackrustbackendintent4(inputs)
	if (locale === "de") return de_presettrackrustbackendintent4(inputs)
	return fr_presettrackrustbackendintent4(inputs)
});
export { presettrackrustbackendintent4 as "presetTrackRustBackendIntent" }