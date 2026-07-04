/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navgithubrepository2Inputs */

const en_navgithubrepository2 = /** @type {(inputs: Navgithubrepository2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`GitHub repository`)
};

const es_navgithubrepository2 = /** @type {(inputs: Navgithubrepository2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Repositorio de GitHub`)
};

const zh_navgithubrepository2 = /** @type {(inputs: Navgithubrepository2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`GitHub 仓库`)
};

const ja_navgithubrepository2 = /** @type {(inputs: Navgithubrepository2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`GitHub リポジトリ`)
};

const ko_navgithubrepository2 = /** @type {(inputs: Navgithubrepository2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`GitHub 저장소`)
};

const zh_hant1_navgithubrepository2 = /** @type {(inputs: Navgithubrepository2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`GitHub 倉庫`)
};

const de_navgithubrepository2 = /** @type {(inputs: Navgithubrepository2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`GitHub-Repository`)
};

const fr_navgithubrepository2 = /** @type {(inputs: Navgithubrepository2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dépôt GitHub`)
};

/**
* | output |
* | --- |
* | "GitHub repository" |
*
* @param {Navgithubrepository2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const navgithubrepository2 = /** @type {((inputs?: Navgithubrepository2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navgithubrepository2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navgithubrepository2(inputs)
	if (locale === "es") return es_navgithubrepository2(inputs)
	if (locale === "zh") return zh_navgithubrepository2(inputs)
	if (locale === "ja") return ja_navgithubrepository2(inputs)
	if (locale === "ko") return ko_navgithubrepository2(inputs)
	if (locale === "zh-Hant") return zh_hant1_navgithubrepository2(inputs)
	if (locale === "de") return de_navgithubrepository2(inputs)
	return fr_navgithubrepository2(inputs)
});
export { navgithubrepository2 as "navGithubRepository" }