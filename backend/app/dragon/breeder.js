const Dragon = require('./dragon');
const base64 = require('base-64');

class Breeder {

    static charSum(trait){
      return trait.split('').reduce((sum, character) => sum+= character.charCodeAt(),
        0
        );
    }

    //Two incoming traits: matronTrait and patronTrait
    //The matrontrait and patrontarit string values are encoded
    //Both traits have their characters summed
    //Get a range by adding both character sums
    //generate a random number in the range
    //if the number is less than the matron'scharacter sum, pick matron
    
    static pickTrait({ matronTrait, patronTrait }) {
        if(matronTrait == patronTrait) return matronTrait;

        const matronTraitCharSum = Breeder.charSum(base64.encode(matronTrait));
        const patronTraitCharSum = Breeder.charSum(base64.encode(patronTrait));
        
        const randomNum = Math.floor(Math.random() * (matronTraitCharSum + patronTraitCharSum));

        return randomNum < matronTraitCharSum ? matronTrait : patronTrait;
    }
      
    static breedDragon({ matron, patron }) {
       const matronTraits = matron.traits;
       const patronTraits = patron.traits;
       
       const babyTraits = [];

       matronTraits.forEach(({traitType, traitValue}) => {
           const matronTrait = traitValue;
           const patronTrait = patronTraits.find(
               trait => trait.traitType === traitType
           ).traitValue;

           babyTraits.push({
              traitType,
              traitValue: Breeder.pickTrait({matronTrait, patronTrait}) 
           })
       })
       return new Dragon({nickname: 'Unnamed baby', traits: babyTraits});
    }
}

// const fooby = new Dragon();
// const drago = new Dragon();
// const foogo = Breeder.breedDragon({matron: fooby, patron: drago});

// console.log('fooby', fooby);
// console.log('drago', drago);
// console.log('foogo', foogo);

module.exports = Breeder;