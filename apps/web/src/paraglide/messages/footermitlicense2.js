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

/**
* | output |
* | --- |
* | "MIT License" |
*
* @param {Footermitlicense2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const footermitlicense2 = /** @type {((inputs?: Footermitlicense2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footermitlicense2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_footermitlicense2(inputs)
	if (locale === "es") return es_footermitlicense2(inputs)
	return zh_footermitlicense2(inputs)
});
export { footermitlicense2 as "footerMitLicense" }