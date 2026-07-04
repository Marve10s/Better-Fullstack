/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homefactunique2Inputs */

const en_homefactunique2 = /** @type {(inputs: Homefactunique2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Each combination scaffolds a unique, production-ready app`)
};

const es_homefactunique2 = /** @type {(inputs: Homefactunique2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cada combinación crea una app única y lista para producción`)
};

const zh_homefactunique2 = /** @type {(inputs: Homefactunique2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每个组合都会生成一个独特、可用于生产的应用`)
};

const ja_homefactunique2 = /** @type {(inputs: Homefactunique2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`それぞれの組み合わせにより、独自の運用準備が整ったアプリが構築されます。`)
};

const ko_homefactunique2 = /** @type {(inputs: Homefactunique2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`각 조합은 프로덕션에 즉시 사용 가능한 고유한 앱을 기반으로 합니다.`)
};

const zh_hant1_homefactunique2 = /** @type {(inputs: Homefactunique2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每個組合都會產生一個獨特、可用於生產的應用`)
};

const de_homefactunique2 = /** @type {(inputs: Homefactunique2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Jede Kombination bildet das Gerüst für eine einzigartige, produktionsreife App`)
};

const fr_homefactunique2 = /** @type {(inputs: Homefactunique2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Chaque combinaison crée une application unique, prête pour la production`)
};

/**
* | output |
* | --- |
* | "Each combination scaffolds a unique, production-ready app" |
*
* @param {Homefactunique2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homefactunique2 = /** @type {((inputs?: Homefactunique2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homefactunique2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homefactunique2(inputs)
	if (locale === "es") return es_homefactunique2(inputs)
	if (locale === "zh") return zh_homefactunique2(inputs)
	if (locale === "ja") return ja_homefactunique2(inputs)
	if (locale === "ko") return ko_homefactunique2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homefactunique2(inputs)
	if (locale === "de") return de_homefactunique2(inputs)
	return fr_homefactunique2(inputs)
});
export { homefactunique2 as "homeFactUnique" }