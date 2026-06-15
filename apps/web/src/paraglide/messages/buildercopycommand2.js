/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercopycommand2Inputs */

const en_buildercopycommand2 = /** @type {(inputs: Buildercopycommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copy command`)
};

const es_buildercopycommand2 = /** @type {(inputs: Buildercopycommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copiar comando`)
};

const zh_buildercopycommand2 = /** @type {(inputs: Buildercopycommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制命令`)
};

/**
* | output |
* | --- |
* | "Copy command" |
*
* @param {Buildercopycommand2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const buildercopycommand2 = /** @type {((inputs?: Buildercopycommand2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercopycommand2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildercopycommand2(inputs)
	if (locale === "es") return es_buildercopycommand2(inputs)
	return zh_buildercopycommand2(inputs)
});
export { buildercopycommand2 as "builderCopyCommand" }