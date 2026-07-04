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

const ja_builderopengithubrepository3 = /** @type {(inputs: Builderopengithubrepository3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`GitHub リポジトリを開く`)
};

const ko_builderopengithubrepository3 = /** @type {(inputs: Builderopengithubrepository3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`GitHub 저장소 열기`)
};

const zh_hant1_builderopengithubrepository3 = /** @type {(inputs: Builderopengithubrepository3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打開 GitHub 倉庫`)
};

const de_builderopengithubrepository3 = /** @type {(inputs: Builderopengithubrepository3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Öffnen Sie das GitHub-Repository`)
};

const fr_builderopengithubrepository3 = /** @type {(inputs: Builderopengithubrepository3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ouvrir le dépôt GitHub`)
};

/**
* | output |
* | --- |
* | "Open GitHub repository" |
*
* @param {Builderopengithubrepository3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderopengithubrepository3 = /** @type {((inputs?: Builderopengithubrepository3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderopengithubrepository3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderopengithubrepository3(inputs)
	if (locale === "es") return es_builderopengithubrepository3(inputs)
	if (locale === "zh") return zh_builderopengithubrepository3(inputs)
	if (locale === "ja") return ja_builderopengithubrepository3(inputs)
	if (locale === "ko") return ko_builderopengithubrepository3(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderopengithubrepository3(inputs)
	if (locale === "de") return de_builderopengithubrepository3(inputs)
	return fr_builderopengithubrepository3(inputs)
});
export { builderopengithubrepository3 as "builderOpenGithubRepository" }