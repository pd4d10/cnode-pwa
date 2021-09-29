import { AvatarRow, TimeAgo } from './'

export const Reply = (props) => (
  <div style={{ marginTop: 8, marginBottom: 8 }}>
    <div style={{ display: 'flex', marginBottom: 6 }}>
      <AvatarRow author={props.author}>
        <div>{props.author.loginname}</div>
        <TimeAgo text="发布于" time={props.create_at} />
      </AvatarRow>
    </div>
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: props.content }}
    />
    {/* <Divider /> */}
  </div>
)
