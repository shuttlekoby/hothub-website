'use client'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar"
import { Input } from "@heroui/input"
import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@heroui/dropdown"
import { Avatar } from "@heroui/avatar"
import { Button } from "@heroui/button"
import Link from "next/link"

export const CosHubLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <defs>
        <linearGradient id="cosplay-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <path
        clipRule="evenodd"
        d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm-2 8a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 11-4 0 2 2 0 014 0zm-1.5 7.5c-.83 1.24-2.24 2.5-4.5 2.5s-3.67-1.26-4.5-2.5"
        fill="url(#cosplay-gradient)"
        fillRule="evenodd"
        stroke="url(#cosplay-gradient)"
        strokeWidth="0.5"
      />
    </svg>
  )
}

interface SearchIconProps {
  size?: number
  strokeWidth?: number
  width?: number
  height?: number
  className?: string
}

export const SearchIcon = ({size = 24, strokeWidth = 1.5, width, height, ...props}: SearchIconProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={height || size}
      role="presentation"
      viewBox="0 0 24 24"
      width={width || size}
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}

interface HeaderProps {
  currentPage?: string
}

export default function Header({ currentPage }: HeaderProps) {
  return (
    <Navbar 
      isBordered 
      className="bg-white/80 backdrop-blur-md border-pink-200/30"
      classNames={{
        wrapper: "max-w-7xl",
        brand: "text-pink-600",
        content: "text-gray-700"
      }}
    >
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <CosHubLogo />
          <Link href="/" className="font-bold text-xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent ml-2">
            CosHub
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4">
          <NavbarItem isActive={currentPage === "home"}>
            <Link 
              href="/"
              className={`font-medium ${currentPage === "home" ? "text-pink-600" : "text-gray-700 hover:text-pink-600"}`}
            >
              🏠 ホーム
            </Link>
          </NavbarItem>
          <NavbarItem isActive={currentPage === "create"}>
            <Link 
              href="/create"
              className={`font-medium ${currentPage === "create" ? "text-pink-600" : "text-gray-700 hover:text-pink-600"}`}
            >
              🎭 クリエイト
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link 
              href="/gallery"
              className="font-medium text-gray-700 hover:text-pink-600"
            >
              🖼️ ギャラリー
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link 
              href="/trending"
              className="font-medium text-gray-700 hover:text-pink-600"
            >
              🔥 トレンド
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[12rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-pink-50/80 dark:bg-pink-900/20 border-pink-200/50",
          }}
          placeholder="コスプレイヤーを検索..."
          size="sm"
          startContent={<SearchIcon size={18} className="text-pink-400" />}
          type="search"
        />
        
        <Button
          as={Link}
          href="http://localhost:3333"
          target="_blank"
          color="secondary"
          variant="flat"
          size="sm"
          className="hidden md:flex"
        >
          🛠️ Studio
        </Button>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform ring-2 ring-pink-200"
              color="secondary"
              name="CosHub User"
              size="sm"
              src="https://i.pravatar.cc/150?u=coshub"
            />
          </DropdownTrigger>
          <DropdownMenu 
            aria-label="Profile Actions" 
            variant="faded"
            className="bg-white/90 backdrop-blur-md"
          >
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold text-pink-600">CosHub User</p>
              <p className="font-semibold text-gray-500">user@coshub.com</p>
            </DropdownItem>
            <DropdownItem key="dashboard" startContent="📊">
              ダッシュボード
            </DropdownItem>
            <DropdownItem key="favorites" startContent="❤️">
              お気に入り
            </DropdownItem>
            <DropdownItem key="collections" startContent="📁">
              コレクション
            </DropdownItem>
            <DropdownItem key="settings" startContent="⚙️">
              設定
            </DropdownItem>
            <DropdownItem key="help" startContent="❓">
              ヘルプ & フィードバック
            </DropdownItem>
            <DropdownItem key="logout" color="danger" startContent="🚪">
              ログアウト
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  )
} 