/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ optionCount: NonNullable<unknown>, ecosystemCount: NonNullable<unknown> }} Compareintro1Inputs */

const en_compareintro1 = /** @type {(inputs: Compareintro1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Most scaffolding tools handle one framework and one opinion. Better Fullstack gives you ${i?.optionCount} options across ${i?.ecosystemCount} ecosystems — frontend, backend, database, auth, payments, AI, and deployment — all preconfigured and ready to run.`)
};

const es_compareintro1 = /** @type {(inputs: Compareintro1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`La mayoría de herramientas de scaffolding giran alrededor de un framework y un conjunto fijo de decisiones. Better Fullstack te da ${i?.optionCount} opciones en ${i?.ecosystemCount} ecosistemas: frontend, backend, base de datos, auth, pagos, IA y despliegue, todo preconfigurado y listo para ejecutar.`)
};

const zh_compareintro1 = /** @type {(inputs: Compareintro1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`大多数脚手架工具只围绕一个框架和一套默认取舍展开。Better Fullstack 提供 ${i?.ecosystemCount} 个生态中的 ${i?.optionCount} 个选项：前端、后端、数据库、认证、支付、AI 和部署，全部预配置并可直接运行。`)
};

const ja_compareintro1 = /** @type {(inputs: Compareintro1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`ほとんどの足場ツールは 1 つのフレームワークと 1 つの意見を処理します。 Better Fullstack では、${i?.ecosystemCount} エコシステム (フロントエンド、バックエンド、データベース、認証、支払い、AI、デプロイメント) 全体で ${i?.optionCount} オプションが提供され、すべて事前構成されており、すぐに実行できます。`)
};

const ko_compareintro1 = /** @type {(inputs: Compareintro1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`대부분의 스캐폴딩 도구는 하나의 프레임워크와 하나의 의견을 처리합니다. Better Fullstack는 ${i?.ecosystemCount} 생태계(프론트엔드, 백엔드, 데이터베이스, 인증, 결제, AI 및 배포) 전반에 걸쳐 ${i?.optionCount} 옵션을 제공하며 모두 사전 구성되어 실행 가능합니다.`)
};

const zh_hant1_compareintro1 = /** @type {(inputs: Compareintro1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`大多數腳手架工具只圍繞著一個框架和一組預設取捨。 Better Fullstack 提供 ${i?.ecosystemCount} 個生態中的 ${i?.optionCount} 個選項：前端、後端、資料庫、認證、付款、AI 和部署，全部預先設定並可直接運作。`)
};

const de_compareintro1 = /** @type {(inputs: Compareintro1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Die meisten Gerüstbauwerkzeuge verwalten ein Framework und eine Meinung. Better Fullstack bietet Ihnen ${i?.optionCount} Optionen für alle ${i?.ecosystemCount} Ökosysteme – Frontend, Backend, Datenbank, Authentifizierung, Zahlungen, AI und Bereitstellung – alles vorkonfiguriert und betriebsbereit.`)
};

const fr_compareintro1 = /** @type {(inputs: Compareintro1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`La plupart des outils d'échafaudage gèrent un seul cadre et une seule opinion. Better Fullstack vous offre ${i?.optionCount} options dans les écosystèmes ${i?.ecosystemCount} : frontend, backend, base de données, authentification, paiements, AI et déploiement, tous préconfigurés et prêts à fonctionner.`)
};

/**
* | output |
* | --- |
* | "Most scaffolding tools handle one framework and one opinion. Better Fullstack gives you {optionCount} options across {ecosystemCount} ecosystems — frontend, ..." |
*
* @param {Compareintro1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const compareintro1 = /** @type {((inputs: Compareintro1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareintro1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_compareintro1(inputs)
	if (locale === "es") return es_compareintro1(inputs)
	if (locale === "zh") return zh_compareintro1(inputs)
	if (locale === "ja") return ja_compareintro1(inputs)
	if (locale === "ko") return ko_compareintro1(inputs)
	if (locale === "zh-Hant") return zh_hant1_compareintro1(inputs)
	if (locale === "de") return de_compareintro1(inputs)
	return fr_compareintro1(inputs)
});
export { compareintro1 as "compareIntro" }