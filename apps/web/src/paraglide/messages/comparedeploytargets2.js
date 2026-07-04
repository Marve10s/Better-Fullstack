/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparedeploytargets2Inputs */

const en_comparedeploytargets2 = /** @type {(inputs: Comparedeploytargets2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Deploy targets (Vercel, CF, Docker, etc.)`)
};

const es_comparedeploytargets2 = /** @type {(inputs: Comparedeploytargets2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Destinos de despliegue (Vercel, CF, Docker, etc.)`)
};

const zh_comparedeploytargets2 = /** @type {(inputs: Comparedeploytargets2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`部署目标（Vercel、CF、Docker 等）`)
};

const ja_comparedeploytargets2 = /** @type {(inputs: Comparedeploytargets2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ターゲットのデプロイ (Vercel、CF、Docker など)`)
};

const ko_comparedeploytargets2 = /** @type {(inputs: Comparedeploytargets2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`대상 배포(Vercel, CF, Docker 등)`)
};

const zh_hant1_comparedeploytargets2 = /** @type {(inputs: Comparedeploytargets2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`部署目標（Vercel、CF、Docker 等）`)
};

const de_comparedeploytargets2 = /** @type {(inputs: Comparedeploytargets2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ziele bereitstellen (Vercel, CF, Docker usw.)`)
};

const fr_comparedeploytargets2 = /** @type {(inputs: Comparedeploytargets2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Déployer des cibles (Vercel, CF, Docker, etc.)`)
};

/**
* | output |
* | --- |
* | "Deploy targets (Vercel, CF, Docker, etc.)" |
*
* @param {Comparedeploytargets2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const comparedeploytargets2 = /** @type {((inputs?: Comparedeploytargets2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparedeploytargets2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparedeploytargets2(inputs)
	if (locale === "es") return es_comparedeploytargets2(inputs)
	if (locale === "zh") return zh_comparedeploytargets2(inputs)
	if (locale === "ja") return ja_comparedeploytargets2(inputs)
	if (locale === "ko") return ko_comparedeploytargets2(inputs)
	if (locale === "zh-Hant") return zh_hant1_comparedeploytargets2(inputs)
	if (locale === "de") return de_comparedeploytargets2(inputs)
	return fr_comparedeploytargets2(inputs)
});
export { comparedeploytargets2 as "compareDeployTargets" }