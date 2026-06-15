/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercopysharelink3Inputs */

const en_buildercopysharelink3 = /** @type {(inputs: Buildercopysharelink3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copy Share Link`)
};

const es_buildercopysharelink3 = /** @type {(inputs: Buildercopysharelink3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copiar enlace para compartir`)
};

const zh_buildercopysharelink3 = /** @type {(inputs: Buildercopysharelink3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制分享链接`)
};

/**
* | output |
* | --- |
* | "Copy Share Link" |
*
* @param {Buildercopysharelink3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const buildercopysharelink3 = /** @type {((inputs?: Buildercopysharelink3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercopysharelink3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildercopysharelink3(inputs)
	if (locale === "es") return es_buildercopysharelink3(inputs)
	return zh_buildercopysharelink3(inputs)
});
export { buildercopysharelink3 as "builderCopyShareLink" }