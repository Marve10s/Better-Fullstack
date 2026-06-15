/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ optionCount: NonNullable<unknown>, ecosystemCount: NonNullable<unknown> }} Compareintro1Inputs */

const en_compareintro1 = /** @type {(inputs: Compareintro1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Most scaffolding tools handle one framework and one opinion. Better Fullstack gives you ${i?.optionCount} options across ${i?.ecosystemCount} ecosystems — frontend, backend, database, auth, payments, AI, and deployment — all preconfigured and ready to run.`)
};

const es_compareintro1 = /** @type {(inputs: Compareintro1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`La mayoría de herramientas de scaffolding manejan un framework y una opinión. Better Fullstack te da ${i?.optionCount} opciones en ${i?.ecosystemCount} ecosistemas: frontend, backend, base de datos, auth, pagos, IA y despliegue, todo preconfigurado y listo para ejecutar.`)
};

const zh_compareintro1 = /** @type {(inputs: Compareintro1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`大多数脚手架工具只处理一个框架和一种观点。Better Fullstack 提供 ${i?.ecosystemCount} 个生态中的 ${i?.optionCount} 个选项：frontend、backend、数据库、认证、支付、AI 和部署，全部预配置并可直接运行。`)
};

/**
* | output |
* | --- |
* | "Most scaffolding tools handle one framework and one opinion. Better Fullstack gives you {optionCount} options across {ecosystemCount} ecosystems — frontend, ..." |
*
* @param {Compareintro1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const compareintro1 = /** @type {((inputs: Compareintro1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareintro1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_compareintro1(inputs)
	if (locale === "es") return es_compareintro1(inputs)
	return zh_compareintro1(inputs)
});
export { compareintro1 as "compareIntro" }