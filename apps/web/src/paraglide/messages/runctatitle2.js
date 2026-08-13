/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runctatitle2Inputs */

const en_runctatitle2 = /** @type {(inputs: Runctatitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`See how your run stacks up`)
};

const es_runctatitle2 = /** @type {(inputs: Runctatitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mira cómo se compara tu ejecución`)
};

const zh_runctatitle2 = /** @type {(inputs: Runctatitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`看看你的成绩如何`)
};

const ja_runctatitle2 = /** @type {(inputs: Runctatitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`あなたの実行結果がどれだけ通用するか見てみましょう`)
};

const ko_runctatitle2 = /** @type {(inputs: Runctatitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`내 기록이 다른 기록들과 어떻게 다른지 확인해 보세요.`)
};

const zh_hant1_runctatitle2 = /** @type {(inputs: Runctatitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`看看你的成績如何`)
};

const de_runctatitle2 = /** @type {(inputs: Runctatitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sehen Sie, wie Ihr Durchlauf abschneidet`)
};

const fr_runctatitle2 = /** @type {(inputs: Runctatitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Voyez comment votre exécution se compare.`)
};

const uk_runctatitle2 = /** @type {(inputs: Runctatitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Подивіться, як виглядає ваш прогін`)
};

/**
* | output |
* | --- |
* | "See how your run stacks up" |
*
* @param {Runctatitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const runctatitle2 = /** @type {((inputs?: Runctatitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runctatitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_runctatitle2(inputs)
	if (locale === "zh") return zh_runctatitle2(inputs)
	if (locale === "ja") return ja_runctatitle2(inputs)
	if (locale === "ko") return ko_runctatitle2(inputs)
	if (locale === "zh-Hant") return zh_hant1_runctatitle2(inputs)
	if (locale === "de") return de_runctatitle2(inputs)
	if (locale === "fr") return fr_runctatitle2(inputs)
	if (locale === "uk") return uk_runctatitle2(inputs)
	return en_runctatitle2(inputs)
});
export { runctatitle2 as "runCtaTitle" }