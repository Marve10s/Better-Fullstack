/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footermitlicense2Inputs */

const en_footermitlicense2 = /** @type {(inputs: Footermitlicense2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`MIT License`)
};

const es_footermitlicense2 = /** @type {(inputs: Footermitlicense2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Licencia MIT`)
};

const zh_footermitlicense2 = /** @type {(inputs: Footermitlicense2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`MIT 许可证`)
};

const ja_footermitlicense2 = /** @type {(inputs: Footermitlicense2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`MITライセンス`)
};

const ko_footermitlicense2 = /** @type {(inputs: Footermitlicense2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`MIT 라이센스`)
};

const zh_hant1_footermitlicense2 = /** @type {(inputs: Footermitlicense2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`MIT 許可證`)
};

const de_footermitlicense2 = /** @type {(inputs: Footermitlicense2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`MIT-Lizenz`)
};

const fr_footermitlicense2 = /** @type {(inputs: Footermitlicense2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Licence MIT`)
};

const uk_footermitlicense2 = /** @type {(inputs: Footermitlicense2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ліцензія MIT`)
};

/**
* | output |
* | --- |
* | "MIT License" |
*
* @param {Footermitlicense2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const footermitlicense2 = /** @type {((inputs?: Footermitlicense2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footermitlicense2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_footermitlicense2(inputs)
	if (locale === "es") return es_footermitlicense2(inputs)
	if (locale === "zh") return zh_footermitlicense2(inputs)
	if (locale === "ja") return ja_footermitlicense2(inputs)
	if (locale === "ko") return ko_footermitlicense2(inputs)
	if (locale === "zh-Hant") return zh_hant1_footermitlicense2(inputs)
	if (locale === "de") return de_footermitlicense2(inputs)
	if (locale === "fr") return fr_footermitlicense2(inputs)
	return uk_footermitlicense2(inputs)
});
export { footermitlicense2 as "footerMitLicense" }