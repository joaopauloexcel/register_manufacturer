import React from 'react';
import Manufacturer from './index'
import {fireEvent, render, screen, waitForElement} from '@testing-library/react'
import { Provider } from "react-redux";
import store from '../../../store/createStore';
import * as ReactIntl from 'react-intl';
import { Router } from 'react-router-dom';
import history from '../../../history';
import * as locale from '../../../locale';
import { MemoryRouter } from 'react-router-dom'

import '@testing-library/jest-dom/extend-expect'
import { MANUFACTURER_RESULTS } from '../types';
import { getManufacturer } from '../actions';
import thunk from 'redux-thunk'

import fetchMock from 'fetch-mock'
import expect from 'expect' // You can use any testing library

const middlewares = [thunk]
const elementJSX = (
    <Provider store={store}>
        <ReactIntl.IntlProvider
            locale={'pt-BR'}
            messages={locale.ptBR}
        >
            <Router history={history}>
                <Manufacturer history={history}/>
            </Router>

        </ReactIntl.IntlProvider>
    </Provider>
);

describe('Teste for Manufacturer Page Component', () => {

    afterEach(() => {
        fetchMock.restore()
      })

    /* it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
        fetchMock.getOnce(MANUFACTURER_RESULTS, {
            body: { todos: ['do something'] },
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions = [
            { type: MANUFACTURER_RESULTS, body: { todos: ['do something'] } }
        ]
        const stores = mockStore({ payload: [] })

        expect(stores.getActions()).toEqual(expectedActions)
    }) */

    it('Should render the component', async () => {
        //renderizar o componente
        const { getByTestId } = render(elementJSX, { wrapper: MemoryRouter })

        //Render Component
        const fieldNode = await waitForElement(
            () => getByTestId('manufacturer-render')
        )
        console.log(fieldNode)

    })

    it('should call the input and its event', async () => {
        //renderizar o componente
        const { getByTestId } = render(elementJSX)

        //inputs
        const inputSearchTest = await waitForElement(
            () => getByTestId('input-search-test')
        )
        
        fireEvent.change(
            inputSearchTest,
            { target: { value: 'testing'}}
        )
        expect(inputSearchTest.value).toEqual('testing')

    })

    it('should call the button and its event', async () => {
        //renderizar o componente
        const { getByTestId } = render(elementJSX)

        //buttons
        const buttonSearchTest = await waitForElement(
            () => getByTestId('button-search-test')
        )
        fireEvent.click(buttonSearchTest)

        const buttonEmailTest = await waitForElement(
            () => getByTestId('button-email-test')
        )
        fireEvent.click(buttonEmailTest)

        const buttonDetailsTest = await waitForElement(
            () => getByTestId('button-details-test')
        )
        fireEvent.click(buttonDetailsTest)

    })

    it('Should create an action to add a manufacturer', async () => {
        const results = []
        const expectedAction = {
          type: MANUFACTURER_RESULTS,
          payload:results
        }
        const func = await getManufacturer()
        console.log({func})
        //expect(await getManufacturer(results)).toEqual(expectedAction)
      })

})