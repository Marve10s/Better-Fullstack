/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homelikedonx3Inputs */

const en_homelikedonx3 = /** @type {(inputs: Homelikedonx3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`liked on x`)
};

const es_homelikedonx3 = /** @type {(inputs: Homelikedonx3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`likes en x`)
};

const zh_homelikedonx3 = /** @type {(inputs: Homelikedonx3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`X 上的点赞`)
};

const ja_homelikedonx3 = /** @type {(inputs: Homelikedonx3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`×で「いいね！」しました`)
};

const ko_homelikedonx3 = /** @type {(inputs: Homelikedonx3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`x에 좋아요를 표시했습니다`)
};

const zh_hant1_homelikedonx3 = /** @type {(inputs: Homelikedonx3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`X 上的讚`)
};

const de_homelikedonx3 = /** @type {(inputs: Homelikedonx3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gefällt mir am x`)
};

const fr_homelikedonx3 = /** @type {(inputs: Homelikedonx3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`aimé sur x`)
};

/**
* | output |
* | --- |
* | "liked on x" |
*
* @param {Homelikedonx3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homelikedonx3 = /** @type {((inputs?: Homelikedonx3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homelikedonx3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homelikedonx3(inputs)
	if (locale === "es") return es_homelikedonx3(inputs)
	if (locale === "zh") return zh_homelikedonx3(inputs)
	if (locale === "ja") return ja_homelikedonx3(inputs)
	if (locale === "ko") return ko_homelikedonx3(inputs)
	if (locale === "zh-Hant") return zh_hant1_homelikedonx3(inputs)
	if (locale === "de") return de_homelikedonx3(inputs)
	return fr_homelikedonx3(inputs)
});
export { homelikedonx3 as "homeLikedOnX" }