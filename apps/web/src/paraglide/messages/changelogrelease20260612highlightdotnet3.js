/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20260612highlightdotnet3Inputs */

const en_changelogrelease20260612highlightdotnet3 = /** @type {(inputs: Changelogrelease20260612highlightdotnet3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Added .NET as a first-class ecosystem, plus an enterprise tier, backend-utils, and Render/Netlify deployment options on the stack graph.`)
};

const es_changelogrelease20260612highlightdotnet3 = /** @type {(inputs: Changelogrelease20260612highlightdotnet3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Se añadió .NET como ecosistema de primera clase, además de un nivel enterprise, backend-utils y opciones de despliegue Render/Netlify en el grafo de stacks.`)
};

const zh_changelogrelease20260612highlightdotnet3 = /** @type {(inputs: Changelogrelease20260612highlightdotnet3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`加入一等 .NET 生态，并在 stack graph 中加入 enterprise 层、backend-utils，以及 Render/Netlify 部署选项。`)
};

/**
* | output |
* | --- |
* | "Added .NET as a first-class ecosystem, plus an enterprise tier, backend-utils, and Render/Netlify deployment options on the stack graph." |
*
* @param {Changelogrelease20260612highlightdotnet3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const changelogrelease20260612highlightdotnet3 = /** @type {((inputs?: Changelogrelease20260612highlightdotnet3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20260612highlightdotnet3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changelogrelease20260612highlightdotnet3(inputs)
	if (locale === "es") return es_changelogrelease20260612highlightdotnet3(inputs)
	return zh_changelogrelease20260612highlightdotnet3(inputs)
});
export { changelogrelease20260612highlightdotnet3 as "changelogRelease20260612HighlightDotnet" }