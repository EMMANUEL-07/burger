import reducer from './auth'
import * as actionTypes from '../actions/actionTypes'
import { isTSAnyKeyword, exportAllDeclaration } from '@babel/types';

describe('auth reducer', () => {
   it('return init state', () => {
      expect(reducer(undefined, {} )).toEqual({
         token: null, 
         userId: null,
         error: null,
         loading: false,
      })
   })

   it('should store token', () => {
      expect(reducer({
         token: null, 
         userId: null,
         error: null,
         loading: false,
      }, {
         type: actionTypes.AUTH_SUCCESS,
         idToken: 'some-token',
         userId: 'some-user-id'
      })).toEqual({
         token: 'some-token',
         userId: 'some-user-id',
         error: null,
         loading: false, 
      })
   })
})