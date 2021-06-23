import React from 'react';
import {CardList} from './CardList'
import {render, waitForElement} from '@testing-library/react'

describe('Teste for CardList Component', () => {
    it('Should must render the component', async () => {
        //renderizar o componente
        const { getByTestId } = render(<CardList dataArray={[]}/>)
        //Buscar o componente
        const fieldNode = await waitForElement(
            () => getByTestId('card-list-render')
        )
        console.log(fieldNode)
        
        //digitar no input
        // buscar o botão
        // clicar no botão
        // buscar a tabela
        // verificar se  atarefa foi adicionada

    })
})