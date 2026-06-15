/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20260612imagealt3Inputs */

const en_changelogrelease20260612imagealt3 = /** @type {(inputs: Changelogrelease20260612imagealt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abstract colorful gradient artwork`)
};

const es_changelogrelease20260612imagealt3 = /** @type {(inputs: Changelogrelease20260612imagealt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Arte abstracto de gradiente colorido`)
};

const zh_changelogrelease20260612imagealt3 = /** @type {(inputs: Changelogrelease20260612imagealt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`抽象彩色渐变艺术图`)
};

/**
* | output |
* | --- |
* | "Abstract colorful gradient artwork" |
*
* @param {Changelogrelease20260612imagealt3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const changelogrelease20260612imagealt3 = /** @type {((inputs?: Changelogrelease20260612imagealt3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20260612imagealt3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changelogrelease20260612imagealt3(inputs)
	if (locale === "es") return es_changelogrelease20260612imagealt3(inputs)
	return zh_changelogrelease20260612imagealt3(inputs)
});
export { changelogrelease20260612imagealt3 as "changelogRelease20260612ImageAlt" }