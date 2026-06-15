/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderopengithubrepository3Inputs */

const en_builderopengithubrepository3 = /** @type {(inputs: Builderopengithubrepository3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open GitHub repository`)
};

const es_builderopengithubrepository3 = /** @type {(inputs: Builderopengithubrepository3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abrir repositorio de GitHub`)
};

const zh_builderopengithubrepository3 = /** @type {(inputs: Builderopengithubrepository3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打开 GitHub 仓库`)
};

/**
* | output |
* | --- |
* | "Open GitHub repository" |
*
* @param {Builderopengithubrepository3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderopengithubrepository3 = /** @type {((inputs?: Builderopengithubrepository3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderopengithubrepository3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderopengithubrepository3(inputs)
	if (locale === "es") return es_builderopengithubrepository3(inputs)
	return zh_builderopengithubrepository3(inputs)
});
export { builderopengithubrepository3 as "builderOpenGithubRepository" }