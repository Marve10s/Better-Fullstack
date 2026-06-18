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

const ja_homefeaturesdescription2 = /** @type {(inputs: Homefeaturesdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TypeScript、React Native、Rust、Python、Go、Java、Elixir — 1 つの CLI が、7 つすべてにわたって実稼働対応のアプリを足場にします。エコシステムとスタックを選択してください。`)
};

const ko_homefeaturesdescription2 = /** @type {(inputs: Homefeaturesdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TypeScript, React Native, Rust, Python, Go, Java, Elixir — 하나의 CLI는 7개 전체에 걸쳐 프로덕션 지원 앱을 스캐폴드합니다. 생태계를 선택하고 스택을 선택하세요.`)
};

const zh_hant1_homefeaturesdescription2 = /** @type {(inputs: Homefeaturesdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TypeScript、React Native、Rust、Python、Go、Java、Elixir：一個 CLI 涵蓋七個生態，產生可用於生產的應用。`)
};

const de_homefeaturesdescription2 = /** @type {(inputs: Homefeaturesdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TypeScript, React Native, Rust, Python, Go, Java, Elixir – ein CLI bildet das Gerüst für produktionsbereite Apps für alle sieben. Wählen Sie Ihr Ökosystem, wählen Sie Ihren Stack.`)
};

const fr_homefeaturesdescription2 = /** @type {(inputs: Homefeaturesdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TypeScript, React Native, Rust, Python, Go, Java, Elixir — un CLI échafaude des applications prêtes pour la production sur les sept. Choisissez votre écosystème, choisissez votre pile.`)
};

/**
* | output |
* | --- |
* | "TypeScript, React Native, Rust, Python, Go, Java, Elixir — one CLI scaffolds production-ready apps across all seven. Pick your ecosystem, pick your stack." |
*
* @param {Homefeaturesdescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homefeaturesdescription2 = /** @type {((inputs?: Homefeaturesdescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homefeaturesdescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homefeaturesdescription2(inputs)
	if (locale === "es") return es_homefeaturesdescription2(inputs)
	if (locale === "zh") return zh_homefeaturesdescription2(inputs)
	if (locale === "ja") return ja_homefeaturesdescription2(inputs)
	if (locale === "ko") return ko_homefeaturesdescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homefeaturesdescription2(inputs)
	if (locale === "de") return de_homefeaturesdescription2(inputs)
	return fr_homefeaturesdescription2(inputs)
});
export { homefeaturesdescription2 as "homeFeaturesDescription" }