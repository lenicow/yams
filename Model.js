"use strict";

import { run, win } from "./connect";

// all() est une promesse
export const all = async () => {
    const collection = await run();
    return collection.find({}, { name : 1, number : 1, order : 1, _id : 0}).toArray();
}

export const allAvailable = async () => {
    const collection = await run();
    return collection.find({number:{$gt:0}}).toArray();
}

export const removeOne = async (id) => {
    const collection = await run();
    return collection.updateOne({_id: id }, {$inc: {number: -1}})
}

export const resetBase = async () => {
    const collection = await run();
    return collection.updateMany({}, {$set:{number : 10}})
}

export const countPastries = async () => {
    const collection = await run();
    return collection.aggregate([{$group: {_id: null,"total": {$sum: "$number"}}}]).toArray()
}

export const addWinner = async (name, time) => {
    const winner = await win();
    return winner.insertOne({name: name, time: time})
}

export const showWinner = async () => {
    const collection = await win();
    return collection.find({}, {name : 1, time: 1}).toArray()
}