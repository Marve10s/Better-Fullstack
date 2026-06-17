/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecombinationsdescription2Inputs */

const en_homecombinationsdescription2 = /** @type {(inputs: Homecombinationsdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mix and match frameworks, databases, auth, payments, AI, and more. Every combination scaffolds a working, production-ready codebase.`)
};

const es_homecombinationsdescription2 = /** @type {(inputs: Homecombinationsdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Combina frameworks, bases de datos, auth, pagos, IA y más. Cada combinación crea una base de código funcional y lista para producción.`)
};

const zh_homecombinationsdescription2 = /** @type {(inputs: Homecombinationsdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`混搭框架、数据库、认证、支付、AI 等能力。每一种组合都会生成一个可运行、可用于生产的代码库。`)
};

/**
* | output |
* | --- |
* | "Mix and match frameworks, databases, auth, payments, AI, and more. Every combination scaffolds a working, production-ready codebase." |
*
* @param {Homecombinationsdescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homecombinationsdescription2 = /** @type {((inputs?: Homecombinationsdescription2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecombinationsdescription2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homecombinationsdescription2(inputs)
	if (locale === "es") return es_homecombinationsdescription2(inputs)
	return zh_homecombinationsdescription2(inputs)
});
export { homecombinationsdescription2 as "homeCombinationsDescription" }