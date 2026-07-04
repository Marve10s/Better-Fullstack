/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homelikeddescription2Inputs */

const en_homelikeddescription2 = /** @type {(inputs: Homelikeddescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Builders who hearted the launch.`)
};

const es_homelikeddescription2 = /** @type {(inputs: Homelikeddescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Desarrolladores que marcaron el lanzamiento como favorito.`)
};

const zh_homelikeddescription2 = /** @type {(inputs: Homelikeddescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`为发布点赞的开发者。`)
};

const ja_homelikeddescription2 = /** @type {(inputs: Homelikeddescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`立ち上げに尽力したビルダーたち。`)
};

const ko_homelikeddescription2 = /** @type {(inputs: Homelikeddescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`출시를 진심으로 축하해주신 빌더 여러분.`)
};

const zh_hant1_homelikeddescription2 = /** @type {(inputs: Homelikeddescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`為發布點讚的開發者。`)
};

const de_homelikeddescription2 = /** @type {(inputs: Homelikeddescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bauherren, die den Start mit Begeisterung begleitet haben.`)
};

const fr_homelikeddescription2 = /** @type {(inputs: Homelikeddescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Des constructeurs qui ont pris à coeur le lancement.`)
};

/**
* | output |
* | --- |
* | "Builders who hearted the launch." |
*
* @param {Homelikeddescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homelikeddescription2 = /** @type {((inputs?: Homelikeddescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homelikeddescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homelikeddescription2(inputs)
	if (locale === "es") return es_homelikeddescription2(inputs)
	if (locale === "zh") return zh_homelikeddescription2(inputs)
	if (locale === "ja") return ja_homelikeddescription2(inputs)
	if (locale === "ko") return ko_homelikeddescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homelikeddescription2(inputs)
	if (locale === "de") return de_homelikeddescription2(inputs)
	return fr_homelikeddescription2(inputs)
});
export { homelikeddescription2 as "homeLikedDescription" }