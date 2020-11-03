import React, { Component } from 'react';
import { skinny, patchy, plain, slender, sporty, spotted, stocky, striped } from "../assets/index";

const propertyMap = {
    backgroundColor: { 
        black: '#263238',
        white: '#CFD8DC', 
        green: '#A5D6A7', 
        blue: '#0277BD' 
    },
    build: { slender, stocky, sporty, skinny },
    pattern: { plain, striped, spotted, patchy},
    size: { 
        small: 100, 
        medium: 140, 
        large: 180, 
        enormous: 220 
    }
};


class DragonAvatar extends Component {
    get DragonImage(){
        const dragonPropertyMap = {backgroundColor: '', build: '', pattern: '', size: '' };

        this.props.dragon.traits.forEach(trait => {
            // console.log("trait", trait);
            const { traitType, traitValue } = trait;
            
            
            dragonPropertyMap[traitType] = propertyMap[traitType][traitValue];
        });
        
        const { backgroundColor, build, pattern, size } = dragonPropertyMap;
        const sizing = {width: size, height: size}

        return (
           <div className="dragon-avatar-img-wrapper">
               <div className="avatar-background" style={{backgroundColor: backgroundColor, ...sizing}}></div> 
               <img src={pattern} className="avatar-img-pattern" style={{...sizing}}/>
               <img src={build} className="avatar-img" style={{...sizing}}/>
           </div> 
        );
    }

    render(){
        const { generationId, dragonId, traits } = this.props.dragon;
     
        if (!dragonId){
           return <div></div>;
        }
        return(
            <div>
                <span>G{generationId}.</span>
                <span>I{dragonId}. </span>
                
                { traits.map(trait => trait.traitValue).join(', ') }
                { this.DragonImage }
            </div>
        )
    }
}

export default DragonAvatar