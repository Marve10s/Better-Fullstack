/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderopengithubrepository3Inputs */



/**
* | output |
* | --- |
* | "Open GitHub repository" |
*
* @param {Builderopengithubrepository3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderopengithubrepository3 = /** @type {((inputs?: Builderopengithubrepository3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderopengithubrepository3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Abrir repositorio de GitHub")
	if (locale === "zh") return /** @type {LocalizedString} */ ("打开 GitHub 仓库")
	if (locale === "ja") return /** @type {LocalizedString} */ ("GitHub リポジトリを開く")
	if (locale === "ko") return /** @type {LocalizedString} */ ("GitHub 저장소 열기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("打開 GitHub 倉庫")
	if (locale === "de") return /** @type {LocalizedString} */ ("Öffnen Sie das GitHub-Repository")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Ouvrir le dépôt GitHub")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Відкрити репозиторій GitHub")
	return /** @type {LocalizedString} */ ("Open GitHub repository")
});
export { builderopengithubrepository3 as "builderOpenGithubRepository" }