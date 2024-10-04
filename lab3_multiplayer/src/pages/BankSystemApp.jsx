import React from 'react'
import { useEffect } from 'react'

function BankSystemApp() {
  useEffect(() => {
    document.title = 'Sistema de banco'
  }, [])

  return (
    <div>BankSystemApp</div>
  )
}

export default BankSystemApp