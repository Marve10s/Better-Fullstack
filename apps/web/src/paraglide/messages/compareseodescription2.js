/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compareseodescription2Inputs */

const en_compareseodescription2 = /** @type {(inputs: Compareseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`See how Better Fullstack compares to create-t3-app, create-next-app, and other CLI scaffolding tools. Side-by-side feature comparison across ecosystems, auth, payments, databases, and more.`)
};

const es_compareseodescription2 = /** @type {(inputs: Compareseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mira cómo Better Fullstack se compara con create-t3-app, create-next-app y otras herramientas CLI de scaffolding. Comparación lado a lado por ecosistemas, auth, pagos, bases de datos y más.`)
};

const zh_compareseodescription2 = /** @type {(inputs: Compareseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`了解 Better Fullstack 与 create-t3-app、create-next-app 和其他 CLI 脚手架工具的差异。按生态、认证、支付、数据库等维度并排比较。`)
};

/**
* | output |
* | --- |
* | "See how Better Fullstack compares to create-t3-app, create-next-app, and other CLI scaffolding tools. Side-by-side feature comparison across ecosystems, auth..." |
*
* @param {Compareseodescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const compareseodescription2 = /** @type {((inputs?: Compareseodescription2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareseodescription2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_compareseodescription2(inputs)
	if (locale === "es") return es_compareseodescription2(inputs)
	return zh_compareseodescription2(inputs)
});
export { compareseodescription2 as "compareSeoDescription" }