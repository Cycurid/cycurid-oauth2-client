import React, { useEffect } from 'react'
import SuccessLogo from '../assets/successLogo'
import styled from 'styled-components'

interface SuccessScreenProps {
  code: string
  redirectURL: string
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ code, redirectURL }) => {
  useEffect(() => {
    window.location.href = `${redirectURL}?code=${code}`
  }, [code, redirectURL])

  return (
    <SuccessContainer>
      <SuccessLogo />
      <SuccessText>Access Granted</SuccessText>
    </SuccessContainer>
  )
}

const SuccessText = styled.h2`
  text-align: center;
`

const SuccessContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
export default SuccessScreen
