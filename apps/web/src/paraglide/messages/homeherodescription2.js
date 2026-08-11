/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ecosystemCount: NonNullable<unknown> }} Homeherodescription2Inputs */

const en_homeherodescription2 = /** @type {(inputs: Homeherodescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`A CLI that scaffolds production-ready fullstack apps across ${i?.ecosystemCount} project ecosystems. Pick your stack — frontend, database, auth, payments, AI — and run one command.`)
};

const es_homeherodescription2 = /** @type {(inputs: Homeherodescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Una CLI que crea apps fullstack listas para producción en ${i?.ecosystemCount} ecosistemas de proyecto. Elige frontend, base de datos, auth, pagos e IA, y ejecuta un solo comando.`)
};

const zh_homeherodescription2 = /** @type {(inputs: Homeherodescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`一个 CLI，可在 ${i?.ecosystemCount} 个项目生态中生成可用于生产的全栈应用。选择前端、数据库、认证、支付和 AI，然后运行一个命令。`)
};

const ja_homeherodescription2 = /** @type {(inputs: Homeherodescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemCount} つのプロジェクトエコシステムにわたって、実稼働対応のフルスタックアプリをスキャフォールドする CLI です。スタック (フロントエンド、データベース、認証、支払い、AI) を選んで、コマンドを 1 つ実行するだけ。`)
};

const ko_homeherodescription2 = /** @type {(inputs: Homeherodescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemCount}개 프로젝트 생태계에 걸쳐 프로덕션 준비가 완료된 풀스택 앱을 스캐폴드하는 CLI입니다. 프런트엔드, 데이터베이스, 인증, 결제, AI 등 스택을 선택하고 명령 하나를 실행하세요.`)
};

const zh_hant1_homeherodescription2 = /** @type {(inputs: Homeherodescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`一個 CLI，可在 ${i?.ecosystemCount} 個專案生態中產生可用於生產的全端應用。選擇前端、資料庫、認證、付款和 AI，然後執行一個指令。`)
};

const de_homeherodescription2 = /** @type {(inputs: Homeherodescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Ein CLI, der produktionsbereite Full-Stack-Apps in ${i?.ecosystemCount} Projektökosystemen bereitstellt. Wählen Sie Ihren Stack aus – Frontend, Datenbank, Authentifizierung, Zahlungen, AI – und führen Sie einen Befehl aus.`)
};

const fr_homeherodescription2 = /** @type {(inputs: Homeherodescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Un CLI qui échafaude des applications fullstack prêtes pour la production dans ${i?.ecosystemCount} écosystèmes de projet. Choisissez votre pile – frontend, base de données, authentification, paiements, AI – et exécutez une commande.`)
};

const uk_homeherodescription2 = /** @type {(inputs: Homeherodescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`CLI, який генерує готові до продакшену фулстек-застосунки у ${i?.ecosystemCount} проєктних екосистемах. Оберіть стек — фронтенд, базу даних, автентифікацію, платежі, ШІ — і запустіть одну команду.`)
};

/**
* | output |
* | --- |
* | "A CLI that scaffolds production-ready fullstack apps across {ecosystemCount} project ecosystems. Pick your stack — frontend, database, auth, payments, AI — a..." |
*
* @param {Homeherodescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homeherodescription2 = /** @type {((inputs: Homeherodescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeherodescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_homeherodescription2(inputs)
	if (locale === "zh") return zh_homeherodescription2(inputs)
	if (locale === "ja") return ja_homeherodescription2(inputs)
	if (locale === "ko") return ko_homeherodescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homeherodescription2(inputs)
	if (locale === "de") return de_homeherodescription2(inputs)
	if (locale === "fr") return fr_homeherodescription2(inputs)
	if (locale === "uk") return uk_homeherodescription2(inputs)
	return en_homeherodescription2(inputs)
});
export { homeherodescription2 as "homeHeroDescription" }