import React from 'react'
import ErrorLogo from '../assets/errorLogo'
import styled from 'styled-components'
interface ErrorProps {
  statusCode: number
}
const ErrorScreen: React.FC<ErrorProps> = ({ statusCode }) => {
  const textHandler = (statusCode: number) => {
    if (statusCode === 3) {
      return 'Access Denied'
    } else if (statusCode === 4) {
      return ''
    } else if (statusCode === 5) {
      return 'Session Timeout'
    } else if (statusCode === 6) {
      return 'Server Error'
    }
    return ''
  }

  return (
    <ErrorContainer>
      <ErrorLogo />
      <ErrorText>{textHandler(statusCode)}</ErrorText>
    </ErrorContainer>
  )
}

const ErrorText = styled.h2`
  text-align: center;
`
const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
export default ErrorScreen
