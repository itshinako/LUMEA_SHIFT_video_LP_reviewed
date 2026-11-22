# LUMEA SHIFT — 動画連動LP 改訂版

## 確認方法
`index.html` を開くか、VS Code Live Serverで表示してください。実際の注文・会員登録は行われません。

## 公開前に必須の設定
- **canonical URL**：公開先が未定のため、架空のURLを設定していません。公開URLが決まったら `<head>` に `<link rel="canonical" href="https://公開ドメイン/公開パス/">` を追加してください。
- **OGP画像URL**：`og:image` は現在 `assets/ogp.jpg` の相対パスです。SNS共有の本番運用時は公開サイトの `https://.../assets/ogp.jpg` に変更してください。
- `og:url` も公開URL決定後に設定してください。
- 架空の商品・レビュー・会社情報のため、実販売に転用する場合は正式な成分、価格、配送、返品、特商法表示、プライバシーポリシー等の確認が必要です。
- 生成画像・動画はイメージであり実際の使用結果ではありません。

## ファイル構成
- `index.html`：構造・SEO/OGPメタ情報
- `style.css`：デザイン・レスポンシブ・操作状態
- `script.js`：動画遅延読み込み・購入/登録デモ
- `favicon.svg` / `favicon-32.png` / `apple-touch-icon.png`：アイコン
- `assets/ogp.jpg`：OGP用1200×630画像
- `assets/*.mp4`：動画素材5本

## 修正内容
- モーダルの完了→再開時のイベントハンドラ問題を解消
- 動画の表示領域判定・省動作設定・画面外停止
- キーボードフォーカス、タップ領域、ホバー/アクティブ状態
- OGP画像の新規用意、Twitterカード、favicon追加
- 外部JS/CSS分離を維持、Google Mapはオンライン商品LPのため非設置

## 制限事項
実機・複数ブラウザでの操作テストおよび公開環境のSNSカード取得テストは未実施です。
