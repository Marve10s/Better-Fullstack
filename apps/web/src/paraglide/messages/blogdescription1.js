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

/**
* | output |
* | --- |
* | "Benchmarks, releases, and what we learn building a fullstack scaffolder — written up with the data attached." |
*
* @param {Blogdescription1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const blogdescription1 = /** @type {((inputs?: Blogdescription1Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blogdescription1Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_blogdescription1(inputs)
	if (locale === "es") return es_blogdescription1(inputs)
	return zh_blogdescription1(inputs)
});
export { blogdescription1 as "blogDescription" }