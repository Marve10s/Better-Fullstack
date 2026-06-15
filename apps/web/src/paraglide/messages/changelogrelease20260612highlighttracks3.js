/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20260612highlighttracks3Inputs */

const en_changelogrelease20260612highlighttracks3 = /** @type {(inputs: Changelogrelease20260612highlighttracks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Added starter tracks: curated, goal-based stack presets for common product shapes.`)
};

const es_changelogrelease20260612highlighttracks3 = /** @type {(inputs: Changelogrelease20260612highlighttracks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Se añadieron rutas iniciales: presets de stack curados y orientados a objetivos para formas comunes de producto.`)
};

const zh_changelogrelease20260612highlighttracks3 = /** @type {(inputs: Changelogrelease20260612highlighttracks3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`加入入门路线：为常见产品形态准备的、按目标策划的 stack 预设。`)
};

/**
* | output |
* | --- |
* | "Added starter tracks: curated, goal-based stack presets for common product shapes." |
*
* @param {Changelogrelease20260612highlighttracks3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const changelogrelease20260612highlighttracks3 = /** @type {((inputs?: Changelogrelease20260612highlighttracks3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20260612highlighttracks3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changelogrelease20260612highlighttracks3(inputs)
	if (locale === "es") return es_changelogrelease20260612highlighttracks3(inputs)
	return zh_changelogrelease20260612highlighttracks3(inputs)
});
export { changelogrelease20260612highlighttracks3 as "changelogRelease20260612HighlightTracks" }