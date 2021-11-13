import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import { NavBarProps } from 'antd-mobile/es/components/nav-bar'

export const Header: FC<NavBarProps> = ({ right, ...props }) => {
  const navigate = useNavigate()

  return (
    <NavBar
      onBack={() => {
        // TODO:
        if (history.length === 1) {
          // If no history, go to homepage
          navigate('/')
        } else {
          navigate(-1)
        }
      }}
      right={right ? <div style={{ fontSize: 18 }}>{right}</div> : null}
      {...props}
    />
  )
}
