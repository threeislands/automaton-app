import * as React from "react";
import {useTranslation} from "react-i18next";
import PlayImage from "../images/play_screen_structure.png"
import CreateStateGif from "../images/create_state.gif"
import ChangeStateGif from "../images/change_state.gif"
import DeleteStateGif from "../images/delete_state.gif"
import CreateTransitionGif from "../images/create_transition.gif"
import CreateTransitionSelfGif from "../images/create_transition_self.gif"
import InputTransitionLabel from "../images/input_transition_label.gif"
import DeleteTransitionGif from "../images/delete_transition.gif"
import PlayGif from "../images/play.gif"
import Grid from "@material-ui/core/Grid";
import * as style from "./PlayGuide.module.scss";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import {useEffect} from "react";
import * as Constant from "../constant";


function PlayGuide(props) {

  const history = useHistory();
  const {t, i18n} = useTranslation();

  useEffect(() => {
    document.title = t('playGuide.title');
    window.gtag('config', Constant.REACT_APP_GATAG_ID);
  }, []);

  return (
    <Grid container style={{maxWidth: '1000px', margin: '0.5px auto 0px'}}>
      <Grid item sm={12} style={{padding: "20px 50px", margin: "15px 6px", background: "white", borderRadius: '5px'}}>
        <h1>プレイ方法</h1>
        <p>
          前のページでは、オートマトンについて紹介しました。<br/>
          今度は、実際にプレイ方法を見ていきます。<br/>
        </p>
        <p>
          といっても、プレイ方法はシンプルです。<br/>
          お題にあるオートマトンを作るだけです！<br/>
        </p>

        <p>
          まずは、プレイ画面の画面構成からみていきます<br/>
        </p>
        <h2>画面構成</h2>
        <img src={PlayImage} style={{width: "70%"}} alt=""/>
        <p>
          プレイ画面は、以下の４つの欄で構成されています。<br/>
          <ul className={style.numberPropertyList}>
            <li>
              &#9312;<b>お題</b><br/>
              「どのようなオートマトンを作成するか」と「アルファベット」が表示されます。<br/>
            </li>
            <br/>
            <li>
              &#9313;<b>入力文字列</b><br/>
              「受理する文字列」と「拒否する文字列」の一覧がそれぞれ表示されます。<br/>
              回答ボタンをクリックしたときに、この字列を作成したオートマトンに入力します。<br/>
              長さが0の文字列は、「空文字」と表示されます。<br/>
              また、難易度が高くなるにつれ、文字列はマスキングして表示されます。
            </li>
            <br/>
            <li>
              &#9314;<b>操作ボタン</b><br/>
              左から順に<br/>
              「プレイ方法」・・・ダイアログが開いて、プレイ方法を確認できます。<br/>
              「リセット」・・・作成したオートマトンをクリアして、初期表示時に戻します。<br/>
              「保存」 (ログインユーザのみ)・・・作成したオートマトンを保存します。<br/>
              「回答」・・・&#9313;入力文字列の文字列を順に読み出して、オートマトンが正しいかテストします。<br/>
              「中止」・・・回答アニメーションを中止します。<br/>
            </li>
            <br/>
            <li>
              &#9315;<b>オートマトン描画</b><br/>
              ここにオートマトンを描画します。<br/>
              初期表示時は、開始状態のみ作成済みとなっています。
            </li>
          </ul>
        </p>
        <p>
          次に実際のプレイ手順を確認していきます。
        </p>
        <h2>プレイ手順</h2>
        <ol className={style.list}>
          <li>
            「お題」と「アルファベット」の確認<br/>
            まず、画面上のお題の欄を確認して、どのようなオートマトンをつくるか理解しておきます。
          </li>
          <li>
            入力文字列の確認<br/>
            画面左にある「受理する文字列」と「拒否する文字列」を確認します。<br/>
            事前にどのような文字列が入力されるかを把握しておきます。<br/>
            オートマトンをつくりながら<br/>
            <ul>
              <li>
                受理する文字列の場合<br/>
                入力文字列を読み終えたときに受理状態にあること
              </li>
              <li>
                拒否する文字列の場合<br/>
                入力文字列を読み終えたときに受理状態にないこと
              </li>
            </ul>
            を確認していきます。<br/>
            ※また、オートマトンは、お題の情報だけで作成可能です。
          </li>
          <li>
            オートマトンの作成<br/>
            お題と入力文字列を確認が終わったら、実際にオートマトンを作っていきます。<br/>
            オートマトンの作成方法は後述します。
          </li>
          <li>
            回答ボタンを押して、オートマトンが正しいか確認する<br/>
            オートマトンの作成が完了したら、回答ボタンを押します。<br/>
            回答のアニメーションがスタートして、画面左の入力文字列を順に読み出していきます。<br/>
            すべての入力文字列の出力結果が正しければ、クリアのダイアログが表示されます！！<br/>
            文字列の出力結果に誤りがあった場合、その文字列の背景が赤くなります。
          </li>
        </ol>
        <p>
          プレイ手順はイメージできましたか？<br/>
          オートマトンの作成方法を紹介する前に、いったんプレイ動画をみてみましょう！
        </p>

        <h2>プレイ動画</h2>
        <img src={PlayGif} style={{width: "70%"}} alt=""/>

        <h2>オートマトンの作成方法</h2>
        <ul>
          <li>
            <b>状態を追加する</b><br/>
            任意のクリックした場所に、状態が作成されます。<br/>
            <b>※プレイ画面で、作成できる状態は6個までです。</b><br/>
            <img src={CreateStateGif} alt=""/>
          </li>
          <li>
            <b>状態を受理状態にする／受理状態を元の状態に戻す</b><br/>
            状態にカーソルをのせて、右クリックをします。<br/>
            メニューが表示されるので「変更」をクリックします。<br/>
            受理状態にカーソルをのせて、右クリック→「変更」で元の状態に戻すことができます。<br/>
            <img src={ChangeStateGif} alt=""/>
          </li>
          <li>
            <b>状態を削除する</b><br/>
            状態にカーソルをのせて、右クリックをします。<br/>
            メニューが表示されるので「削除」をクリックします。<br/>
            <img src={DeleteStateGif} alt=""/>
          </li>
          <li>
            <b>遷移を追加する</b><br/>
            遷移の追加方法には以下の２種類があります。<br/>
            <ul className={style.numberPropertyList}>
              <li>
                &#9312;遷移先と遷移元の状態が異なる遷移を追加する<br/>
                遷移元の状態をクリックして、選択します。(輪郭がハイライトされます)<br/>
                その後、遷移先の状態をクリックします。<br/>
                <img src={CreateTransitionGif} alt=""/>
              </li>
              <li>
                &#9313;遷移先と遷移元の状態が同じ遷移を追加する<br/>
                状態をダブルクリックします。<br/>
                <img src={CreateTransitionSelfGif} alt=""/>
              </li>
            </ul>
          </li>
          <li>
            <b>遷移のラベルを入力する</b><br/>
            遷移を追加すると、矢印の真ん中にテキストボックスが作成されます。<br/>
            テキストボックスをクリックすると、カーソルが表示され文字を入力することができます。<br/>
            複数の文字を入力する場合は、「,」で区切って入力します。<br/>
            <img src={InputTransitionLabel} alt=""/>
          </li>
          <li>
            <b>遷移を削除する</b><br/>
            遷移のテキストボックスにカーソルをのせて、右クリックをします。<br/>
            メニューが表示されるので、「削除」をクリックします。<br/>
            <img src={DeleteTransitionGif} alt=""/>
          </li>
        </ul>

        <h2>終わりに</h2>
        <p>
          お疲れさまです！<br/>
          プレイ方法の紹介が終わりました。<br/>
          {/*覚えることが多く大変だと思いますが、わからなくなっても立ち戻って確認していきましょう！<br/>*/}
          早速、プレイしてみましょう！！Let's オートマトン！！<br/>
        </p>
        <Button onClick={() => history.push('/play/1')} variant="outlined"
                color="default">
          レベル１をプレイ
        </Button>
      </Grid>
    </Grid>
  );

}

export default PlayGuide;