/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackjavaapiintent4Inputs */

const en_presettrackjavaapiintent4 = /** @type {(inputs: Presettrackjavaapiintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ship Spring services`)
};

const es_presettrackjavaapiintent4 = /** @type {(inputs: Presettrackjavaapiintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lanzar servicios Spring`)
};

const zh_presettrackjavaapiintent4 = /** @type {(inputs: Presettrackjavaapiintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`发布 Spring 服务`)
};

const ja_presettrackjavaapiintent4 = /** @type {(inputs: Presettrackjavaapiintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`シップスプリングサービス`)
};

const ko_presettrackjavaapiintent4 = /** @type {(inputs: Presettrackjavaapiintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`선박 스프링 서비스`)
};

const zh_hant1_presettrackjavaapiintent4 = /** @type {(inputs: Presettrackjavaapiintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`發布 Spring 服務`)
};

const de_presettrackjavaapiintent4 = /** @type {(inputs: Presettrackjavaapiintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Schiffsfrühlingsdienste`)
};

const fr_presettrackjavaapiintent4 = /** @type {(inputs: Presettrackjavaapiintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Services de ressort de navire`)
};

/**
* | output |
* | --- |
* | "Ship Spring services" |
*
* @param {Presettrackjavaapiintent4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const presettrackjavaapiintent4 = /** @type {((inputs?: Presettrackjavaapiintent4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackjavaapiintent4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackjavaapiintent4(inputs)
	if (locale === "es") return es_presettrackjavaapiintent4(inputs)
	if (locale === "zh") return zh_presettrackjavaapiintent4(inputs)
	if (locale === "ja") return ja_presettrackjavaapiintent4(inputs)
	if (locale === "ko") return ko_presettrackjavaapiintent4(inputs)
	if (locale === "zh-Hant") return zh_hant1_presettrackjavaapiintent4(inputs)
	if (locale === "de") return de_presettrackjavaapiintent4(inputs)
	return fr_presettrackjavaapiintent4(inputs)
});
export { presettrackjavaapiintent4 as "presetTrackJavaApiIntent" }