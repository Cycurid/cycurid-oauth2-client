import axios, { AxiosResponse } from 'axios'

interface ResponseData {
  status: number
  code?: string
}

interface ErrorResponseData {
  statusCode: number
}

export const listenForServerStatus = async (
  client_id: string,
  sessionID: string,
  token: string,
): Promise<{ statusCode: number }> => {
  try {
    const response: AxiosResponse<ResponseData> = await axios.post<ResponseData>(
      'https://api.cycurid.com/auth/authorization/status',
      {
        client_id,
        session: sessionID,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    if (response.status === 200) {
      return { statusCode: parseInt(response.data.status.toString(), 10), code: response.data.code } as {
        statusCode: number
        code: string
      }
    }
  } catch (error: any) {
    if (error.response?.status === 422) {
      const errorResponse: ErrorResponseData = {
        statusCode: 3,
      }
      return errorResponse
    } else {
      const errorResponse: ErrorResponseData = {
        statusCode: 5,
      }
      return errorResponse
    }
  }

  throw new Error('Unexpected error occurred.')
}
