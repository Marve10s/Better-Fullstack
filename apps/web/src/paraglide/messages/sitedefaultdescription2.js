/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ optionCount: NonNullable<unknown>, ecosystems: NonNullable<unknown> }} Sitedefaultdescription2Inputs */

const en_sitedefaultdescription2 = /** @type {(inputs: Sitedefaultdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Scaffold production-ready fullstack apps in seconds. Pick your stack from ${i?.optionCount} options across ${i?.ecosystems} — frameworks, databases, auth, payments, AI, and deployment — all wired together by one CLI.`)
};

const es_sitedefaultdescription2 = /** @type {(inputs: Sitedefaultdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Crea apps fullstack listas para producción en segundos. Elige tu stack entre ${i?.optionCount} opciones en ${i?.ecosystems}: frameworks, bases de datos, auth, pagos, IA y despliegue, todo conectado por una sola CLI.`)
};

const zh_sitedefaultdescription2 = /** @type {(inputs: Sitedefaultdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`几秒内生成可用于生产的全栈应用。从 ${i?.ecosystems} 的 ${i?.optionCount} 个选项中选择你的 stack：框架、数据库、认证、支付、AI 和部署，全都由一个 CLI 串起来。`)
};

const ja_sitedefaultdescription2 = /** @type {(inputs: Sitedefaultdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`本番環境に対応したフルスタック アプリを数秒で足場に構築します。 ${i?.ecosystems} にわたる ${i?.optionCount} オプションからスタックを選択します。フレームワーク、データベース、認証、支払い、AI、デプロイメントはすべて 1 つの CLI によって接続されています。`)
};

const ko_sitedefaultdescription2 = /** @type {(inputs: Sitedefaultdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`단 몇 초 만에 프로덕션 준비가 완료된 풀스택 앱을 스캐폴드합니다. 프레임워크, 데이터베이스, 인증, 결제, AI 및 배포 등 ${i?.ecosystems} 전체의 ${i?.optionCount} 옵션 중에서 스택을 선택하세요. 모두 하나의 CLI로 연결됩니다.`)
};

const zh_hant1_sitedefaultdescription2 = /** @type {(inputs: Sitedefaultdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`幾秒內生成可用於生產的全端應用。從 ${i?.ecosystems} 的 ${i?.optionCount} 個選項中選擇你的 stack：框架、資料庫、認證、付款、AI 和部署，全都由一個 CLI 串起來。`)
};

const de_sitedefaultdescription2 = /** @type {(inputs: Sitedefaultdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Erstellen Sie in Sekundenschnelle produktionsbereite Full-Stack-Apps. Wählen Sie Ihren Stack aus ${i?.optionCount}-Optionen in ${i?.ecosystems} – Frameworks, Datenbanken, Authentifizierung, Zahlungen, AI und Bereitstellung – alle miteinander verbunden durch ein CLI.`)
};

const fr_sitedefaultdescription2 = /** @type {(inputs: Sitedefaultdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Échafaudez des applications fullstack prêtes pour la production en quelques secondes. Choisissez votre pile parmi les options ${i?.optionCount} sur ${i?.ecosystems} — frameworks, bases de données, authentification, paiements, AI et déploiement — le tout relié par un seul CLI.`)
};

/**
* | output |
* | --- |
* | "Scaffold production-ready fullstack apps in seconds. Pick your stack from {optionCount} options across {ecosystems} — frameworks, databases, auth, payments, ..." |
*
* @param {Sitedefaultdescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const sitedefaultdescription2 = /** @type {((inputs: Sitedefaultdescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sitedefaultdescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sitedefaultdescription2(inputs)
	if (locale === "es") return es_sitedefaultdescription2(inputs)
	if (locale === "zh") return zh_sitedefaultdescription2(inputs)
	if (locale === "ja") return ja_sitedefaultdescription2(inputs)
	if (locale === "ko") return ko_sitedefaultdescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_sitedefaultdescription2(inputs)
	if (locale === "de") return de_sitedefaultdescription2(inputs)
	return fr_sitedefaultdescription2(inputs)
});
export { sitedefaultdescription2 as "siteDefaultDescription" }