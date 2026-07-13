/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ecosystemCount: NonNullable<unknown> }} Homeherodescription2Inputs */

const en_homeherodescription2 = /** @type {(inputs: Homeherodescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`A CLI that scaffolds preconfigured fullstack starters across ${i?.ecosystemCount} language ecosystems. Pick your stack — frontend, database, auth, payments, AI — and run one command.`)
};

const es_homeherodescription2 = /** @type {(inputs: Homeherodescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Una CLI que crea starters fullstack preconfigurados en ${i?.ecosystemCount} ecosistemas de lenguajes. Elige frontend, base de datos, auth, pagos e IA, y ejecuta un solo comando.`)
};

const zh_homeherodescription2 = /** @type {(inputs: Homeherodescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`一个 CLI，可在 ${i?.ecosystemCount} 个语言生态中生成预配置的全栈 starter。选择前端、数据库、认证、支付和 AI，然后运行一个命令。`)
};

const ja_homeherodescription2 = /** @type {(inputs: Homeherodescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemCount} つの言語エコシステムに対応し、事前設定済みのフルスタックスターターを生成する CLI です。フロントエンド、データベース、認証、支払い、AI を選んでコマンドを 1 つ実行するだけ。`)
};

const ko_homeherodescription2 = /** @type {(inputs: Homeherodescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystemCount}개 언어 생태계에서 미리 구성된 풀스택 스타터를 생성하는 CLI입니다. 프런트엔드, 데이터베이스, 인증, 결제, AI를 선택하고 명령 하나를 실행하세요.`)
};

const zh_hant1_homeherodescription2 = /** @type {(inputs: Homeherodescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`一個 CLI，可在 ${i?.ecosystemCount} 個語言生態中產生預先設定的全端 starter。選擇前端、資料庫、認證、付款和 AI，然後執行一個指令。`)
};

const de_homeherodescription2 = /** @type {(inputs: Homeherodescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Eine CLI erstellt vorkonfigurierte Fullstack-Starter in ${i?.ecosystemCount} Sprachökosystemen. Wählen Sie Frontend, Datenbank, Authentifizierung, Zahlungen und KI und führen Sie einen Befehl aus.`)
};

const fr_homeherodescription2 = /** @type {(inputs: Homeherodescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Un CLI qui crée des starters fullstack préconfigurés dans ${i?.ecosystemCount} écosystèmes de langages. Choisissez votre pile — frontend, base de données, authentification, paiements, IA — et exécutez une commande.`)
};

const uk_homeherodescription2 = /** @type {(inputs: Homeherodescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`CLI, який генерує попередньо налаштовані фулстек-стартери у ${i?.ecosystemCount} мовних екосистемах. Оберіть фронтенд, базу даних, автентифікацію, платежі та ШІ — і запустіть одну команду.`)
};

/**
* | output |
* | --- |
* | "A CLI that scaffolds preconfigured fullstack starters across {ecosystemCount} language ecosystems. Pick your stack — frontend, database, auth, payments, AI —..." |
*
* @param {Homeherodescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homeherodescription2 = /** @type {((inputs: Homeherodescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeherodescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homeherodescription2(inputs)
	if (locale === "es") return es_homeherodescription2(inputs)
	if (locale === "zh") return zh_homeherodescription2(inputs)
	if (locale === "ja") return ja_homeherodescription2(inputs)
	if (locale === "ko") return ko_homeherodescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homeherodescription2(inputs)
	if (locale === "de") return de_homeherodescription2(inputs)
	if (locale === "fr") return fr_homeherodescription2(inputs)
	return uk_homeherodescription2(inputs)
});
export { homeherodescription2 as "homeHeroDescription" }