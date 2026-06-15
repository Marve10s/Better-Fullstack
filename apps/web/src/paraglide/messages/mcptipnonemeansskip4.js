/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptipnonemeansskip4Inputs */

const en_mcptipnonemeansskip4 = /** @type {(inputs: Mcptipnonemeansskip4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`"none" means skip, not "use the default"`)
};

const es_mcptipnonemeansskip4 = /** @type {(inputs: Mcptipnonemeansskip4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`"none" significa omitir, no "usar el predeterminado"`)
};

const zh_mcptipnonemeansskip4 = /** @type {(inputs: Mcptipnonemeansskip4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`"none" 表示跳过，不是“使用默认值”`)
};

/**
* | output |
* | --- |
* | "\"none\" means skip, not \"use the default\"" |
*
* @param {Mcptipnonemeansskip4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcptipnonemeansskip4 = /** @type {((inputs?: Mcptipnonemeansskip4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptipnonemeansskip4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcptipnonemeansskip4(inputs)
	if (locale === "es") return es_mcptipnonemeansskip4(inputs)
	return zh_mcptipnonemeansskip4(inputs)
});
export { mcptipnonemeansskip4 as "mcpTipNoneMeansSkip" }