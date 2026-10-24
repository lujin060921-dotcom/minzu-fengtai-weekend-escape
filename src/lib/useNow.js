import { useEffect, useState } from 'react'

// 全页面共用一枚每秒刷新一次的时钟，倒计时与“现在”状态始终一致。
export function useNow(intervalMs = 1000) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  return now
}
