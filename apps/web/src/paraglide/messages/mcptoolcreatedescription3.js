/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptoolcreatedescription3Inputs */

const en_mcptoolcreatedescription3 = /** @type {(inputs: Mcptoolcreatedescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Scaffold a new project to disk`)
};

const es_mcptoolcreatedescription3 = /** @type {(inputs: Mcptoolcreatedescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Crea un proyecto nuevo en disco`)
};

const zh_mcptoolcreatedescription3 = /** @type {(inputs: Mcptoolcreatedescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`将新项目生成到磁盘`)
};

const ja_mcptoolcreatedescription3 = /** @type {(inputs: Mcptoolcreatedescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`新しいプロジェクトをディスクにスキャフォールディングする`)
};

const ko_mcptoolcreatedescription3 = /** @type {(inputs: Mcptoolcreatedescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`새 프로젝트를 디스크에 스캐폴드`)
};

const zh_hant1_mcptoolcreatedescription3 = /** @type {(inputs: Mcptoolcreatedescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`將新專案產生到磁碟`)
};

const de_mcptoolcreatedescription3 = /** @type {(inputs: Mcptoolcreatedescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Erstellen Sie ein Gerüst für ein neues Projekt auf der Festplatte`)
};

const fr_mcptoolcreatedescription3 = /** @type {(inputs: Mcptoolcreatedescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Échafauder un nouveau projet sur le disque`)
};

/**
* | output |
* | --- |
* | "Scaffold a new project to disk" |
*
* @param {Mcptoolcreatedescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcptoolcreatedescription3 = /** @type {((inputs?: Mcptoolcreatedescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptoolcreatedescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcptoolcreatedescription3(inputs)
	if (locale === "es") return es_mcptoolcreatedescription3(inputs)
	if (locale === "zh") return zh_mcptoolcreatedescription3(inputs)
	if (locale === "ja") return ja_mcptoolcreatedescription3(inputs)
	if (locale === "ko") return ko_mcptoolcreatedescription3(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcptoolcreatedescription3(inputs)
	if (locale === "de") return de_mcptoolcreatedescription3(inputs)
	return fr_mcptoolcreatedescription3(inputs)
});
export { mcptoolcreatedescription3 as "mcpToolCreateDescription" }