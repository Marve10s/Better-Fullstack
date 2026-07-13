/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ecosystemCount: NonNullable<unknown>, ecosystems: NonNullable<unknown> }} Hometotaloptions2Inputs */

const en_hometotaloptions2 = /** @type {(inputs: Hometotaloptions2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`options across ${i?.ecosystemCount} ecosystems · ${i?.ecosystems}`)
};

const es_hometotaloptions2 = /** @type {(inputs: Hometotaloptions2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`opciones en ${i?.ecosystemCount} ecosistemas · ${i?.ecosystems}`)
};

const zh_hometotaloptions2 = /** @type {(inputs: Hometotaloptions2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemCount} 个生态中的选项 · ${i?.ecosystems}`)
};

const ja_hometotaloptions2 = /** @type {(inputs: Hometotaloptions2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemCount} つのエコシステムにわたるオプション · ${i?.ecosystems}`)
};

const ko_hometotaloptions2 = /** @type {(inputs: Hometotaloptions2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemCount}개 생태계에 걸친 옵션 · ${i?.ecosystems}`)
};

const zh_hant1_hometotaloptions2 = /** @type {(inputs: Hometotaloptions2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemCount} 個生態中的選項 · ${i?.ecosystems}`)
};

const de_hometotaloptions2 = /** @type {(inputs: Hometotaloptions2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Optionen in ${i?.ecosystemCount} Ökosystemen · ${i?.ecosystems}`)
};

const fr_hometotaloptions2 = /** @type {(inputs: Hometotaloptions2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`options dans ${i?.ecosystemCount} écosystèmes · ${i?.ecosystems}`)
};

const uk_hometotaloptions2 = /** @type {(inputs: Hometotaloptions2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`опцій у ${i?.ecosystemCount} екосистемах · ${i?.ecosystems}`)
};

/**
* | output |
* | --- |
* | "options across {ecosystemCount} ecosystems · {ecosystems}" |
*
* @param {Hometotaloptions2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const hometotaloptions2 = /** @type {((inputs: Hometotaloptions2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Hometotaloptions2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_hometotaloptions2(inputs)
	if (locale === "es") return es_hometotaloptions2(inputs)
	if (locale === "zh") return zh_hometotaloptions2(inputs)
	if (locale === "ja") return ja_hometotaloptions2(inputs)
	if (locale === "ko") return ko_hometotaloptions2(inputs)
	if (locale === "zh-Hant") return zh_hant1_hometotaloptions2(inputs)
	if (locale === "de") return de_hometotaloptions2(inputs)
	if (locale === "fr") return fr_hometotaloptions2(inputs)
	return uk_hometotaloptions2(inputs)
});
export { hometotaloptions2 as "homeTotalOptions" }