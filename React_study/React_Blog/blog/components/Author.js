import {Avatar,Divider} from 'antd';
import '../styles/components/author.css'
const Author = () =>{
    return(
        <div className='author-div comm-box'>
             <div><Avatar size={100} src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3889226924,3355827204&fm=26&gp=0.jpg"></Avatar></div>
             <div className='author-name'>小熊猫</div>
             <div className='author-introduction'>
             小熊猫，专注前端学习
                <Divider>社交账号</Divider>
                <Avatar size={28} icon="github" className="account"  />
                <Avatar size={28} icon="qq"  className="account" />
                <Avatar size={28} icon="wechat"  className="account"  />

             </div>
        </div>
    )
}

export default Author