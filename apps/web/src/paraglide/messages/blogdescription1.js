/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Blogdescription1Inputs */

const en_blogdescription1 = /** @type {(inputs: Blogdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Benchmarks, releases, and what we learn building a fullstack scaffolder — written up with the data attached.`)
};

const es_blogdescription1 = /** @type {(inputs: Blogdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Benchmarks, lanzamientos y aprendizajes al construir un generador fullstack, escritos con los datos incluidos.`)
};

const zh_blogdescription1 = /** @type {(inputs: Blogdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`基准测试、发布记录，以及我们构建全栈脚手架时学到的东西，都会连同数据一起写下来。`)
};

const ja_blogdescription1 = /** @type {(inputs: Blogdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ベンチマーク、リリース、およびフルスタック スキャフォールダーの構築で学んだこと — データが添付されて書かれています。`)
};

const ko_blogdescription1 = /** @type {(inputs: Blogdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`벤치마크, 릴리스 및 풀스택 스캐폴더 구축에 대해 배운 내용이 첨부된 데이터와 함께 작성되었습니다.`)
};

const zh_hant1_blogdescription1 = /** @type {(inputs: Blogdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`基準測試、發布記錄，以及我們建造全端腳手架時學到的東西，都會連同數據一起寫下來。`)
};

const de_blogdescription1 = /** @type {(inputs: Blogdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Benchmarks, Releases und was wir beim Aufbau eines Fullstack-Scaffolders lernen – geschrieben mit den angehängten Daten.`)
};

const fr_blogdescription1 = /** @type {(inputs: Blogdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Benchmarks, versions et ce que nous apprenons en créant un échafaudage fullstack – rédigé avec les données jointes.`)
};

/**
* | output |
* | --- |
* | "Benchmarks, releases, and what we learn building a fullstack scaffolder — written up with the data attached." |
*
* @param {Blogdescription1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const blogdescription1 = /** @type {((inputs?: Blogdescription1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blogdescription1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_blogdescription1(inputs)
	if (locale === "es") return es_blogdescription1(inputs)
	if (locale === "zh") return zh_blogdescription1(inputs)
	if (locale === "ja") return ja_blogdescription1(inputs)
	if (locale === "ko") return ko_blogdescription1(inputs)
	if (locale === "zh-Hant") return zh_hant1_blogdescription1(inputs)
	if (locale === "de") return de_blogdescription1(inputs)
	return fr_blogdescription1(inputs)
});
export { blogdescription1 as "blogDescription" }