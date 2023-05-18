import React, { FC } from 'react'
import { QRCodeSVG } from 'qrcode.react'

interface QrCodeProps {
  barcodeData: string
  size: number
}

const QrCode: FC<QrCodeProps> = ({ barcodeData, size }) => {
  return (
    <div
      style={{
        height: 210,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <QRCodeSVG value={barcodeData} size={size} />
    </div>
  )
}

export default QrCode
