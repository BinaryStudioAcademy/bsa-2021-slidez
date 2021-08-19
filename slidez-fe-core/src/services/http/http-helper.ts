import { getAuthHeaderValue, performRefreshTokens } from '../auth/auth-service'
import HttpHelper from 'slidez-shared/src/net/http/http-helper'

const httpHelper = new HttpHelper(getAuthHeaderValue, performRefreshTokens)

export default httpHelper
