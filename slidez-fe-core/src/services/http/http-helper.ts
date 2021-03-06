import { getAuthHeaderValue, performRefreshTokens } from '../auth/auth-service'
import HttpHelper from 'slidez-shared/src/net/http/http-helper'
import { ApiGateway } from './api-gateway'

const httpHelper = new HttpHelper(
    getAuthHeaderValue,
    performRefreshTokens,
    ApiGateway.REACT_APP_API_GATEWAY
)

export default httpHelper
