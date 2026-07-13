/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ optionCount: NonNullable<unknown>, ecosystems: NonNullable<unknown> }} Sitedefaultdescription2Inputs */

const en_sitedefaultdescription2 = /** @type {(inputs: Sitedefaultdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Scaffold compatibility-aware fullstack starters in seconds. Pick your stack from ${i?.optionCount} options across ${i?.ecosystems} — frameworks, databases, auth, payments, AI, and deployment — preconfigured by one CLI.`)
};

const es_sitedefaultdescription2 = /** @type {(inputs: Sitedefaultdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Crea starters fullstack con compatibilidad validada en segundos. Elige tu stack entre ${i?.optionCount} opciones en ${i?.ecosystems}: frameworks, bases de datos, auth, pagos, IA y despliegue, todo preconfigurado por una sola CLI.`)
};

const zh_sitedefaultdescription2 = /** @type {(inputs: Sitedefaultdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`几秒内生成兼顾兼容性的全栈 starter。从 ${i?.ecosystems} 的 ${i?.optionCount} 个选项中选择框架、数据库、认证、支付、AI 和部署，由一个 CLI 完成预配置。`)
};

const ja_sitedefaultdescription2 = /** @type {(inputs: Sitedefaultdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`互換性を考慮したフルスタックスターターを数秒で生成。${i?.ecosystems} にわたる ${i?.optionCount} 個のオプションからスタックを選択し、フレームワーク、データベース、認証、支払い、AI、デプロイを 1 つの CLI で事前設定できます。`)
};

const ko_sitedefaultdescription2 = /** @type {(inputs: Sitedefaultdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`몇 초 만에 호환성을 고려한 풀스택 스타터를 생성합니다. ${i?.ecosystems} 전반의 ${i?.optionCount}개 옵션에서 프레임워크, 데이터베이스, 인증, 결제, AI, 배포를 선택하면 하나의 CLI가 미리 구성합니다.`)
};

const zh_hant1_sitedefaultdescription2 = /** @type {(inputs: Sitedefaultdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`幾秒內生成兼顧相容性的全端 starter。從 ${i?.ecosystems} 的 ${i?.optionCount} 個選項中選擇框架、資料庫、認證、付款、AI 和部署，由一個 CLI 完成預先設定。`)
};

const de_sitedefaultdescription2 = /** @type {(inputs: Sitedefaultdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Erstellen Sie in Sekunden kompatibilitätsgeprüfte Fullstack-Starter. Wählen Sie aus ${i?.optionCount} Optionen in ${i?.ecosystems} — Frameworks, Datenbanken, Authentifizierung, Zahlungen, KI und Deployment — vorkonfiguriert durch eine CLI.`)
};

const fr_sitedefaultdescription2 = /** @type {(inputs: Sitedefaultdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Créez en quelques secondes des starters fullstack dont la compatibilité est vérifiée. Choisissez parmi ${i?.optionCount} options sur ${i?.ecosystems} — frameworks, bases de données, authentification, paiements, IA et déploiement — préconfigurées par un seul CLI.`)
};

const uk_sitedefaultdescription2 = /** @type {(inputs: Sitedefaultdescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`За кілька секунд згенеруйте сумісний фулстек-стартер. Оберіть стек із ${i?.optionCount} опцій у ${i?.ecosystems}: фреймворки, бази даних, автентифікація, платежі, ШІ та деплой — усе попередньо налаштовує один CLI.`)
};

/**
* | output |
* | --- |
* | "Scaffold compatibility-aware fullstack starters in seconds. Pick your stack from {optionCount} options across {ecosystems} — frameworks, databases, auth, pay..." |
*
* @param {Sitedefaultdescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const sitedefaultdescription2 = /** @type {((inputs: Sitedefaultdescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sitedefaultdescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sitedefaultdescription2(inputs)
	if (locale === "es") return es_sitedefaultdescription2(inputs)
	if (locale === "zh") return zh_sitedefaultdescription2(inputs)
	if (locale === "ja") return ja_sitedefaultdescription2(inputs)
	if (locale === "ko") return ko_sitedefaultdescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_sitedefaultdescription2(inputs)
	if (locale === "de") return de_sitedefaultdescription2(inputs)
	if (locale === "fr") return fr_sitedefaultdescription2(inputs)
	return uk_sitedefaultdescription2(inputs)
});
export { sitedefaultdescription2 as "siteDefaultDescription" }