/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ecosystemCount: NonNullable<unknown>, ecosystemSlugs: NonNullable<unknown> }} Hometotaloptions2Inputs */

const en_hometotaloptions2 = /** @type {(inputs: Hometotaloptions2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`option entries across ${i?.ecosystemCount} ecosystems · ${i?.ecosystemSlugs}`)
};

const es_hometotaloptions2 = /** @type {(inputs: Hometotaloptions2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`opciones en ${i?.ecosystemCount} ecosistemas · ${i?.ecosystemSlugs}`)
};

const zh_hometotaloptions2 = /** @type {(inputs: Hometotaloptions2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemCount} 个生态中的选项 · ${i?.ecosystemSlugs}`)
};

const ja_hometotaloptions2 = /** @type {(inputs: Hometotaloptions2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemCount} つのエコシステムにわたるオプション · ${i?.ecosystemSlugs}`)
};

const ko_hometotaloptions2 = /** @type {(inputs: Hometotaloptions2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemCount}개 생태계에 걸친 옵션 · ${i?.ecosystemSlugs}`)
};

const zh_hant1_hometotaloptions2 = /** @type {(inputs: Hometotaloptions2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemCount} 個生態中的選項 · ${i?.ecosystemSlugs}`)
};

const de_hometotaloptions2 = /** @type {(inputs: Hometotaloptions2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Optionseinträge in ${i?.ecosystemCount} Ökosystemen · ${i?.ecosystemSlugs}`)
};

const fr_hometotaloptions2 = /** @type {(inputs: Hometotaloptions2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`options dans ${i?.ecosystemCount} écosystèmes · ${i?.ecosystemSlugs}`)
};

const uk_hometotaloptions2 = /** @type {(inputs: Hometotaloptions2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`опцій у ${i?.ecosystemCount} екосистемах · ${i?.ecosystemSlugs}`)
};

/**
* | output |
* | --- |
* | "option entries across {ecosystemCount} ecosystems · {ecosystemSlugs}" |
*
* @param {Hometotaloptions2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const hometotaloptions2 = /** @type {((inputs: Hometotaloptions2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Hometotaloptions2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_hometotaloptions2(inputs)
	if (locale === "zh") return zh_hometotaloptions2(inputs)
	if (locale === "ja") return ja_hometotaloptions2(inputs)
	if (locale === "ko") return ko_hometotaloptions2(inputs)
	if (locale === "zh-Hant") return zh_hant1_hometotaloptions2(inputs)
	if (locale === "de") return de_hometotaloptions2(inputs)
	if (locale === "fr") return fr_hometotaloptions2(inputs)
	if (locale === "uk") return uk_hometotaloptions2(inputs)
	return en_hometotaloptions2(inputs)
});
export { hometotaloptions2 as "homeTotalOptions" }