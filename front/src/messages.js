const messages = {
  ja: {
    translation: {
      appTitle: '恋するオートマトン♭',
      header: {
        login: 'ログイン',
        logout: 'ログアウト',
        removeAccount: 'アカウント削除',
        cancel: 'キャンセル',
        removeAccountDialog: {
          title: 'アカウント削除のご確認',
          message: '作成したオートマトン、クリア履歴が削除されます。'
        },
      },
      home: {
        welcomeTitle: 'ようこそ！『恋するオートマトン♭』へ！！',
        welcomeMessage: `<p>当サイトでは、楽しみながらオートマトンをつくることができます</p>
                         <p>初めて訪れる方は、「オートマトンとは」から読んでみてください</p>`,
        aboutAutomaton: 'オートマトンとは',
        howToPlay: 'プレイ方法',
        questionPrefix: 'レベル',
      },
      contextMenu: {
        change: '変更',
        delete: '削除'
      },
      actionBar: {
        howToPlay: 'プレイ方法',
        save: '保存',
        reset: 'リセット',
        test: '回答',
        stop: '中止',
        resetDialog: {
          message: '作成したオートマトンを初期化しますがよろしいでしょうか？'
        }
      },
      questionArea: {
        inputSequences: 'アルファベット：'
      },
      sequenceNav: {
        acceptingString: '受理する文字列',
        notAcceptingString: '拒否する文字列',
      },
      common: {
        ok: 'OK',
        close: '閉じる',
        cancel: 'キャンセル'
      },
      clearPopup: {
        title: 'Congratulations!!',
        message: 'おめでとうございます！！<br/>{{title}}をクリアしました。',
        nextQuestion: '次の問題に進む'
      },
      loginDialog: {
        title: '外部システムと連携してログイン',
        content: '以下の機能が利用できます。<br/>・作成したオートマトンの保存<br/> ・クリア履歴の保存',
        loginWithGoogle: 'Googleアカウントでログイン',
        loginWithTwitter: 'Twitterアカウントでログイン'
      },
      footer: {
        aboutLovingAutomaton: '恋するオートマトン♭について',
        termOfService: '利用規約',
        privacyPolicy: 'プライバシーポリシー',
        contactUs: 'お問い合わせ',
        watchSource: 'ソースコードをみる',
        sourceHere: 'こちら (Githubのリンク)',
        copyright: '© 2020 s-threeislands',
      }
    }
  }
}

export default messages;