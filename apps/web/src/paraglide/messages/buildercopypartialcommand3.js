/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercopypartialcommand3Inputs */

const en_buildercopypartialcommand3 = /** @type {(inputs: Buildercopypartialcommand3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copy partial command`)
};

const es_buildercopypartialcommand3 = /** @type {(inputs: Buildercopypartialcommand3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copiar comando parcial`)
};

const zh_buildercopypartialcommand3 = /** @type {(inputs: Buildercopypartialcommand3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制部分命令`)
};

/**
* | output |
* | --- |
* | "Copy partial command" |
*
* @param {Buildercopypartialcommand3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const buildercopypartialcommand3 = /** @type {((inputs?: Buildercopypartialcommand3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercopypartialcommand3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildercopypartialcommand3(inputs)
	if (locale === "es") return es_buildercopypartialcommand3(inputs)
	return zh_buildercopypartialcommand3(inputs)
});
export { buildercopypartialcommand3 as "builderCopyPartialCommand" }