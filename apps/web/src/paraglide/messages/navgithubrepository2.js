/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navgithubrepository2Inputs */



/**
* | output |
* | --- |
* | "GitHub repository" |
*
* @param {Navgithubrepository2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navgithubrepository2 = /** @type {((inputs?: Navgithubrepository2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navgithubrepository2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Repositorio de GitHub")
	if (locale === "zh") return /** @type {LocalizedString} */ ("GitHub 仓库")
	if (locale === "ja") return /** @type {LocalizedString} */ ("GitHub リポジトリ")
	if (locale === "ko") return /** @type {LocalizedString} */ ("GitHub 저장소")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("GitHub 倉庫")
	if (locale === "de") return /** @type {LocalizedString} */ ("GitHub-Repository")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Dépôt GitHub")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Репозиторій GitHub")
	return /** @type {LocalizedString} */ ("GitHub repository")
});
export { navgithubrepository2 as "navGithubRepository" }