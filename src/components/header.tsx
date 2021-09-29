import React, { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { tabData } from '../utils'
import { useAuth } from '../hooks'
import { Badge, NavBar, Tabs } from 'antd-mobile'
import { BellOutline, UserOutline } from 'antd-mobile-icons'
// import { ReactComponent as Logo } from '../cnodejs.svg'

export const Header: FC<{ title: string; rightWidget?: FC }> = ({
  title,
  rightWidget: Widget,
}) => {
  const router = useRouter()
  return (
    <NavBar
      right={Widget}
      onBack={() => {
        if (history.length === 1) {
          // If no history, go to homepage
          router.push('/')
        } else {
          router.back()
        }
      }}
    >
      {title}
    </NavBar>
  )
}

export const HomeHeader: FC<{ tab: string }> = ({ tab }) => {
  const router = useRouter()
  const { count, loginname } = useAuth()

  return (
    <>
      <NavBar
        right={
          <>
            <Link href="/message">
              {count ? (
                <Badge content={count}>
                  <BellOutline />
                </Badge>
              ) : (
                <BellOutline />
              )}
            </Link>
            <Link href={loginname ? `/user/${loginname}` : '/login'}>
              <UserOutline />
            </Link>
          </>
        }
        onBack={() => {
          if (history.length === 1) {
            // If no history, go to homepage
            router.push('/')
          } else {
            router.back()
          }
        }}
      ></NavBar>
      <Tabs
        onChange={(key) => {
          router.push(key === 'all' ? '/' : '/?tab=' + key)
        }}
      >
        {tabData.map(({ id, title }) => (
          <Tabs.TabPane title={title} key={id} />
        ))}
      </Tabs>
    </>
  )
}
