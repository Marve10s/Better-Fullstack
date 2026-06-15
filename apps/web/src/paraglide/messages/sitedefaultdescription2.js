/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ optionCount: NonNullable<unknown>, ecosystems: NonNullable<unknown> }} Sitedefaultdescription2Inputs */

const en_sitedefaultdescription2 = /** @type {(inputs: Sitedefaultdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Scaffold production-ready fullstack apps in seconds. Pick your stack from ${i?.optionCount} options across ${i?.ecosystems} — frameworks, databases, auth, payments, AI, and deployment — all wired together by one CLI.`)
};

const es_sitedefaultdescription2 = /** @type {(inputs: Sitedefaultdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Crea apps fullstack listas para producción en segundos. Elige tu stack entre ${i?.optionCount} opciones en ${i?.ecosystems}: frameworks, bases de datos, auth, pagos, IA y despliegue, todo conectado por una sola CLI.`)
};

const zh_sitedefaultdescription2 = /** @type {(inputs: Sitedefaultdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`几秒内生成可用于生产的全栈应用。从 ${i?.ecosystems} 的 ${i?.optionCount} 个选项中选择你的 stack：框架、数据库、认证、支付、AI 和部署，全都由一个 CLI 串起来。`)
};

/**
* | output |
* | --- |
* | "Scaffold production-ready fullstack apps in seconds. Pick your stack from {optionCount} options across {ecosystems} — frameworks, databases, auth, payments, ..." |
*
* @param {Sitedefaultdescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const sitedefaultdescription2 = /** @type {((inputs: Sitedefaultdescription2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sitedefaultdescription2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sitedefaultdescription2(inputs)
	if (locale === "es") return es_sitedefaultdescription2(inputs)
	return zh_sitedefaultdescription2(inputs)
});
export { sitedefaultdescription2 as "siteDefaultDescription" }