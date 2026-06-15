/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20260612title2Inputs */

const en_changelogrelease20260612title2 = /** @type {(inputs: Changelogrelease20260612title2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Agent benchmark, .NET ecosystem, and a 42% lighter install`)
};

const es_changelogrelease20260612title2 = /** @type {(inputs: Changelogrelease20260612title2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Benchmark de agentes, ecosistema .NET e instalación un 42% más ligera`)
};

const zh_changelogrelease20260612title2 = /** @type {(inputs: Changelogrelease20260612title2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理 benchmark、.NET 生态，以及轻 42% 的安装体积`)
};

/**
* | output |
* | --- |
* | "Agent benchmark, .NET ecosystem, and a 42% lighter install" |
*
* @param {Changelogrelease20260612title2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const changelogrelease20260612title2 = /** @type {((inputs?: Changelogrelease20260612title2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20260612title2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changelogrelease20260612title2(inputs)
	if (locale === "es") return es_changelogrelease20260612title2(inputs)
	return zh_changelogrelease20260612title2(inputs)
});
export { changelogrelease20260612title2 as "changelogRelease20260612Title" }