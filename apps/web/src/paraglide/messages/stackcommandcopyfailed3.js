/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Stackcommandcopyfailed3Inputs */

const en_stackcommandcopyfailed3 = /** @type {(inputs: Stackcommandcopyfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to copy command`)
};

const es_stackcommandcopyfailed3 = /** @type {(inputs: Stackcommandcopyfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No se pudo copiar el comando`)
};

const zh_stackcommandcopyfailed3 = /** @type {(inputs: Stackcommandcopyfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制命令失败`)
};

/**
* | output |
* | --- |
* | "Failed to copy command" |
*
* @param {Stackcommandcopyfailed3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const stackcommandcopyfailed3 = /** @type {((inputs?: Stackcommandcopyfailed3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Stackcommandcopyfailed3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_stackcommandcopyfailed3(inputs)
	if (locale === "es") return es_stackcommandcopyfailed3(inputs)
	return zh_stackcommandcopyfailed3(inputs)
});
export { stackcommandcopyfailed3 as "stackCommandCopyFailed" }