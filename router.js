"use strict";

import express from "express"
const router = express.Router();

import { indexController, resetGame, startGame, gameOver } from "./controllers/game";

// middleware spécifique au router
router.use( (req, res, next) => {
  // console.log('Time: ', Date.now());
  next();
});

// page d'accueil ou principale avec controller.index
router.get('/', (req, res) => indexController(req, res));
router.get('/game', (req, res) => startGame(req,res))
router.get('/reset', (req, res) => resetGame(req,res))
router.get('/gameover', (req,res) => gameOver(req,res))

router.get('/about', (req, res) => {
  res.send('About birds');
});

export default router;