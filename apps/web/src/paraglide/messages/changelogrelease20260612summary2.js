/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20260612summary2Inputs */

const en_changelogrelease20260612summary2 = /** @type {(inputs: Changelogrelease20260612summary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This release benchmarks how AI agents scaffold with Better Fullstack and publishes the results on the homepage, adds .NET as a first-class ecosystem on the new stack graph, and ships a much leaner install. It also fixes four scaffold bugs the benchmark itself uncovered.`)
};

const es_changelogrelease20260612summary2 = /** @type {(inputs: Changelogrelease20260612summary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Esta versión mide cómo los agentes de IA crean scaffolds con Better Fullstack y publica los resultados en la página de inicio, añade .NET como ecosistema de primera clase en el nuevo grafo de stacks y entrega una instalación mucho más ligera. También corrige cuatro errores de scaffold que descubrió el propio benchmark.`)
};

const zh_changelogrelease20260612summary2 = /** @type {(inputs: Changelogrelease20260612summary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`这个版本衡量 AI 代理如何使用 Better Fullstack 生成 scaffold，并把结果发布到首页；同时在新的 stack graph 中加入一等 .NET 生态，并带来更轻的安装包。它还修复了 benchmark 本身发现的四个 scaffold 问题。`)
};

/**
* | output |
* | --- |
* | "This release benchmarks how AI agents scaffold with Better Fullstack and publishes the results on the homepage, adds .NET as a first-class ecosystem on the n..." |
*
* @param {Changelogrelease20260612summary2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const changelogrelease20260612summary2 = /** @type {((inputs?: Changelogrelease20260612summary2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20260612summary2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changelogrelease20260612summary2(inputs)
	if (locale === "es") return es_changelogrelease20260612summary2(inputs)
	return zh_changelogrelease20260612summary2(inputs)
});
export { changelogrelease20260612summary2 as "changelogRelease20260612Summary" }