/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptoolplandescription3Inputs */

const en_mcptoolplandescription3 = /** @type {(inputs: Mcptoolplandescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dry-run preview: generates the file tree in memory`)
};

const es_mcptoolplandescription3 = /** @type {(inputs: Mcptoolplandescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vista previa dry-run: genera el árbol de archivos en memoria`)
};

const zh_mcptoolplandescription3 = /** @type {(inputs: Mcptoolplandescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dry-run 预览：在内存中生成文件树`)
};

/**
* | output |
* | --- |
* | "Dry-run preview: generates the file tree in memory" |
*
* @param {Mcptoolplandescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcptoolplandescription3 = /** @type {((inputs?: Mcptoolplandescription3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptoolplandescription3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcptoolplandescription3(inputs)
	if (locale === "es") return es_mcptoolplandescription3(inputs)
	return zh_mcptoolplandescription3(inputs)
});
export { mcptoolplandescription3 as "mcpToolPlanDescription" }