/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparedeploytargets2Inputs */



/**
* | output |
* | --- |
* | "Deploy targets (Vercel, CF, Docker, etc.)" |
*
* @param {Comparedeploytargets2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const comparedeploytargets2 = /** @type {((inputs?: Comparedeploytargets2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparedeploytargets2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Destinos de despliegue (Vercel, CF, Docker, etc.)")
	if (locale === "zh") return /** @type {LocalizedString} */ ("部署目标（Vercel、CF、Docker 等）")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ターゲットのデプロイ (Vercel、CF、Docker など)")
	if (locale === "ko") return /** @type {LocalizedString} */ ("배포 대상(Vercel, CF, Docker 등)")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("部署目標（Vercel、CF、Docker 等）")
	if (locale === "de") return /** @type {LocalizedString} */ ("Ziele bereitstellen (Vercel, CF, Docker usw.)")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Déployer des cibles (Vercel, CF, Docker, etc.)")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Цілі деплою (Vercel, CF, Docker тощо)")
	return /** @type {LocalizedString} */ ("Deploy targets (Vercel, CF, Docker, etc.)")
});
export { comparedeploytargets2 as "compareDeployTargets" }