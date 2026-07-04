/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runauthapidesc3Inputs */

const en_runauthapidesc3 = /** @type {(inputs: Runauthapidesc3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prefer an API key? Export the provider key and the same agent CLI bills against it — no subscription needed. We publish subscription-driven runs; API runs are untested but supported.`)
};

const es_runauthapidesc3 = /** @type {(inputs: Runauthapidesc3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`¿Prefieres una clave API? Exporta la clave del proveedor y la misma interfaz de línea de comandos del agente facturará con ella; no se requiere suscripción. Publicamos ejecuciones con suscripción; las ejecuciones con API no han sido probadas, pero cuentan con soporte.`)
};

const zh_runauthapidesc3 = /** @type {(inputs: Runauthapidesc3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更倾向于使用 API 密钥？导出提供商密钥，即可使用同一代理 CLI 进行计费——无需订阅。我们提供订阅驱动的运行服务；API 运行服务未经测试，但我们提供支持。`)
};

const ja_runauthapidesc3 = /** @type {(inputs: Runauthapidesc3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`APIキーをご希望ですか？プロバイダーキーをエクスポートすれば、同じエージェントCLIがそのキーに基づいて課金します。サブスクリプションは不要です。弊社ではサブスクリプションベースの実行を公開していますが、API実行はテストされていませんがサポート対象です。`)
};

const ko_runauthapidesc3 = /** @type {(inputs: Runauthapidesc3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`API 키를 선호하시나요? 공급자 키를 내보내면 동일한 에이전트 CLI에서 해당 키를 기준으로 요금이 청구됩니다. 구독이 필요하지 않습니다. 구독 기반 실행은 게시되지만 API 실행은 테스트되지 않았지만 지원됩니다.`)
};

const zh_hant1_runauthapidesc3 = /** @type {(inputs: Runauthapidesc3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更傾向於使用 API 金鑰？匯出提供者金鑰，即可使用相同代理 CLI 進行計費—無需訂閱。我們提供訂閱驅動的運行服務；API 運行服務未經測試，但我們提供支援。`)
};

const de_runauthapidesc3 = /** @type {(inputs: Runauthapidesc3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bevorzugen Sie einen API-Schlüssel? Exportieren Sie den Anbieterschlüssel, und die gleiche Agenten-CLI wird darüber abgerechnet – ein Abonnement ist nicht erforderlich. Wir veröffentlichen abonnementbasierte Ausführungen; API-Ausführungen sind ungetestet, werden aber unterstützt.`)
};

const fr_runauthapidesc3 = /** @type {(inputs: Runauthapidesc3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vous préférez une clé API ? Exportez la clé du fournisseur : la même interface de ligne de commande de l’agent facturera automatiquement l’exécution avec cette clé, sans abonnement. Nous publions les exécutions sur abonnement ; les exécutions via API ne sont pas testées, mais sont prises en charge.`)
};

/**
* | output |
* | --- |
* | "Prefer an API key? Export the provider key and the same agent CLI bills against it — no subscription needed. We publish subscription-driven runs; API runs ar..." |
*
* @param {Runauthapidesc3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const runauthapidesc3 = /** @type {((inputs?: Runauthapidesc3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runauthapidesc3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runauthapidesc3(inputs)
	if (locale === "es") return es_runauthapidesc3(inputs)
	if (locale === "zh") return zh_runauthapidesc3(inputs)
	if (locale === "ja") return ja_runauthapidesc3(inputs)
	if (locale === "ko") return ko_runauthapidesc3(inputs)
	if (locale === "zh-Hant") return zh_hant1_runauthapidesc3(inputs)
	if (locale === "de") return de_runauthapidesc3(inputs)
	return fr_runauthapidesc3(inputs)
});
export { runauthapidesc3 as "runAuthApiDesc" }