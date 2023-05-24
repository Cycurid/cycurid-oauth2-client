import axios, { AxiosResponse } from 'axios'

interface ErrorResponseData {
  statusCode: number
}

interface BarcodeDataResponse extends ErrorResponseData {
  barcodeData?: string
  merchantName?: string
  merchantLogo?: string
  token?: string
  sessionID?: string
  listening?: boolean
}

export const getBarcodeData = async (
  client: string,
  redirectURL: string,
  scope: string[],
  action: string,
  entityName?: string,
): Promise<BarcodeDataResponse> => {
  let requestParamsBody: any = {}
  const stringScope = scope.join(' ')

  if (entityName) {
    requestParamsBody = {
      client_id: client,
      redirect_url: redirectURL,
      scope: stringScope,
      action: action,
      entity_name: entityName,
    }
  } else {
    requestParamsBody = {
      client_id: client,
      redirect_url: redirectURL,
      scope: stringScope,
      action: action,
    }
  }

  try {
    const response: AxiosResponse<any> = await axios.post('https://api.cycurid.com/auth/authorization/', {
      oauth_params: requestParamsBody,
    })

    if (response.data.status === 404 || response.data.status === 422) {
      const errorResponse: ErrorResponseData = {
        statusCode: 5,
      }
      return errorResponse
    } else {
      let barcodeDataJSON: string

      if (entityName) {
        barcodeDataJSON = JSON.stringify({
          client_id: client,
          session: response.data.session,
          service: response.data.action,
          scope: stringScope,
          entity_name: entityName || '',
        })
      } else {
        barcodeDataJSON = JSON.stringify({
          client_id: client,
          session: response.data.session,
          service: response.data.action,
          scope: stringScope,
        })
      }

      return {
        barcodeData: barcodeDataJSON,
        statusCode: parseInt(response.data.status, 10),
        merchantName: response.data.merchant_display_name,
        merchantLogo: response.data.merchant_display_logo,
        token: response.data.token,
        sessionID: response.data.session,
        listening: true,
      }
    }
  } catch (error: any) {
    const errorResponse: ErrorResponseData = {
      statusCode: 6,
    }
    return errorResponse
  }
}
