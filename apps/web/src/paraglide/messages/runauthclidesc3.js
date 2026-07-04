/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runauthclidesc3Inputs */

const en_runauthclidesc3 = /** @type {(inputs: Runauthclidesc3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Use an agent CLI you're already signed into (subscription / OAuth). Log in once, then the harness drives it — no keys in your environment.`)
};

const es_runauthclidesc3 = /** @type {(inputs: Runauthclidesc3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Utilice una interfaz de línea de comandos (CLI) de agente a la que ya haya accedido (suscripción/OAuth). Inicie sesión una sola vez y, a partir de ahí, el sistema se encargará del resto; no se requieren claves en su entorno.`)
};

const zh_runauthclidesc3 = /** @type {(inputs: Runauthclidesc3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`使用您已登录的代理 CLI（订阅/OAuth）。只需登录一次，然后该框架即可驱动它——您的环境中无需任何密钥。`)
};

const ja_runauthclidesc3 = /** @type {(inputs: Runauthclidesc3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`既にサインイン済みのエージェントCLI（サブスクリプション／OAuth）を使用してください。一度ログインすれば、あとはハーネスが自動的に操作します。環境内にキーは不要です。`)
};

const ko_runauthclidesc3 = /** @type {(inputs: Runauthclidesc3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이미 로그인한 에이전트 CLI(구독/OAuth)를 사용하세요. 한 번만 로그인하면 그 후에는 하네스가 자동으로 제어합니다. 환경에 키가 필요하지 않습니다.`)
};

const zh_hant1_runauthclidesc3 = /** @type {(inputs: Runauthclidesc3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`使用您已登入的代理程式 CLI（訂閱/OAuth）。只需登入一次，然後該框架即可驅動它——您的環境中無需任何密鑰。`)
};

const de_runauthclidesc3 = /** @type {(inputs: Runauthclidesc3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Verwenden Sie eine Agenten-CLI, bei der Sie bereits angemeldet sind (Abonnement/OAuth). Melden Sie sich einmal an, danach übernimmt das Framework die Steuerung – es sind keine Schlüssel in Ihrer Umgebung erforderlich.`)
};

const fr_runauthclidesc3 = /** @type {(inputs: Runauthclidesc3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Utilisez l'interface de ligne de commande d'un agent auquel vous êtes déjà connecté (abonnement/OAuth). Connectez-vous une seule fois, puis le système prend le relais ; aucune clé n'est requise dans votre environnement.`)
};

/**
* | output |
* | --- |
* | "Use an agent CLI you're already signed into (subscription / OAuth). Log in once, then the harness drives it — no keys in your environment." |
*
* @param {Runauthclidesc3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const runauthclidesc3 = /** @type {((inputs?: Runauthclidesc3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runauthclidesc3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runauthclidesc3(inputs)
	if (locale === "es") return es_runauthclidesc3(inputs)
	if (locale === "zh") return zh_runauthclidesc3(inputs)
	if (locale === "ja") return ja_runauthclidesc3(inputs)
	if (locale === "ko") return ko_runauthclidesc3(inputs)
	if (locale === "zh-Hant") return zh_hant1_runauthclidesc3(inputs)
	if (locale === "de") return de_runauthclidesc3(inputs)
	return fr_runauthclidesc3(inputs)
});
export { runauthclidesc3 as "runAuthCliDesc" }