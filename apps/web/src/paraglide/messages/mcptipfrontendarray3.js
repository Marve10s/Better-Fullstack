/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptipfrontendarray3Inputs */

const en_mcptipfrontendarray3 = /** @type {(inputs: Mcptipfrontendarray3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`frontend is an array: multiple frontends in one monorepo`)
};

const es_mcptipfrontendarray3 = /** @type {(inputs: Mcptipfrontendarray3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`frontend es un array: múltiples frontends en un monorepo`)
};

const zh_mcptipfrontendarray3 = /** @type {(inputs: Mcptipfrontendarray3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`frontend 是数组：一个 monorepo 中可以有多个 frontend`)
};

const ja_mcptipfrontendarray3 = /** @type {(inputs: Mcptipfrontendarray3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`フロントエンドは配列です: 1 つのモノリポジトリ内の複数のフロントエンド`)
};

const ko_mcptipfrontendarray3 = /** @type {(inputs: Mcptipfrontendarray3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`프런트엔드는 배열입니다. 하나의 모노레포에 여러 프런트엔드가 있습니다.`)
};

const zh_hant1_mcptipfrontendarray3 = /** @type {(inputs: Mcptipfrontendarray3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`frontend 是陣列：一個 monorepo 可以有多個 frontend`)
};

const de_mcptipfrontendarray3 = /** @type {(inputs: Mcptipfrontendarray3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Frontend ist ein Array: mehrere Frontends in einem Monorepo`)
};

const fr_mcptipfrontendarray3 = /** @type {(inputs: Mcptipfrontendarray3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`frontend est un tableau : plusieurs frontends dans un monorepo`)
};

/**
* | output |
* | --- |
* | "frontend is an array: multiple frontends in one monorepo" |
*
* @param {Mcptipfrontendarray3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcptipfrontendarray3 = /** @type {((inputs?: Mcptipfrontendarray3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptipfrontendarray3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcptipfrontendarray3(inputs)
	if (locale === "es") return es_mcptipfrontendarray3(inputs)
	if (locale === "zh") return zh_mcptipfrontendarray3(inputs)
	if (locale === "ja") return ja_mcptipfrontendarray3(inputs)
	if (locale === "ko") return ko_mcptipfrontendarray3(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcptipfrontendarray3(inputs)
	if (locale === "de") return de_mcptipfrontendarray3(inputs)
	return fr_mcptipfrontendarray3(inputs)
});
export { mcptipfrontendarray3 as "mcpTipFrontendArray" }