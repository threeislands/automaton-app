import * as React from "react";
import {useTranslation} from "react-i18next";
import Grid from "@material-ui/core/Grid";
import AutomatonImage1 from "../images/automaton.png"
import ElevatorImage from "../images/elevator.png"
import AutoDoorImage from "../images/auto_door.png"
import M1_101Gif from "../images/automaton_101.gif"
import NoLabelImage from "../images/no_label.png"
import DuplicateLabelImage from "../images/duplicate_label.png"
import MultiLabelImage from "../images/multi_label.png"
import {useHistory} from "react-router-dom";
import * as style from "./AutomatonGuide.module.scss";
import Button from "@material-ui/core/Button";
import {useEffect} from "react";
import * as Constant from "../constant";

function AutomatonGuide(props) {

  const {t, i18n} = useTranslation()
  const history = useHistory();

  useEffect(() => {
    document.title = t('aboutAutomaton.title');
    window.gtag('config', Constant.REACT_APP_GATAG_ID);
  }, []);

  const String = (props) => {
    return <span className={style.string}> {props.children} </span>
  }

  return (
    <Grid container style={{maxWidth: '1000px', margin: '0.5px auto 0px'}}>
      <Grid item sm={12} style={{padding: "20px 50px", margin: "15px 6px", background: "white", borderRadius: '5px'}}>
        <h1>オートマトンとは？</h1>

        オートマトンとはなんでしょうか？<br/>

        <p>
          ひとことでいうと、計算機を抽象化したモデルです。<br/>
          具体的には、内部に状態を持ち入力に応じて、状態を変化させる機械です！！
        </p>

        <p>
          これだけですと、よくわからないですね。。<br/>
          実際にオートマトンを見てみましょう！<br/>
        </p>

        <h2>身近なオートマトン</h2>
        <p>
          オートマトンという言葉は聞き慣れないかもしれません。<br/>
          日常生活で目にするもののなかにも、オートマトンで表現できるものがあります。<br/>
          例えば、エレベーターや自動ドアなどです。
        </p>

        <p>エレベーターのオートマトンからみてみましょう。</p>
        <h3>
          エレベーター(３階建て)のオートマトン
        </h3>

        <img src={ElevatorImage} alt=""/>

        <p>
          いったん、オートマトンについて簡単に説明します！<br/>
          オートマトンは状態、入力信号、遷移(矢印とラベル)から構成されています。<br/>
        </p>

        <ul className={style.list}>
          <li>
            <b>状態</b><br/>
            オートマトンが持つ状態の集合です。<br/>
            エレベーターの場合、各フロアが状態となります。 {'{'}<String>1F</String>,<String>2F</String>,<String>3F</String>{'}'}<br/>
            上の図では、◯の中にフロアが表示されているものが状態です。
          </li>
          <li>
            <b>入力信号</b><br/>
            オートマトンに入力したときに状態を変化させる値の集合です。<br/>
            エレベーターの場合、階数のボタンが入力信号となります。{'{'} <String>1</String>,<String>2</String>,<String>3</String>{'}'}<br/>
            上の図では、矢印のラベル(文字)となるのが入力信号です。
          </li>
          <li>
            <b>遷移</b><br/>
            状態と入力信号から次に移動する状態を求める関数です。<br/>
            エレベーターの場合、任意のフロアで任意のボタンを押したときに移動するフロアに相当します。<br/>
            上の図では、矢印とそのラベルが遷移となります。<br/>
            (具体例）
            <ul className={style.list}>
              <li>
                <String>1F</String>で<String>2</String>のボタンを押した場合<br/>
                <String>1F</String>から<String>2F</String>への矢印のラベルに<String>2</String>が表示されているので、<String>2F</String>に移動します。
              </li>
              <li>
                <String>2F</String>で<String>2</String>のボタンを押した場合<br/>
                <String>2F</String>から<String>2F</String>への矢印のラベルに<String>2</String>が表示されているので、<String>2F</String>に移動します。(そのまま)
              </li>
            </ul>
          </li>
        </ul>
        <p>
          このオートマトンの動きを確認してみましょう。<br/>
          <String>1F</String>から開始して、<String>3</String><String>1</String><String>2</String>の順番でボタンを押した場合を想定してみます。<br/>
          <ol className={style.list}>
            <li>
              <String>1F</String>から開始します。
            </li>
            <li>
              <String>3</String>が入力されました。<br/>
              <String>1F</String>から<String>3F</String>への矢印のラベルに<String>3</String>が表示されているので、<String>3F</String>に移動します。
            </li>
            <li>
              <String>1</String>が入力されました。<br/>
              <String>3F</String>から<String>1F</String>への矢印のラベルに<String>1</String>が表示されているので、<String>1F</String>に移動します。
            </li>
            <li>
              <String>2</String>が入力されました。<br/>
              <String>1F</String>から<String>2F</String>への矢印のラベルに<String>2</String>が表示されているので、<String>2F</String>に移動します。
            </li>
          </ol>
          オートマトンでエレベーターの動作を表現できていますね！<br/>
          今回の例は状態と入力信号が１対１で対応してるので、利点がわかりにくかったかもしれません。<br/>
        </p>
        <p>
          以下の流れがイメージできていれば大丈夫です。<br/>
          開始状態→入力信号を受け取る→遷移に従って状態を移動する→入力信号を受け取る→遷移に従って状態を移動する ... <br/>
          これを入力信号がなくなるまで繰り返します。<br/>
          ポイントは、オートマトンは状態を保持しながら、移動繰り返すことができるという点です。
        </p>
        <p>
          自動ドアのオートマトンもみてみましょう。
        </p>
        <h3>
          自動ドアのオートマトン
        </h3>
        <img src={AutoDoorImage} alt=""/>
        <ul className={style.list}>
          <li>
            <b>状態</b><br/>
            ドアの開閉が状態となります。 {'{'}<String>閉</String>,<String>開</String>{'}'}<br/>
          </li>
          <li>
            <b>入力信号</b><br/>
            今回は4種類の入力を想定します。<br/>
            {'{'}<String>前 (前方に人がいる)</String>,<String>後 (後方に人がいる)</String>,<String>両方 (前後に人がいる)</String>,<String>無
            (人がいない)</String>{'}'}<br/>
          </li>
          <li>
            <b>遷移</b><br/>
            ドアの開閉状態と入力信号によって、ドアの状態がどちらに変化するかに相当します。<br/>
            (具体例）
            <ul className={style.list}>
              <li>
                ドアが閉まっているときに、前方から人が現れた場合<br/>
                <String>閉</String>から<String>開</String>への矢印のラベルに<String>前</String>が表示されているので、<String>開</String>に移動します。
              </li>
              <li>
                ドアが開いているときに、前方と後方から人が現れた場合<br/>
                <String>開</String>から<String>開</String>への矢印のラベルに<String>両方</String>が表示されているので、<String>開</String>に移動します。(そのまま)
              </li>
              <li>
                ドアが開いているときに、ドアから人が立ち去った場合<br/>
                <String>開</String>から<String>閉</String>への矢印のラベルに<String>無</String>が表示されているので、<String>閉</String>に移動します。
              </li>
            </ul>
          </li>
        </ul>
        <p>
          オートマトンの動作はイメージできましたか？？<br/>
          次に有限オートマトンについてみてきます。
        </p>

        <h2>有限オートマトン</h2>
        <p>
          有限オートマトンは、オートマトンをより厳密に定義したものです。<br/>
        </p>
        <h3>有限オートマトン M<sub>1</sub>の図</h3>
        <img src={AutomatonImage1} alt=""/>

        <h3>有限オートマトンの構成</h3>
        <p>
          有限オートマトンは<b>状態</b>と<b>アルファベット</b>、<b>遷移</b>から構成されています。<br/>
          これまで説明してきたオートマトンとの大きな違いは、以下の２点です。<br/>
          <ul>
            <li>状態は、"受理状態"と"そうでない状態"の２種類しかない</li>
            <li>入力の集合の呼び方が"入力信号"→"アルファベット"になった</li>
          </ul>
          それぞれ順にみていきます。
        </p>

        <ul className={style.list}>
          <li>
            <b>状態</b><br/>
            状態には、受理状態(記号が◎)とそうでない状態(記号が◯)の2種類があります。<br/>
            また、開始時の状態を開始状態といいます。<br/>
            オートマトンM<sub>1</sub>の状態は、{'{'}<String>A</String>,<String>B</String>{'}'}です。<br/>
            <String>B</String>が受理状態で、<String>A</String>が受理状態ではありません。<br/>
            また、<String>A</String>が開始状態となります。
          </li>
          <li>
            <b>アルファベット</b><br/>
            入力される文字の集合です。<br/>
            ※ここでいうアルファベットは、ローマ字のアルファベットのことではありません。<br/>
            オートマトンM<sub>1</sub>では、{'{'}<String>0</String>,<String>1</String>{'}'}です。
          </li>
          <li>
            <b>遷移</b><br/>
            状態と入力文字から次に移動する状態を決定する関数です。<br/>
            上の図では、矢印とそのラベルが遷移となります。
          </li>
        </ul>

        <h3>有限オートマトンの動作</h3>

        <p>
          まず、以下の用語について説明します。
          <ul className={style.list}>
            <li>
              入力文字列<br/>
              アルファベットの文字を組み合わせた文字列で、これをオートマトンに入力します。<br/>
              例）アルファベットが {'{'}<String>0</String>,<String>1</String>,<String>2</String>{'}'} の場合の入力文字列<br/>
              <String>1012</String>,<String>1</String>,<String>0002</String>,<String>1111</String>,<String>1011</String>,<String>1002</String>,<String>2210</String>,
              ...
            </li>
            <li>
              読み出す<br/>
              入力文字列を左から１文字取り出して、オートマトンに入力することを意味します。
            </li>
          </ul>
        </p>
        <p>
          早速、有限オートマトンの動きをみていきましょう。<br/>
          開始状態から、入力文字列を1文字読み出して、その文字をラベルとする遷移に従って次の状態に移動します。<br/>
          「移動した状態から、残りの入力文字列を1文字読み出して、次の状態に移動すること」を繰り返します。<br/>
          すべての文字を読み出して、最後に移動したのが受理状態であれば、入力文字列を受理します。<br/>
          受理状態でない場合、入力文字列を拒否します。<br/>
        </p>

        <p>
          文章だけだとイメージしにくいので、オートマトンのアニメーションをみていきましょう！
        </p>
        <p>
          オートマトンM<sub>1</sub>に<String>101</String>を入力した場合<br/>
          <ol className={style.list}>
            <img src={M1_101Gif} alt=""/>
            <li>
              <String>A</String>から開始します。
            </li>
            <li>
              入力文字列(<String>101</String>)の左から1文字目(<String>1</String>)を読み出します。<br/>
              <String>A</String>から<String>B</String>の矢印のラベルに<String>1</String>が表示されているので、<String>B</String>へ移動します。
            </li>
            <li>
              残り文字列(<String>01</String>)の左から1文字目(<String>0</String>)を読み出します。<br/>
              <String>B</String>から<String>A</String>の矢印のラベルに<String>0</String>が表示されているので、<String>A</String>へ移動します。
            </li>
            <li>
              残り文字列(<String>1</String>)の左から1文字目(<String>1</String>)を読み出します。<br/>
              <String>A</String>から<String>B</String>の矢印のラベルに<String>1</String>が表示されているので、<String>B</String>へ移動します。
            </li>
            <li>
              全ての入力文字列を読み終えました。<br/>
              このとき、オートマトンM<sub>1</sub>は受理状態にあるので、<String>101</String>を受理します。
            </li>
          </ol>
        </p>

        <p>
          有限オートマトンの動きがイメージできましたか？？<br/>
          以下の流れが理解できれば、大丈夫です。<br/>
          開始状態からスタート→1文字読み出す→次の状態に移動する→1文字読み出す→次の状態に移動する→…→最後の1文字を読み出す→次の状態に移動する→受理 or 拒否 を出力
        </p>

        <h3>有限オートマトンのルール</h3>

        <p>
          有限オートマトンつくるには、そのルールを理解しておく必要があります。<br/>
          早速、有限オートマトンのルールを説明していきます。<br/>
          ここから若干難しくなってくるので、全集中の呼吸で臨みましょう！！
        </p>

        <ol className={style.list}>
          <li>
            開始状態は１つであること<br/>
            状態のうち１つは開始状態でなければなりません。
          </li>
          <li>
            受理状態は０個以上であること<br/>
            以下の場合も、有効な有限オートマトンです。<br/>
            <ul>
              <li>受理状態が０個</li>
              <li>すべての状態が受理状態</li>
            </ul>
            また、開始状態を受理状態とすることも可能です。
          </li>
          <li>
            遷移は入力文字に対して、ただ一つの次の状態を示すこと<br/>
            以下の場合は、不正な有限オートマトンです。(アルファベットが {'{'}<String>0</String>,<String>1</String>{'}'} の場合)
            <ul>
              <li>
                入力文字に対する遷移がない<br/>
                <String>A</String>で、<String>1</String>を読み出したときの遷移がなく、次の状態に移動できません。<br/>
                <img src={NoLabelImage} alt=""/>
              </li>
              <li>
                入力文字に対する遷移が複数ある<br/>
                <String>A</String>で、<String>1</String>を読み出したときの遷移が複数あり、どちらの遷移に従うか決定できません。<br/>
                <img src={DuplicateLabelImage} alt=""/>
              </li>
            </ul>
            また、遷移のラベルに複数の文字を指定できます。(アルファベットが {'{'}<String>0</String>,<String>1</String>,<String>2</String>{'}'} の場合)<br/>
            <ul>
              <li>
                遷移に複数の文字が指定されている<br/>
                <String>A</String>で、<String>0</String>または<String>1</String>を読み出したときに、<String>A</String>に移動します。(同じ状態に戻ってくる)<br/>
                <String>B</String>で、<String>0</String>または<String>1</String>を読み出したときに、<String>A</String>に移動します。<br/>
                <img src={MultiLabelImage} alt=""/>
              </li>
            </ul>
          </li>
        </ol>

        <h3>有限オートマトンで表現できるもの</h3>
        <p>
          有限オートマトンのルールは理解できましたか？？<br/>
          いったん、有限オートマトンについておさらいします。<br/>
          有限オートマトンは入力文字列をすべて読み出すと、受理 or 拒否を出力します。<br/>
        </p>
        <p>
          では、有限オートマトンによって、何を表現できるのでしょうか？<br/>
          試しに、有限オートマトンM<sub>1</sub>に<String>101</String>以外の文字列も入力してみましょう！<br/>
          入力する文字列：<String>01</String>,<String>0</String>,<String>111</String>,<String>100</String>,<String>0100</String><br/>
          各文字列の出力結果をまとめると、↓のようになります。
        </p>
        <ul className={style.list}>
          <li>
            受理する文字列<br/>
            <String>01</String>,<String>111</String>
          </li>
          <li>
            拒否する文字列<br/>
            <String>0</String>,<String>100</String>,<String>0100</String>
          </li>
        </ul>
        <p>
          おっと！？なんだか法則性が見えてきましたね！！<br/>
          そうです！有限オートマトンM<sub>1</sub> は、「1で終わる文字列」を受理するオートマトンでした。<br/>
          有限オートマトンによって、文字列のパターンを表現することができます。<br/>
        </p>

        {/*<h3>有限オートマトンの応用</h3>*/}
        {/*<p>*/}
        {/*  有限オートマトンで文字列のパターンを表現できることがわかりました。<br/>*/}
        {/*  でも、これが何の役に立つというのでしょうか？<br/>*/}
        {/*</p>*/}

        <h2>あとがき</h2>
        <p>
          今回紹介した内容は、正式なオートマトンの定義ではありません。<br/>
          もっとくわしく知りたい方は以下の書籍を読んでみてください。<br/>
          <a href="https://www.kyoritsu-pub.co.jp/bookdetail/9784320122079" target="_blank">
            計算理論の基礎 [原著第2版] 1.オートマトンと言語</a>
        </p>

        <h2>プレイ方法について</h2>
        <p>
          このページでは、オートマトンについての紹介を行ってきました。<br/>
          読み進めるのが大変だったと思います。お疲れさまでした。。。<br/>
        </p>
        <p>
          このサイトのプレイ方法はシンプルです。<br/>
          どのようなオートマトンをつくるのかお題を出します。<br/>
          そのお題のオートマトンを実際につくってもらいます！<br/>
        </p>
        <p>
          例えば以下のようなお題です。<br/>
          <ul>
            <li>
              <String>0</String>から始まる文字列<br/>
              アルファベット：{'{'}<String>0</String>,<String>1</String>{'}'}
            </li>
            <li>
              <String>10</String>を含む文字列<br/>
              アルファベット：{'{'}<String>0</String>,<String>1</String>,<String>2</String>{'}'}
            </li>
          </ul>
          以下のリンクからくわしいプレイ方法をみていきましょう！<br/>
        </p>
        <Button onClick={() => history.push('/play_guide')} variant="outlined"
                color="default">
          プレイ方法をみる
        </Button>
      </Grid>
    </Grid>
  );

}

export default AutomatonGuide;