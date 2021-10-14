import { AvatarRow, TimeAgo } from './'
import { MarkdownViewer } from './markdown'

export const Reply = (props) => (
  <div style={{ marginTop: 8, marginBottom: 8 }}>
    <div style={{ display: 'flex', marginBottom: 6 }}>
      <AvatarRow author={props.author}>
        <div>{props.author.loginname}</div>
        <TimeAgo text="发布于" time={props.create_at} />
      </AvatarRow>
    </div>
    <MarkdownViewer value={props.content} />
    {/* <Divider /> */}
  </div>
)
