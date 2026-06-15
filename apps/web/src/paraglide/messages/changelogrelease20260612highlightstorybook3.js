/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20260612highlightstorybook3Inputs */

const en_changelogrelease20260612highlightstorybook3 = /** @type {(inputs: Changelogrelease20260612highlightstorybook3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixed Storybook scaffolds on Next.js projects: framework detection now handles multi-frontend stacks and story types import from the renderer package, so generated apps type-check and build.`)
};

const es_changelogrelease20260612highlightstorybook3 = /** @type {(inputs: Changelogrelease20260612highlightstorybook3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Se corrigieron los scaffolds de Storybook en proyectos Next.js: la detección de framework ahora maneja stacks multi-frontend y los tipos de story se importan desde el paquete renderer, para que las apps generadas pasen type-check y build.`)
};

const zh_changelogrelease20260612highlightstorybook3 = /** @type {(inputs: Changelogrelease20260612highlightstorybook3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`修复 Next.js 项目的 Storybook scaffold：framework 检测现在支持 multi-frontend stacks，story 类型从 renderer 包导入，因此生成的应用可以通过 type-check 和 build。`)
};

/**
* | output |
* | --- |
* | "Fixed Storybook scaffolds on Next.js projects: framework detection now handles multi-frontend stacks and story types import from the renderer package, so gen..." |
*
* @param {Changelogrelease20260612highlightstorybook3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const changelogrelease20260612highlightstorybook3 = /** @type {((inputs?: Changelogrelease20260612highlightstorybook3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20260612highlightstorybook3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changelogrelease20260612highlightstorybook3(inputs)
	if (locale === "es") return es_changelogrelease20260612highlightstorybook3(inputs)
	return zh_changelogrelease20260612highlightstorybook3(inputs)
});
export { changelogrelease20260612highlightstorybook3 as "changelogRelease20260612HighlightStorybook" }