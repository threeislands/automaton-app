import * as React from "react";
import {useEffect} from "react";
import {useTranslation} from "react-i18next";
import Grid from "@material-ui/core/Grid";
import {useHistory} from "react-router-dom";
import * as Constant from "../constant";
import * as style from "./Common.module.scss";

function PrivacyPolicy(props) {

  const {t, i18n} = useTranslation()
  const history = useHistory();

  useEffect(() => {
    document.title = t('privacyPolicy.title');
    window.gtag('config', Constant.REACT_APP_GATAG_ID);
  }, []);

  return (
    <Grid container style={{maxWidth: '1000px', margin: '0.5px auto 0px'}}>
      <Grid item sm={12} style={{padding: "20px 50px", margin: "15px 6px", background: "white", borderRadius: '5px'}}>

        <h1>プライバシーポリシー</h1>
        <p>
          s-threeislands（以下，「当方」といいます。）は，本ウェブサイト上で提供するサービス（以下,「本サービス」といいます。）における，ユーザーの個人情報を含む利用者情報の取扱いについて，以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。
        </p>

        <h2>第1条（利用者情報）</h2>
        <p>
          「利用者情報」とは，ユーザの識別情報、通信サービス上の行動履歴を指し，本ポリシーに基づき本サービスが収集するものを意味するものとします。
        </p>

        <h2>第2条（利用者情報の収集方法）</h2>
        <p>
          当方は，ユーザーが利用登録をする際に以下の情報を取得します。<br/>
        </p>
        <ol className={style.list}>
          <li>
            ユーザが本サービスの利用において、他のサービスと連携を許可することにより、本サービスに提供いただく情報<br/>
            ユーザが、本サービスの利用するにあたり、他のサービスとの連携を許可した場合、その許可の際に同意いただいた内容に基き、以下の情報を収集します。<br/>
            <ol>
              <li>当該外部サービスで、ユーザを識別するID</li>
              <li>外部サービスで利用しているユーザの名前もしくは、ユーザ名</li>
            </ol>
          </li>
          <li>
            ユーザが本ザービスを利用するにあたって、当方が収集する情報<br/>
            本サービスへのアクセス状況やそのご利用方法に関する情報を収集することがあります。これらには以下の情報が含まれます。
            <ol>
              <li>リファラ</li>
              <li>サーバアクセスログに関する情報</li>
              <li>Cookie、ADID、IDFA その他の識別子</li>
            </ol>
          </li>
        </ol>

        <h2>
          第3条（利用者情報を収集・利用する目的）
        </h2>
        <p>
          本サービスのサービス提供にかかわる利用者情報の具体的な利用目的は以下の通りです。
        </p>
        <ol className={style.list}>
          <li>本サービスに関する登録の受付、本人確認、ユーザ認証、ユーザ作成データの記録、保護及び改善のため</li>
          <li>ユーザのトラフィック測定及び行動測定のため</li>
          <li>広告の配信、表示及び効果測定のため</li>
        </ol>

        <h2>
          第4条（外部送信、第三者提供、情報収集モジュールの有無）
        </h2>
        <ol className={style.list}>
          <li>本サービスでは、以下の提携先が、ユーザの端末にCookieを保存し、これを利用して利用者情報を蓄積及び利用している場合があります。</li>

          <table border="1" style={{borderCollapse: 'collapse', marginTop: '0.5rem'}}>
            <tbody>
            <tr>
              <td>提携先</td>
              <td>Google</td>
            </tr>
            <tr>
              <td>上記提携先のプライバシーポリシーのURL</td>
              <td><a href="https://policies.google.com/privacy?hl=ja" target="_blank">
                https://policies.google.com/privacy?hl=ja
              </a></td>
            </tr>
            <tr>
              <td>上記提携先のオプトアウト(無効化)URL</td>
              <td><a
                href="https://chrome.google.com/webstore/detail/google-analytics-opt-out/fllaojicojecljbmefodhfapmkghcbnh?hl=ja"
                target="-_blank">
                https://chrome.google.com/webstore/detail/google-analytics-opt-out/fllaojicojecljbmefodhfapmkghcbnh?hl=ja
              </a>
              </td>
            </tr>
            </tbody>
          </table>

          <li>本サービスには以下の情報収集モジュールが組み込まれています。これに伴い、以下のとおり情報収集モジュール提供者(日本国外にある者を含みます。)への利用者情報の提供を行います。</li>
          <table border="1" style={{borderCollapse: 'collapse', marginTop: '0.5rem'}}>
            <tbody>
            <tr>
              <td>情報収集モジュールの名称</td>
              <td>Google Analytics</td>
            </tr>
            <tr>
              <td>情報収集モジュールの提供者</td>
              <td>Google</td>
            </tr>
            <tr>
              <td>上記提供者のプライバシーポリシーのURL</td>
              <td>
                <a href="https://policies.google.com/privacy?hl=ja" target="_blank">
                  https://policies.google.com/privacy?hl=ja
                </a>
              </td>
            </tr>
            </tbody>
          </table>
        </ol>

        <h2>
          第5条（利用目的の変更）
        </h2>
        <ol className={style.list}>
          <li>当方は，利用目的が変更前と関連性を有すると合理的に認められる場合に限り，利用者情報の利用目的を変更するものとします。</li>
          <li>利用目的の変更を行った場合には，変更後の目的について，当方所定の方法により，ユーザーに通知し，または本ウェブサイト上に公表するもの</li>
        </ol>

        <h2>第6条（利用者情報の第三者提供）</h2>
        <ol className={style.list}>
          <li>
            当方は，次に掲げる場合を除いて，あらかじめユーザーの同意を得ることなく，第三者に利用者情報を提供することはありません。ただし，個人情報保護法その他の法令で認められる場合を除きます。
            <ol className={style.list}>
              <li>提携先、情報収集モジュール提供者へ個人情報が提供される場合</li>
              <li>人の生命，身体または財産の保護のために必要がある場合であって，本人の同意を得ることが困難であるとき</li>
              <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって，本人の同意を得ることが困難であるとき</li>
              <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって，本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき</li>
              <li>予め次の事項を告知あるいは公表し，かつ当方が個人情報保護委員会に届出をしたとき</li>
              <ol className={style.list}>
                <li>利用目的に第三者への提供を含むこと</li>
                <li>第三者に提供されるデータの項目</li>
                <li>第三者への提供の手段または方法</li>
                <li>本人の求めに応じて個人情報の第三者への提供を停止すること</li>
                <li>本人の求めを受け付ける方法</li>
              </ol>
            </ol>
          </li>
          <li>
            前項の定めにかかわらず，次に掲げる場合には，当該情報の提供先は第三者に該当しないものとします。
            <ol className={style.list}>
              <li>当方が利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合</li>
              <li>合併その他の事由による事業の承継に伴って個人情報が提供される場合</li>
              <li>個人情報を特定の者との間で共同して利用する場合であって，その旨並びに共同して利用される個人情報の項目，共同して利用する者の範囲，利用する者の利用目的および当該個人情報の管理について責任を有する者の氏名または名称について，あらかじめ本人に通知し，または本人が容易に知り得る状態に置いた場合</li>
            </ol>
          </li>
        </ol>

        <h2>第7条（個人情報の開示）</h2>
        <ol className={style.list}>
          <li>当方は，本人から個人情報の開示を求められたときは，本人に対し，遅滞なくこれを開示します。ただし，開示することにより次のいずれかに該当する場合は，その全部または一部を開示しないこともあり，開示しない決定をした場合には，その旨を遅滞なく通知します。なお，個人情報の開示に際しては，1件あたり1，000円の手数料を申し受けます。</li>
          <ol className={style.list}>
            <li>本人または第三者の生命，身体，財産その他の権利利益を害するおそれがある場合</li>
            <li>当方の業務の適正な実施に著しい支障を及ぼすおそれがある場合</li>
            <li>その他法令に違反することとなる場合</li>
          </ol>
          <li>前項の定めにかかわらず，履歴情報および特性情報などの個人情報以外の情報については，原則として開示いたしません。</li>
        </ol>

        <h2>第8条（個人情報の訂正および削除）</h2>
        <ol className={style.list}>
          <li>ユーザーは，当方の保有する自己の個人情報が誤った情報である場合には，当方が定める手続きにより，当方に対して個人情報の訂正，追加または削除（以下，「訂正等」といいます。）を請求することができます。</li>
          <li>当方は，ユーザーから前項の請求を受けてその請求に応じる必要があると判断した場合には，遅滞なく，当該個人情報の訂正等を行うものとします。</li>
          <li>当方は，前項の規定に基づき訂正等を行った場合，または訂正等を行わない旨の決定をしたときは遅滞なく，これをユーザーに通知します。</li>
        </ol>

        <h2>
          第9条（個人情報の利用停止等）
        </h2>
        <ol className={style.list}>
          <li>当方は，本人から，個人情報が，利用目的の範囲を超えて取り扱われているという理由，または不正の手段により取得されたものであるという理由により，その利用の停止または消去（以下，「利用停止等」といいます。）を求められた場合には，遅滞なく必要な調査を行います。</li>
          <li>前項の調査結果に基づき，その請求に応じる必要があると判断した場合には，遅滞なく，当該個人情報の利用停止等を行います。</li>
          <li>当方は，前項の規定に基づき利用停止等を行った場合，または利用停止等を行わない旨の決定をしたときは，遅滞なく，これをユーザーに通知します。</li>
          <li>前2項にかかわらず，利用停止等に多額の費用を有する場合その他利用停止等を行うことが困難な場合であって，ユーザーの権利利益を保護するために必要なこれに代わるべき措置をとれる場合は，この代替策を講じるものとします。</li>
        </ol>

        <h2>
          第10条（プライバシーポリシーの変更）
        </h2>
        <ol className={style.list}>
          <li>本ポリシーの内容は，法令その他本ポリシーに別段の定めのある事項を除いて，ユーザーに通知することなく，変更することができるものとします。</li>
          <li>当方が別途定める場合を除いて，変更後のプライバシーポリシーは，本ウェブサイトに掲載したときから効力を生じるものとします。</li>
        </ol>

        <h2>
          第11条（お問い合わせ窓口）
        </h2>
        <p>
          本ポリシーに関するお問い合わせは，お問い合わせからお願いいたします。
        </p>
      </Grid>
    </Grid>
  );

}

export default PrivacyPolicy;