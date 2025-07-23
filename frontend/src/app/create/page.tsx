'use client'

import React, { useState } from 'react'
import { Card, CardBody, CardHeader } from '@heroui/card'
import { Button } from '@heroui/button'
import { Input, Textarea } from '@heroui/input'
import { Avatar } from '@heroui/avatar'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@heroui/modal'
import { Tabs, Tab } from '@heroui/tabs'
import Header from '@/components/Header'
import { useRouter } from 'next/navigation'

interface CosplayerData {
  name: string
  twitterUsername: string
  bio: string
  followersCount: number
  followingCount: number
  profileImageUrl: string
  tags: string[]
}

interface DownloadProgress {
  isDownloading: boolean
  progress: number
  downloadedCount: number
  totalImages: number
  status: string
}

export default function CreatePage() {
  const router = useRouter()
  const [cosplayerData, setCosplayerData] = useState<CosplayerData>({
    name: '',
    twitterUsername: '',
    bio: '',
    followersCount: 0,
    followingCount: 0,
    profileImageUrl: '',
    tags: []
  })

  const [downloadProgress, setDownloadProgress] = useState<DownloadProgress>({
    isDownloading: false,
    progress: 0,
    downloadedCount: 0,
    totalImages: 0,
    status: 'ready'
  })

  const [tagInput, setTagInput] = useState('')
  const [downloadOptions, setDownloadOptions] = useState({
    imageCount: 100,
    includeRetweets: false,
    onlyMedia: true,
    includeNSFW: true
  })

  const { isOpen, onOpen, onClose } = useDisclosure()

  // Twitter情報を取得する関数（モック）
  const fetchTwitterInfo = async (username: string) => {
    if (!username) return

    try {
      setDownloadProgress({ ...downloadProgress, status: 'Fetching Twitter info...' })
      
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setCosplayerData({
        ...cosplayerData,
        name: `${username} Cosplayer`,
        twitterUsername: username,
        bio: `Beautiful cosplayer from Japan 🌸\nLove anime and cosplay!\n#cosplay #anime`,
        followersCount: Math.floor(Math.random() * 100000) + 10000,
        followingCount: Math.floor(Math.random() * 1000) + 100,
        profileImageUrl: `https://unavatar.io/twitter/${username}`,
        tags: ['cosplay', 'anime', 'beautiful']
      })
      
      setDownloadProgress({ ...downloadProgress, status: 'Twitter info fetched!' })
    } catch (error) {
      console.error('Error fetching Twitter info:', error)
      setDownloadProgress({ ...downloadProgress, status: 'Error fetching info' })
    }
  }

  // 画像ダウンロード開始
  const startDownload = async () => {
    if (!cosplayerData.twitterUsername) return

    setDownloadProgress({
      isDownloading: true,
      progress: 0,
      downloadedCount: 0,
      totalImages: downloadOptions.imageCount,
      status: 'Starting download...'
    })

    try {
      const response = await fetch('/api/download-twitter-media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: cosplayerData.twitterUsername,
          options: downloadOptions
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Download failed')
      }

      setDownloadProgress({
        isDownloading: false,
        progress: 100,
        downloadedCount: result.downloadedCount,
        totalImages: downloadOptions.imageCount,
        status: result.mockMode ? 'Mock download completed!' : 'Download completed!'
      })

      onOpen() // 完了モーダルを表示

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      console.error('Download error:', error)
      setDownloadProgress({
        ...downloadProgress,
        isDownloading: false,
        status: `Download failed: ${errorMessage}`
      })
    }
  }

  // タグ追加
  const addTag = () => {
    if (tagInput.trim() && !cosplayerData.tags.includes(tagInput.trim())) {
      setCosplayerData({
        ...cosplayerData,
        tags: [...cosplayerData.tags, tagInput.trim()]
      })
      setTagInput('')
    }
  }

  // タグ削除
  const removeTag = (tagToRemove: string) => {
    setCosplayerData({
      ...cosplayerData,
      tags: cosplayerData.tags.filter(tag => tag !== tagToRemove)
    })
  }

  // Sanityに保存
  const saveCosplayer = async () => {
    if (!cosplayerData.name || !cosplayerData.twitterUsername) {
      alert('名前とTwitterユーザー名は必須です')
      return
    }

    try {
      const response = await fetch('/api/save-cosplayer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cosplayerData)
      })

      const result = await response.json()

      if (response.ok) {
        alert('🎉 コスプレイヤーが正常に保存されました！')
        router.push('/')
      } else {
        throw new Error(result.error || 'Save failed')
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      console.error('Save error:', error)
      alert(`保存に失敗しました: ${errorMessage}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100">
      {/* Navigation */}
      <Header currentPage="create" />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🎭 コスプレイヤー クリエイト
          </h1>
          <p className="text-gray-600">
            Twitterから画像をダウンロードして、新しいコスプレイヤーを追加しましょう
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs aria-label="Create Options" className="w-full">
            {/* Twitter Download Tab */}
            <Tab key="download" title="📥 Twitter Download">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Download Settings */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <h3 className="text-xl font-semibold">Twitter画像ダウンロード</h3>
                  </CardHeader>
                  <CardBody className="space-y-4">
                    <Input
                      label="Twitter ユーザー名"
                      placeholder="ユーザー名を入力（@なし）"
                      value={cosplayerData.twitterUsername}
                      onChange={(e) => setCosplayerData({ ...cosplayerData, twitterUsername: e.target.value })}
                      startContent={<span className="text-gray-500">@</span>}
                    />
                    
                    <Input
                      label="ダウンロード画像数"
                      type="number"
                      value={downloadOptions.imageCount.toString()}
                      onChange={(e) => setDownloadOptions({ ...downloadOptions, imageCount: parseInt(e.target.value) || 100 })}
                    />

                    <div className="flex gap-4">
                      <Button
                        color="primary"
                        variant="flat"
                        onPress={() => fetchTwitterInfo(cosplayerData.twitterUsername)}
                        disabled={!cosplayerData.twitterUsername}
                      >
                        📊 Twitter情報取得
                      </Button>
                      
                      <Button
                        color="success"
                        onPress={startDownload}
                        disabled={!cosplayerData.twitterUsername || downloadProgress.isDownloading}
                        className="bg-gradient-to-r from-green-500 to-blue-500 text-white"
                      >
                        {downloadProgress.isDownloading ? '⏳ ダウンロード中...' : '📥 ダウンロード開始'}
                      </Button>
                    </div>

                    {/* Progress Display */}
                    {downloadProgress.status !== 'ready' && (
                      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">{downloadProgress.status}</p>
                        {downloadProgress.isDownloading && (
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${downloadProgress.progress}%` }}
                            ></div>
                          </div>
                        )}
                        {downloadProgress.downloadedCount > 0 && (
                          <p className="text-xs text-gray-500 mt-1">
                            {downloadProgress.downloadedCount} 枚の画像が見つかりました
                          </p>
                        )}
                      </div>
                    )}
                  </CardBody>
                </Card>

                {/* Preview Card */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <h3 className="text-xl font-semibold">プレビュー</h3>
                  </CardHeader>
                  <CardBody>
                    {cosplayerData.name ? (
                      <div className="flex flex-col items-center text-center space-y-4">
                        <Avatar
                          src={cosplayerData.profileImageUrl}
                          size="lg"
                          className="ring-4 ring-pink-200 w-20 h-20"
                        />
                        <div>
                          <h4 className="text-lg font-semibold">{cosplayerData.name}</h4>
                          <p className="text-gray-500">@{cosplayerData.twitterUsername}</p>
                        </div>
                        <p className="text-sm text-gray-600 whitespace-pre-line">{cosplayerData.bio}</p>
                        <div className="flex gap-4 text-sm">
                          <span><strong>{cosplayerData.followingCount.toLocaleString()}</strong> フォロー中</span>
                          <span><strong>{cosplayerData.followersCount.toLocaleString()}</strong> フォロワー</span>
                        </div>
                        {cosplayerData.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {cosplayerData.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center text-gray-400 py-8">
                        Twitterユーザー名を入力して情報を取得してください
                      </div>
                    )}
                  </CardBody>
                </Card>
              </div>
            </Tab>

            {/* Profile Edit Tab */}
            <Tab key="edit" title="✏️ Profile Edit">
              <Card className="shadow-lg max-w-4xl mx-auto">
                <CardHeader>
                  <h3 className="text-xl font-semibold">プロフィール編集</h3>
                </CardHeader>
                <CardBody className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input
                      label="名前"
                      value={cosplayerData.name}
                      onChange={(e) => setCosplayerData({ ...cosplayerData, name: e.target.value })}
                    />
                    
                    <Input
                      label="Twitter ユーザー名"
                      value={cosplayerData.twitterUsername}
                      onChange={(e) => setCosplayerData({ ...cosplayerData, twitterUsername: e.target.value })}
                      startContent={<span className="text-gray-500">@</span>}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Input
                      label="フォロワー数"
                      type="number"
                      value={cosplayerData.followersCount.toString()}
                      onChange={(e) => setCosplayerData({ ...cosplayerData, followersCount: parseInt(e.target.value) || 0 })}
                    />
                    
                    <Input
                      label="フォロー数"
                      type="number"
                      value={cosplayerData.followingCount.toString()}
                      onChange={(e) => setCosplayerData({ ...cosplayerData, followingCount: parseInt(e.target.value) || 0 })}
                    />
                  </div>

                  <Input
                    label="プロフィール画像URL"
                    value={cosplayerData.profileImageUrl}
                    onChange={(e) => setCosplayerData({ ...cosplayerData, profileImageUrl: e.target.value })}
                  />

                  <Textarea
                    label="自己紹介"
                    placeholder="プロフィールの説明を入力..."
                    value={cosplayerData.bio}
                    onChange={(e) => setCosplayerData({ ...cosplayerData, bio: e.target.value })}
                    rows={4}
                  />

                  {/* Tags Section */}
                  <div>
                    <label className="block text-sm font-medium mb-2">タグ</label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        placeholder="タグを追加..."
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      />
                      <Button color="primary" onPress={addTag}>追加</Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cosplayerData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-pink-100 text-pink-800 text-sm rounded-full flex items-center gap-1 cursor-pointer"
                          onClick={() => removeTag(tag)}
                        >
                          #{tag}
                          <span className="text-pink-600 hover:text-pink-800">×</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      color="success"
                      size="lg"
                      onPress={saveCosplayer}
                      className="bg-gradient-to-r from-green-500 to-blue-500 text-white"
                      disabled={!cosplayerData.name || !cosplayerData.twitterUsername}
                    >
                      💾 Sanityに保存
                    </Button>
                    
                    <Button
                      color="danger"
                      variant="flat"
                      size="lg"
                      onPress={() => setCosplayerData({
                        name: '',
                        twitterUsername: '',
                        bio: '',
                        followersCount: 0,
                        followingCount: 0,
                        profileImageUrl: '',
                        tags: []
                      })}
                    >
                      🗑️ リセット
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>

        {/* Success Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <ModalHeader>
              <h3>🎉 ダウンロード完了!</h3>
            </ModalHeader>
            <ModalBody>
              <p>{downloadProgress.downloadedCount}枚の画像をダウンロードしました。</p>
              <p>Sanityに保存してプロフィールを作成しますか？</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                後で
              </Button>
              <Button color="primary" onPress={() => { saveCosplayer(); onClose(); }}>
                保存する
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </main>
    </div>
  )
} 