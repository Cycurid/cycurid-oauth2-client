import * as React from 'react'
import { useState, useEffect } from 'react'
import { listenForServerStatus } from '../services/listenForServerStatus'
import { getBarcodeData } from '../services/getBarcodeData'
import QrCode from './QRCode'
import ClipLoader from 'react-spinners/ClipLoader'
import styled from 'styled-components'

import ErrorScreen from './ErrorScreen'
import SuccessScreen from './SuccessScreen'

interface BarcodeProps {
  config: {
    clientID: string
    redirectURL: string
    scope: string[]
    action: string
    entityName?: string
    size?: number
  }
}
interface BarcodeContainerProps {
  size?: number
}

interface StatusResponse {
  statusCode: number
  code?: string // Add code property here if it exists in your response
}

const Barcode: React.FC<BarcodeProps> = ({ config }) => {
  const { clientID = '', redirectURL = '', scope = [], action = '', entityName = undefined, size = 200 } = config
  const [listening, setListening] = useState<boolean>(false)
  const [barcodeData, setBarcodeData] = useState<string | undefined>()
  const [statusCode, setStatusCode] = useState<number | undefined>()
  // const [merchantName, setMerchantName] = useState<string | undefined>()
  // const [merchantLogo, setMerchantLogo] = useState<string | undefined>()
  const [token, setToken] = useState<string | undefined>()
  const [sessionID, setSessionID] = useState<string | undefined>()
  const [authCode, setAuthCode] = useState<string | undefined>()

  useEffect(() => {
    const fetchBarcodeData = async () => {
      try {
        const response = await getBarcodeData(clientID, redirectURL, scope, action, entityName)
        setBarcodeData(response?.barcodeData)
        setStatusCode(response?.statusCode)
        // setMerchantName(response?.merchantName)
        // setMerchantLogo(response?.merchantLogo)
        setToken(response?.token)
        setSessionID(response?.sessionID)
        setListening(response?.listening || false)
      } catch (error) {
        throw new Error('Unexpected error occurred.')
      }
    }
    fetchBarcodeData()
  }, [])

  useEffect(() => {
    const fetchStatus = async () => {
      if (listening) {
        const statusResponse: StatusResponse = await listenForServerStatus(clientID, sessionID ?? '', token ?? '')
        setStatusCode(statusResponse.statusCode)
        setAuthCode(statusResponse.code)
      }
    }

    const intervalId = setInterval(fetchStatus, 2000) // Run fetchStatus every 2 seconds

    return () => {
      clearInterval(intervalId) // Cleanup the interval when the component is unmounted
    }
  }, [listening, sessionID, clientID, token]) // Include listening, sessionID, clientID, and token in the dependency array

  const barcodeHandler = () => {
    if (statusCode === 0 && barcodeData) {
      //QR CODE GENERATED
      return <QrCode barcodeData={barcodeData} size={size} />
    } else if (statusCode === 1) {
      //BARCODE SCANNED WAITING FOR RESPONSE
      return <ClipLoader color='black' />
    } else if (statusCode === 2 && authCode) {
      //ACCESS_GRANTED
      return <SuccessScreen authCode={authCode} redirectURL={redirectURL} />
    } else if (statusCode === 3) {
      //ACCESS_DENIED
      return <ErrorScreen statusCode={statusCode} />
    } else if (statusCode === 4) {
      //NOT IMPLEMENTED YET
      return <h1>Status 4</h1>
    } else if (statusCode === 5) {
      // TIMEOUT
      return <ErrorScreen statusCode={statusCode} />
    } else if (statusCode === 6) {
      //SERVER ISSUE
      return <ErrorScreen statusCode={statusCode} />
    }
    //DEFAULT LOADER
    return <ClipLoader color='black' />
  }
  return (
    <div>
      <BarcodeContainer size={size}>{barcodeHandler()}</BarcodeContainer>
    </div>
  )
}

const BarcodeContainer = styled.div<BarcodeContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
`

export default Barcode
