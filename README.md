# 🌸 CosHub - Cosplayer Platform

美しいエロコスプレイヤー専用プラットフォーム with Twitter Integration

![CosHub](https://img.shields.io/badge/CosHub-v1.0-pink?style=for-the-badge&logo=react)
![Next.js](https://img.shields.io/badge/Next.js-15.x-black?style=for-the-badge&logo=next.js)
![Sanity](https://img.shields.io/badge/Sanity-CMS-red?style=for-the-badge&logo=sanity)
![HeroUI](https://img.shields.io/badge/HeroUI-Components-purple?style=for-the-badge)

## ✨ 特徴

- 🎭 **コスプレイヤープロフィール管理** - 美しいカードレイアウト
- 📥 **Twitter画像ダウンロード** - twitter-media-downloader統合
- 🎨 **モダンUI** - HeroUI + TailwindCSS
- 🛠️ **CMS統合** - Sanity Studio
- 📱 **レスポンシブデザイン** - 全デバイス対応
- 🔍 **検索機能** - コスプレイヤー検索
- 🏷️ **タグ管理** - カテゴリ分類

## 🚀 デモ

**本番サイト:** https://hothub-4ynuh4dnm-yosukes-projects-bc2e8ed6.vercel.app

## 🛠️ 技術スタック

### フロントエンド
- **Next.js 15** - React Framework
- **TypeScript** - 型安全性
- **HeroUI** - UIコンポーネント
- **TailwindCSS** - スタイリング
- **Framer Motion** - アニメーション

### バックエンド
- **Sanity CMS** - コンテンツ管理
- **Vercel** - ホスティング
- **Next.js API Routes** - API層

### 外部ツール
- **twitter-media-downloader** - Twitter画像取得

## 📋 必要環境

- Node.js 18+ 
- npm または pnpm
- twitter-media-downloader (オプション)

## ⚡ インストール

### 1. リポジトリクローン

\`\`\`bash
git clone https://github.com/shuttlekoby/hothub-website.git
cd hothub-website
\`\`\`

### 2. 依存関係インストール

\`\`\`bash
# ルートディレクトリ (Sanity)
npm install

# フロントエンド
cd frontend
npm install
\`\`\`

### 3. 環境変数設定

\`\`\`bash
# frontend/.env.local を作成
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
\`\`\`

### 4. twitter-media-downloader インストール (オプション)

Goが必要です:

\`\`\`bash
# Goインストール (macOS)
brew install go

# twitter-media-downloaderビルド
git clone https://github.com/mmpx12/twitter-media-downloader.git
cd twitter-media-downloader
make
sudo make install
\`\`\`

**または、プリビルドバイナリをダウンロード:**
https://github.com/mmpx12/twitter-media-downloader/releases

### 5. 開発サーバー起動

\`\`\`bash
# Sanity Studio (Port 3333)
npm run dev &

# Next.js Frontend (Port 3000)
cd frontend
npm run dev
\`\`\`

## 📖 使用方法

### 🏠 ホーム画面
- コスプレイヤープロフィール一覧
- フォロー/フォロー解除機能
- 統計表示

### 🎭 クリエイト画面

#### Twitter Download タブ
1. Twitterユーザー名を入力
2. 「Twitter情報取得」でプロフィール取得
3. 「ダウンロード開始」で画像ダウンロード

#### Profile Edit タブ
1. プロフィール情報を編集
2. タグ追加/削除
3. 「Sanityに保存」でCMS保存

### 🛠️ Sanity Studio
- http://localhost:3333 でアクセス
- コスプレイヤー、画像、コレクション管理
- リアルタイムプレビュー

## 🎨 デザインシステム

### カラーパレット
- **プライマリ:** Pink (ec4899) → Purple (8b5cf6)
- **セカンダリ:** Indigo
- **アクセント:** Gray scale

### コンポーネント
- プロフィールカード
- 検索バー
- ドロップダウンメニュー
- プログレスバー
- モーダル

## 🏗️ プロジェクト構造

\`\`\`
hothub/
├── schemaTypes/           # Sanity スキーマ
│   ├── cosplayer.ts
│   ├── cosplayImage.ts
│   └── imageCollection.ts
├── frontend/              # Next.js アプリ
│   ├── src/
│   │   ├── app/          # App Router
│   │   ├── components/   # 共通コンポーネント
│   │   └── lib/          # ユーティリティ
│   └── public/           # 静的ファイル
└── README.md
\`\`\`

## 🔌 API エンドポイント

### POST /api/download-twitter-media
Twitter画像ダウンロード

\`\`\`typescript
{
  username: string,
  options: {
    imageCount: number,
    includeRetweets: boolean,
    onlyMedia: boolean
  }
}
\`\`\`

### POST /api/save-cosplayer
コスプレイヤー保存

\`\`\`typescript
{
  name: string,
  twitterUsername: string,
  bio: string,
  followersCount: number,
  followingCount: number,
  profileImageUrl: string,
  tags: string[]
}
\`\`\`

## 🚀 デプロイ

### Vercel デプロイ

\`\`\`bash
cd frontend
npm run build
vercel --prod
\`\`\`

### 環境変数設定

Vercelダッシュボードで設定:
- \`NEXT_PUBLIC_SANITY_PROJECT_ID\`
- \`NEXT_PUBLIC_SANITY_DATASET\`
- \`NEXT_PUBLIC_SANITY_API_VERSION\`

## 🛠️ 開発

### コンポーネント追加

\`\`\`bash
cd frontend
heroui add [component-name]
\`\`\`

### スキーマ更新

\`schemaTypes/\` でスキーマ編集後、Sanity Studioで確認

### ビルド

\`\`\`bash
cd frontend
npm run build
\`\`\`

## 🔧 トラブルシューティング

### twitter-media-downloader エラー

**Error: twmd not found**
- twitter-media-downloaderがインストールされていません
- モックモードで動作します

**解決方法:**
\`\`\`bash
# インストール確認
which twmd

# パス追加 (必要に応じて)
export PATH=$PATH:/usr/local/bin
\`\`\`

### Sanity接続エラー

**Invalid project ID**
- .env.local の設定確認
- Sanity Dashboard でプロジェクトID確認

### ビルドエラー

**Module not found**
\`\`\`bash
# 依存関係再インストール
rm -rf node_modules package-lock.json
npm install
\`\`\`

## 🤝 貢献

1. Fork the Project
2. Create Feature Branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit Changes (\`git commit -m 'Add AmazingFeature'\`)
4. Push to Branch (\`git push origin feature/AmazingFeature\`)
5. Open Pull Request

## 📝 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルを参照

## 🙏 謝辞

- [twitter-media-downloader](https://github.com/mmpx12/twitter-media-downloader) - Twitter画像ダウンロード
- [HeroUI](https://heroui.com/) - UIコンポーネント
- [Sanity](https://www.sanity.io/) - CMS
- [Next.js](https://nextjs.org/) - React Framework

## 📞 サポート

問題がある場合は [Issues](https://github.com/shuttlekoby/hothub-website/issues) を作成してください。

---

**🌸 Built with ❤️ for Cosplay Community**
