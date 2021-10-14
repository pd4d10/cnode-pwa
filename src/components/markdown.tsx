import { FC } from 'react'
import { Viewer, ViewerProps } from '@bytemd/react'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import gfm from '@bytemd/plugin-gfm'
import 'github-markdown-css'

const plugins = [mediumZoom(), gfm()]

export const MarkdownViewer: FC<Pick<ViewerProps, 'value'>> = ({ value }) => {
  return <Viewer value={value} plugins={plugins} />
}
