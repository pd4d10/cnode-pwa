import { Loading as AntdLoading } from 'antd-mobile'

export const Loading = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      padding: 24,
    }}
  >
    <AntdLoading />
  </div>
)

export const LoadingMore = () => <AntdLoading />
