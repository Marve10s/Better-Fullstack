/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeaiskepticwhere3Inputs */



/**
* | output |
* | --- |
* | "on stream" |
*
* @param {Homeaiskepticwhere3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homeaiskepticwhere3 = /** @type {((inputs?: Homeaiskepticwhere3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeaiskepticwhere3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("en directo")
	if (locale === "zh") return /** @type {LocalizedString} */ ("直播中")
	if (locale === "ja") return /** @type {LocalizedString} */ ("配信にて")
	if (locale === "ko") return /** @type {LocalizedString} */ ("방송에서")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("直播中")
	if (locale === "de") return /** @type {LocalizedString} */ ("im Stream")
	if (locale === "fr") return /** @type {LocalizedString} */ ("en stream")
	if (locale === "uk") return /** @type {LocalizedString} */ ("на стримі")
	return /** @type {LocalizedString} */ ("on stream")
});
export { homeaiskepticwhere3 as "homeAiSkepticWhere" }