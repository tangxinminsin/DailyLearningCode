import Link from 'next/link'
import {withRouter} from 'next/router'
import axios from 'axios'

const Page3 = ({router,list}) =>{
    return(
        <div>
            <div>{router.query.name},来了</div>
            <Link href='/'>返回首页</Link>
            <div>
        <div>axios</div>
        <div>{list}</div>
      </div>
        </div>
    )
}


// Page3.getInitialProps = async () => {
//     const promise = new Promise((resolve) => {
//       axios('https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList').then(
//         (res) => {
//           console.log('远程数据结果：', res)
//           resolve(res.data.data)
//         }
//       )
//     })
//     return await promise
//   }

export default withRouter(Page3)