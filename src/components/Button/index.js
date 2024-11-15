import React from "react";

import {ButtonContainer} from './styles'

function Button({onClick}){

    return(
        <ButtonContainer onClick={onClick} type="button">
            Buscar
        
        </ButtonContainer>
    )
}

export default Button;