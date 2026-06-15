/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20260612highlightinstall3Inputs */

const en_changelogrelease20260612highlightinstall3 = /** @type {(inputs: Changelogrelease20260612highlightinstall3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cut install size by 42% (122 MB → 71 MB) and the web entry chunk by 32%.`)
};

const es_changelogrelease20260612highlightinstall3 = /** @type {(inputs: Changelogrelease20260612highlightinstall3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Se redujo el tamaño de instalación un 42% (122 MB → 71 MB) y el chunk de entrada web un 32%.`)
};

const zh_changelogrelease20260612highlightinstall3 = /** @type {(inputs: Changelogrelease20260612highlightinstall3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`安装体积减少 42%（122 MB → 71 MB），web 入口 chunk 减少 32%。`)
};

/**
* | output |
* | --- |
* | "Cut install size by 42% (122 MB → 71 MB) and the web entry chunk by 32%." |
*
* @param {Changelogrelease20260612highlightinstall3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const changelogrelease20260612highlightinstall3 = /** @type {((inputs?: Changelogrelease20260612highlightinstall3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20260612highlightinstall3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changelogrelease20260612highlightinstall3(inputs)
	if (locale === "es") return es_changelogrelease20260612highlightinstall3(inputs)
	return zh_changelogrelease20260612highlightinstall3(inputs)
});
export { changelogrelease20260612highlightinstall3 as "changelogRelease20260612HighlightInstall" }