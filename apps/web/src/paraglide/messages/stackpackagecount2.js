/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Stackpackagecount2Inputs */

const en_stackpackagecount2 = /** @type {(inputs: Stackpackagecount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} packages`)
};

const es_stackpackagecount2 = /** @type {(inputs: Stackpackagecount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} paquetes`)
};

const zh_stackpackagecount2 = /** @type {(inputs: Stackpackagecount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 个包`)
};

const ja_stackpackagecount2 = /** @type {(inputs: Stackpackagecount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} パッケージ`)
};

const ko_stackpackagecount2 = /** @type {(inputs: Stackpackagecount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 패키지`)
};

const zh_hant1_stackpackagecount2 = /** @type {(inputs: Stackpackagecount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 個包`)
};

const de_stackpackagecount2 = /** @type {(inputs: Stackpackagecount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} Pakete`)
};

const fr_stackpackagecount2 = /** @type {(inputs: Stackpackagecount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Forfaits ${i?.count}`)
};

/**
* | output |
* | --- |
* | "{count} packages" |
*
* @param {Stackpackagecount2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const stackpackagecount2 = /** @type {((inputs: Stackpackagecount2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Stackpackagecount2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_stackpackagecount2(inputs)
	if (locale === "es") return es_stackpackagecount2(inputs)
	if (locale === "zh") return zh_stackpackagecount2(inputs)
	if (locale === "ja") return ja_stackpackagecount2(inputs)
	if (locale === "ko") return ko_stackpackagecount2(inputs)
	if (locale === "zh-Hant") return zh_hant1_stackpackagecount2(inputs)
	if (locale === "de") return de_stackpackagecount2(inputs)
	return fr_stackpackagecount2(inputs)
});
export { stackpackagecount2 as "stackPackageCount" }