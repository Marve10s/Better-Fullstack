/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecontributorsdescription2Inputs */

const en_homecontributorsdescription2 = /** @type {(inputs: Homecontributorsdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Special thanks to the contributors who help improve Better Fullstack through testing, feedback, and code.`)
};

const es_homecontributorsdescription2 = /** @type {(inputs: Homecontributorsdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gracias especiales a quienes mejoran Better Fullstack con pruebas, feedback y código.`)
};

const zh_homecontributorsdescription2 = /** @type {(inputs: Homecontributorsdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`特别感谢通过测试、反馈和代码帮助改进 Better Fullstack 的贡献者。`)
};

/**
* | output |
* | --- |
* | "Special thanks to the contributors who help improve Better Fullstack through testing, feedback, and code." |
*
* @param {Homecontributorsdescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homecontributorsdescription2 = /** @type {((inputs?: Homecontributorsdescription2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecontributorsdescription2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homecontributorsdescription2(inputs)
	if (locale === "es") return es_homecontributorsdescription2(inputs)
	return zh_homecontributorsdescription2(inputs)
});
export { homecontributorsdescription2 as "homeContributorsDescription" }