import * as React from 'react'
import { useState, useEffect } from 'react'
import { listenForServerStatus } from '../services/listenForServerStatus'
import { getBarcodeData } from '../services/getBarcodeData'
import QrCode from './QRCode'
// import ClipLoader from 'react-spinners/ClipLoader'

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

const Barcode: React.FC<BarcodeProps> = ({ config }) => {
  console.log('CONFIG', config)

  const { clientID = '', redirectURL = '', scope = [], action = '', entityName = undefined, size = 200 } = config
  const [listening, setListening] = useState<boolean>(false)
  const [barcodeData, setBarcodeData] = useState<string | undefined>()
  const [statusCode, setStatusCode] = useState<number | undefined>()
  const [merchantName, setMerchantName] = useState<string | undefined>()
  const [merchantLogo, setMerchantLogo] = useState<string | undefined>()
  const [token, setToken] = useState<string | undefined>()
  const [sessionID, setSessionID] = useState<string | undefined>()
  console.log(barcodeData, statusCode, merchantName, merchantLogo)

  useEffect(() => {
    const fetchBarcodeData = async () => {
      try {
        console.log('STUFF', clientID, redirectURL, scope, action, entityName)

        const response = await getBarcodeData(clientID, redirectURL, scope, action, entityName)
        setBarcodeData(response?.barcodeData)
        setStatusCode(response?.statusCode)
        setMerchantName(response?.merchantName)
        setMerchantLogo(response?.merchantLogo)
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
        console.log('sessionID', sessionID)

        const statusResponse = await listenForServerStatus(clientID, sessionID ?? '', token ?? '')
        console.log('STATUS', statusResponse.statusCode)
        setStatusCode(statusResponse.statusCode)
      }
    }

    const intervalId = setInterval(fetchStatus, 2000) // Run fetchStatus every 2 seconds

    return () => {
      clearInterval(intervalId) // Cleanup the interval when the component is unmounted
    }
  }, [listening, sessionID, clientID, token]) // Include listening, sessionID, clientID, and token in the dependency array

  //   const viewHandler = () => {
  //     if (statusCode === 0 && barcodeData) {
  //       return <div> {barcodeData ? <QrCode barcodeData={barcodeData} size={size} /> : 'loading'}</div>
  //     } else if (statusCode === 1) {
  //       return <ClipLoader color='black' />
  //     }
  //     return <h1>Error</h1>
  //   }
  return (
    <div>
      <h1>Barcode</h1>
      <h1>{listening}</h1>
      <h2>{statusCode}</h2>
      <h2>{merchantName}</h2>
      <h2>{merchantLogo}</h2>
      <h2>{barcodeData}</h2>
      <div> {barcodeData ? <QrCode barcodeData={barcodeData} size={size} /> : 'loading'}</div>
    </div>
  )
}

export default Barcode
