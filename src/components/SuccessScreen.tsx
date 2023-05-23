import React, { useEffect } from 'react'
import SuccessLogo from '../assets/successLogo'
import styled from 'styled-components'

interface SuccessScreenProps {
  authCode: string
  redirectURL: string
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ authCode, redirectURL }) => {
  console.log('AUTHCODE===>', authCode)
  console.log('redirect===>', redirectURL)
  useEffect(() => {
    window.location.href = `${redirectURL}?authToken=${authCode}`
  }, [authCode, redirectURL])

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
