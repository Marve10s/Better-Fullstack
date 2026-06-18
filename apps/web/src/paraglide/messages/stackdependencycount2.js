/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Stackdependencycount2Inputs */

const en_stackdependencycount2 = /** @type {(inputs: Stackdependencycount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} dependencies`)
};

const es_stackdependencycount2 = /** @type {(inputs: Stackdependencycount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} dependencias`)
};

const zh_stackdependencycount2 = /** @type {(inputs: Stackdependencycount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 个依赖`)
};

const ja_stackdependencycount2 = /** @type {(inputs: Stackdependencycount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 依存関係`)
};

const ko_stackdependencycount2 = /** @type {(inputs: Stackdependencycount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 종속성`)
};

const zh_hant1_stackdependencycount2 = /** @type {(inputs: Stackdependencycount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 個依賴`)
};

const de_stackdependencycount2 = /** @type {(inputs: Stackdependencycount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} Abhängigkeiten`)
};

const fr_stackdependencycount2 = /** @type {(inputs: Stackdependencycount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} dépendances`)
};

/**
* | output |
* | --- |
* | "{count} dependencies" |
*
* @param {Stackdependencycount2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const stackdependencycount2 = /** @type {((inputs: Stackdependencycount2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Stackdependencycount2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_stackdependencycount2(inputs)
	if (locale === "es") return es_stackdependencycount2(inputs)
	if (locale === "zh") return zh_stackdependencycount2(inputs)
	if (locale === "ja") return ja_stackdependencycount2(inputs)
	if (locale === "ko") return ko_stackdependencycount2(inputs)
	if (locale === "zh-Hant") return zh_hant1_stackdependencycount2(inputs)
	if (locale === "de") return de_stackdependencycount2(inputs)
	return fr_stackdependencycount2(inputs)
});
export { stackdependencycount2 as "stackDependencyCount" }