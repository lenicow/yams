var _ = require('lodash')
import {removeOne, addWinner} from '../Model'

export const diceCombination = (diceResult) => {
  let count = _.countBy(diceResult)
  if(Object.values(count).includes(5)){
    return "Yams"
  } else if (Object.values(count).includes(4)){
    return "Carré"
  } else if (Object.values(count).includes(3)&&Object.values(count).includes(2)){
    return "Double"
  } else if (_.countBy(Object.values(count))[2] === 2){
    return "Double"
  } else {
    return "PERDU"
  }
}

export const pickPastries = (n, pastries) => {
  let price = []
    for(let i = 0; i < Math.min(n,pastries.reduce((acc, currentValue) => acc + currentValue.number, 0)); i++){
      let pickPast = Math.floor(Math.random()*pastries.length)
      let pickedPast = pastries[pickPast]
      price.push(pickedPast)
      addWinner(pickedPast.name, new Date())
      removeOne(pickedPast._id)
    }
  return price
}

export const diceFont = (diceResult) => {
  let diceString = ['one', 'two', 'three', 'four', 'five', 'six']
  let diceFont = []
  diceResult.forEach(e => {
    diceFont.push(diceString[e-1])
  })
  return diceFont
}