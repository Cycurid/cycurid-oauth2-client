import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import Barcode from '../src/components/Barcode'

describe('Common render', () => {
  it('renders without crashing', () => {
    const config = {
      clientID: '5HOm4THg9vWRG0MZFy0s165o',
      redirectURL: 'https://2125bb20a4f4.ngrok.app/login',
      scope: ['reference_uuid', 'first_name'],
      action: 'login',
      entityName: 'test merchant',
      size: 200,
    }
    render(<Barcode config={config} />)
  })
})
