/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecontributorseyebrow2Inputs */

const en_homecontributorseyebrow2 = /** @type {(inputs: Homecontributorseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`contributors`)
};

const es_homecontributorseyebrow2 = /** @type {(inputs: Homecontributorseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`contribuidores`)
};

const zh_homecontributorseyebrow2 = /** @type {(inputs: Homecontributorseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`贡献者`)
};

const ja_homecontributorseyebrow2 = /** @type {(inputs: Homecontributorseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`貢献者`)
};

const ko_homecontributorseyebrow2 = /** @type {(inputs: Homecontributorseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`기여자`)
};

const zh_hant1_homecontributorseyebrow2 = /** @type {(inputs: Homecontributorseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`貢獻者`)
};

const de_homecontributorseyebrow2 = /** @type {(inputs: Homecontributorseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mitwirkende`)
};

const fr_homecontributorseyebrow2 = /** @type {(inputs: Homecontributorseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`contributeurs`)
};

/**
* | output |
* | --- |
* | "contributors" |
*
* @param {Homecontributorseyebrow2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homecontributorseyebrow2 = /** @type {((inputs?: Homecontributorseyebrow2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecontributorseyebrow2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homecontributorseyebrow2(inputs)
	if (locale === "es") return es_homecontributorseyebrow2(inputs)
	if (locale === "zh") return zh_homecontributorseyebrow2(inputs)
	if (locale === "ja") return ja_homecontributorseyebrow2(inputs)
	if (locale === "ko") return ko_homecontributorseyebrow2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homecontributorseyebrow2(inputs)
	if (locale === "de") return de_homecontributorseyebrow2(inputs)
	return fr_homecontributorseyebrow2(inputs)
});
export { homecontributorseyebrow2 as "homeContributorsEyebrow" }