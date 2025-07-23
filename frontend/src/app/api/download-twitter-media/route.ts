import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import fs from 'fs/promises'

const execAsync = promisify(exec)

interface DownloadOptions {
  imageCount: number
  includeRetweets: boolean
  onlyMedia: boolean
  includeNSFW: boolean
}

interface DownloadRequest {
  username: string
  options: DownloadOptions
}

export async function POST(req: NextRequest) {
  try {
    const { username, options }: DownloadRequest = await req.json()

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      )
    }

    // ダウンロード先ディレクトリを作成
    const downloadDir = path.join(process.cwd(), 'public', 'downloads', username)
    await fs.mkdir(downloadDir, { recursive: true })

    // twitter-media-downloaderのコマンドを構築
    const twmdCommand = [
      'twmd',
      '-u', username,
      '-o', downloadDir,
      '-a', // 画像と動画を両方ダウンロード
      '-n', options.imageCount.toString(),
      '-B', // バナーを非表示
    ]

    // リツイートを含める場合
    if (options.includeRetweets) {
      twmdCommand.push('-r')
    }

    // メディアツイートのみ
    if (options.onlyMedia) {
      twmdCommand.push('-M')
    }

    console.log('Executing:', twmdCommand.join(' '))

    // コマンドを実行
    const { stdout, stderr } = await execAsync(twmdCommand.join(' '), {
      timeout: 300000, // 5分のタイムアウト
    })

    console.log('stdout:', stdout)
    if (stderr) {
      console.error('stderr:', stderr)
    }

    // ダウンロードされたファイルを確認
    const files = await fs.readdir(downloadDir)
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    )

    return NextResponse.json({
      success: true,
      downloadedCount: imageFiles.length,
      files: imageFiles,
      directory: `/downloads/${username}`,
      stdout,
      stderr
    })

  } catch (error: unknown) {
    console.error('Download error:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    // twitter-media-downloaderが見つからない場合
    if (errorMessage.includes('twmd') && errorMessage.includes('not found')) {
      return NextResponse.json({
        error: 'twitter-media-downloader (twmd) is not installed. Please install it first.',
        installInstructions: 'Visit https://github.com/mmpx12/twitter-media-downloader for installation instructions',
        mockMode: true
      }, { status: 500 })
    }

    return NextResponse.json({
      error: 'Download failed',
      details: errorMessage,
      mockMode: true
    }, { status: 500 })
  }
} 