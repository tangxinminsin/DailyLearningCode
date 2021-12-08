/*
 * @Author: tangxinmin
 * @Date: 2021-09-23 11:48:33
 * @LastEditors: tangxinmin
 * @LastEditTime: 2021-09-23 14:35:36
 * @Description: file content
 */
import { useEffect, useState } from 'react'
import axios from 'axios'

const useURLLoader = (url: string, deps: any[] = []) => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    axios.get(url).then(result => {
      setData(result.data)
      setLoading(false)
    })
    // eslint-disable-next-line
  }, deps)
  return [data, loading]
}
export default useURLLoader