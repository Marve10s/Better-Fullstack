/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compareormsupport2Inputs */

const en_compareormsupport2 = /** @type {(inputs: Compareormsupport2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM support (Drizzle, Prisma, etc.)`)
};

const es_compareormsupport2 = /** @type {(inputs: Compareormsupport2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Soporte ORM (Drizzle, Prisma, etc.)`)
};

const zh_compareormsupport2 = /** @type {(inputs: Compareormsupport2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM 支持（Drizzle、Prisma 等）`)
};

const ja_compareormsupport2 = /** @type {(inputs: Compareormsupport2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM サポート (Drizzle、Prisma など)`)
};

const ko_compareormsupport2 = /** @type {(inputs: Compareormsupport2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM 지원(Drizzle, Prisma 등)`)
};

const zh_hant1_compareormsupport2 = /** @type {(inputs: Compareormsupport2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM 支援（Drizzle、Prisma 等）`)
};

const de_compareormsupport2 = /** @type {(inputs: Compareormsupport2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM-Unterstützung (Drizzle, Prisma usw.)`)
};

const fr_compareormsupport2 = /** @type {(inputs: Compareormsupport2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prise en charge ORM (Drizzle, Prisma, etc.)`)
};

/**
* | output |
* | --- |
* | "ORM support (Drizzle, Prisma, etc.)" |
*
* @param {Compareormsupport2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const compareormsupport2 = /** @type {((inputs?: Compareormsupport2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareormsupport2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_compareormsupport2(inputs)
	if (locale === "es") return es_compareormsupport2(inputs)
	if (locale === "zh") return zh_compareormsupport2(inputs)
	if (locale === "ja") return ja_compareormsupport2(inputs)
	if (locale === "ko") return ko_compareormsupport2(inputs)
	if (locale === "zh-Hant") return zh_hant1_compareormsupport2(inputs)
	if (locale === "de") return de_compareormsupport2(inputs)
	return fr_compareormsupport2(inputs)
});
export { compareormsupport2 as "compareOrmSupport" }