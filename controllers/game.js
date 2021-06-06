"use strict";

import { allAvailable, countPastries, resetBase, showWinner  } from "../Model.js";
import {diceCombination, diceFont, pickPastries} from "../utils/helper";

export const indexController = async (req, res) => {
    let counter = await countPastries()

    allAvailable().then(
        collection => {
            if(counter[0].total>30){
                res.render("pages/index", { data : collection , title: "DICE GAME" })
                return
            }
            showWinner().then(
                collection => {
                    res.render("pages/gameover", {collection , title: "Jeu over" })
                }
            )
        }
    )
};

export const resetGame = (req, res) => {
    resetBase().then(
        allAvailable().then(
            collection => {
                if(collection.length){
                    res.render("pages/index", { data : collection , title: "DICE GAME" })
                    return
                }
                showWinner().then(
                    collection => {
                        res.render("pages/gameover", {collection , title: "Jeu over" })
                    }
                )
            }
        )
    )
}

export const startGame = async (req, res) => {
    let pastries = await allAvailable()
    let counter = await countPastries()

    if(counter[0].Total>30){
        res.render("pages/gameover", {title: "Jeu over"})
        return
    }


    // if(pastries.reduce((acc, currentValue) => acc + currentValue.number, 0)<1){
    //     res.render("pages/gameover", {title: "Jeu over"})
    //     return
    // }
    
    const diceResult = []
    let dice
    for(let i = 0; i<5; i++ ){
        dice = Math.floor(Math.random()*6)+1
        diceResult.push(dice)
    }
    diceFont(diceResult)
    let winOrLose = diceCombination(diceResult)
    let diceString = diceFont(diceResult)
    let price 
    switch(winOrLose){
        case 'Yams':
            price = pickPastries(3, pastries);
            break;
        case "Carré":
            price = pickPastries(2, pastries);
            break;
        case "Double":
            price = pickPastries(1, pastries);
            break;
        default:
            price = []

    }
    res.render("pages/game", {diceResult, winOrLose, price, diceString, title: "Votre lancé"})
}

export const gameOver = (req, res) => {
    showWinner().then(
        collection => {
            collection.sort((a,b) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0))
            res.render("pages/gameover", {collection, title: "Jeu over"})
            return
        }
    )
}