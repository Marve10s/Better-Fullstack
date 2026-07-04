/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homepickyourstack3Inputs */

const en_homepickyourstack3 = /** @type {(inputs: Homepickyourstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pick your`)
};

const es_homepickyourstack3 = /** @type {(inputs: Homepickyourstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elige tu`)
};

const zh_homepickyourstack3 = /** @type {(inputs: Homepickyourstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`选择你的`)
};

const ja_homepickyourstack3 = /** @type {(inputs: Homepickyourstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`あなたのものを選んでください`)
};

const ko_homepickyourstack3 = /** @type {(inputs: Homepickyourstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`당신의 선택`)
};

const zh_hant1_homepickyourstack3 = /** @type {(inputs: Homepickyourstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`選擇你的`)
};

const de_homepickyourstack3 = /** @type {(inputs: Homepickyourstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Wählen Sie Ihr aus`)
};

const fr_homepickyourstack3 = /** @type {(inputs: Homepickyourstack3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choisissez votre`)
};

/**
* | output |
* | --- |
* | "Pick your" |
*
* @param {Homepickyourstack3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homepickyourstack3 = /** @type {((inputs?: Homepickyourstack3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homepickyourstack3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homepickyourstack3(inputs)
	if (locale === "es") return es_homepickyourstack3(inputs)
	if (locale === "zh") return zh_homepickyourstack3(inputs)
	if (locale === "ja") return ja_homepickyourstack3(inputs)
	if (locale === "ko") return ko_homepickyourstack3(inputs)
	if (locale === "zh-Hant") return zh_hant1_homepickyourstack3(inputs)
	if (locale === "de") return de_homepickyourstack3(inputs)
	return fr_homepickyourstack3(inputs)
});
export { homepickyourstack3 as "homePickYourStack" }