import { FC } from 'react'
import { useRouter } from 'next/router'
import { NavBar } from 'antd-mobile'
import { NavBarProps } from 'antd-mobile/es/components/nav-bar'
// import { ReactComponent as Logo } from '../cnodejs.svg'

export const Header: FC<NavBarProps> = ({ right, ...props }) => {
  const router = useRouter()

  return (
    <NavBar
      onBack={() => {
        if (history.length === 1) {
          // If no history, go to homepage
          router.push('/')
        } else {
          router.back()
        }
      }}
      right={right ? <div style={{ fontSize: 18 }}>{right}</div> : null}
      {...props}
    />
  )
}
