/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ecosystem: NonNullable<unknown> }} Builderormgroup2Inputs */

const en_builderormgroup2 = /** @type {(inputs: Builderormgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} ORM`)
};

const es_builderormgroup2 = /** @type {(inputs: Builderormgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`ORM ${i?.ecosystem}`)
};

const zh_builderormgroup2 = /** @type {(inputs: Builderormgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} ORM`)
};

const ja_builderormgroup2 = /** @type {(inputs: Builderormgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} ORM`)
};

const ko_builderormgroup2 = /** @type {(inputs: Builderormgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} ORM`)
};

const zh_hant1_builderormgroup2 = /** @type {(inputs: Builderormgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} ORM`)
};

const de_builderormgroup2 = /** @type {(inputs: Builderormgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} ORM`)
};

const fr_builderormgroup2 = /** @type {(inputs: Builderormgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem}ORM`)
};

/**
* | output |
* | --- |
* | "{ecosystem} ORM" |
*
* @param {Builderormgroup2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderormgroup2 = /** @type {((inputs: Builderormgroup2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderormgroup2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderormgroup2(inputs)
	if (locale === "es") return es_builderormgroup2(inputs)
	if (locale === "zh") return zh_builderormgroup2(inputs)
	if (locale === "ja") return ja_builderormgroup2(inputs)
	if (locale === "ko") return ko_builderormgroup2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderormgroup2(inputs)
	if (locale === "de") return de_builderormgroup2(inputs)
	return fr_builderormgroup2(inputs)
});
export { builderormgroup2 as "builderOrmGroup" }