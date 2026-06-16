/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeherodescription2Inputs */

const en_homeherodescription2 = /** @type {(inputs: Homeherodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A CLI that scaffolds production-ready fullstack apps across seven language ecosystems. Pick your stack — frontend, database, auth, payments, AI — and run one command.`)
};

const es_homeherodescription2 = /** @type {(inputs: Homeherodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Una CLI que crea apps fullstack listas para producción en siete ecosistemas de lenguajes. Elige frontend, base de datos, auth, pagos e IA, y ejecuta un solo comando.`)
};

const zh_homeherodescription2 = /** @type {(inputs: Homeherodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`一个 CLI，可在七个语言生态中生成可用于生产的全栈应用。选择前端、数据库、认证、支付和 AI，然后运行一个命令。`)
};

/**
* | output |
* | --- |
* | "A CLI that scaffolds production-ready fullstack apps across seven language ecosystems. Pick your stack — frontend, database, auth, payments, AI — and run one..." |
*
* @param {Homeherodescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homeherodescription2 = /** @type {((inputs?: Homeherodescription2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeherodescription2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homeherodescription2(inputs)
	if (locale === "es") return es_homeherodescription2(inputs)
	return zh_homeherodescription2(inputs)
});
export { homeherodescription2 as "homeHeroDescription" }