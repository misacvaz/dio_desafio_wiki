import React from "react";
import { ItemContainer } from "./styles";

function ItemRepo({repo , onRemove, onOpen}){



    return(
        <ItemContainer>
            <h3>
               {repo.name}
            </h3>
            <p>{repo.full_name}</p>
             <button href="{repo.html_url}" onClick= {()=> onOpen(repo)} target="_blank" rel="noreferrer" type="button">ver Repositório</button> <br />
            <button href="#." onClick={() => onRemove(repo.id)} rel="noreferrer" className="remover" type="button" >Remover</button>
            
            <hr/>
            </ItemContainer>
    )
}

export default ItemRepo;