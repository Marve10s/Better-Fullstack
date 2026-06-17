/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Hometestimonialseyebrow2Inputs */

const en_hometestimonialseyebrow2 = /** @type {(inputs: Hometestimonialseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`on the record`)
};

const es_hometestimonialseyebrow2 = /** @type {(inputs: Hometestimonialseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`en público`)
};

const zh_hometestimonialseyebrow2 = /** @type {(inputs: Hometestimonialseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`公开评价`)
};

const ja_hometestimonialseyebrow2 = /** @type {(inputs: Hometestimonialseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`記録上`)
};

const ko_hometestimonialseyebrow2 = /** @type {(inputs: Hometestimonialseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`기록에`)
};

const zh_hant1_hometestimonialseyebrow2 = /** @type {(inputs: Hometestimonialseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`公開評價`)
};

const de_hometestimonialseyebrow2 = /** @type {(inputs: Hometestimonialseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`auf dem Protokoll`)
};

const fr_hometestimonialseyebrow2 = /** @type {(inputs: Hometestimonialseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`sur le dossier`)
};

/**
* | output |
* | --- |
* | "on the record" |
*
* @param {Hometestimonialseyebrow2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const hometestimonialseyebrow2 = /** @type {((inputs?: Hometestimonialseyebrow2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Hometestimonialseyebrow2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_hometestimonialseyebrow2(inputs)
	if (locale === "es") return es_hometestimonialseyebrow2(inputs)
	if (locale === "zh") return zh_hometestimonialseyebrow2(inputs)
	if (locale === "ja") return ja_hometestimonialseyebrow2(inputs)
	if (locale === "ko") return ko_hometestimonialseyebrow2(inputs)
	if (locale === "zh-Hant") return zh_hant1_hometestimonialseyebrow2(inputs)
	if (locale === "de") return de_hometestimonialseyebrow2(inputs)
	return fr_hometestimonialseyebrow2(inputs)
});
export { hometestimonialseyebrow2 as "homeTestimonialsEyebrow" }