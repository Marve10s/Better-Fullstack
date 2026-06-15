/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homefeaturesdescription2Inputs */

const en_homefeaturesdescription2 = /** @type {(inputs: Homefeaturesdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TypeScript, React Native, Rust, Python, Go, Java, Elixir — one CLI scaffolds production-ready apps across all seven. Pick your ecosystem, pick your stack.`)
};

const es_homefeaturesdescription2 = /** @type {(inputs: Homefeaturesdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TypeScript, React Native, Rust, Python, Go, Java y Elixir: una sola CLI crea apps listas para producción en los siete ecosistemas.`)
};

const zh_homefeaturesdescription2 = /** @type {(inputs: Homefeaturesdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TypeScript、React Native、Rust、Python、Go、Java、Elixir：一个 CLI 覆盖七个生态，生成可用于生产的应用。`)
};

/**
* | output |
* | --- |
* | "TypeScript, React Native, Rust, Python, Go, Java, Elixir — one CLI scaffolds production-ready apps across all seven. Pick your ecosystem, pick your stack." |
*
* @param {Homefeaturesdescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const homefeaturesdescription2 = /** @type {((inputs?: Homefeaturesdescription2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homefeaturesdescription2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homefeaturesdescription2(inputs)
	if (locale === "es") return es_homefeaturesdescription2(inputs)
	return zh_homefeaturesdescription2(inputs)
});
export { homefeaturesdescription2 as "homeFeaturesDescription" }