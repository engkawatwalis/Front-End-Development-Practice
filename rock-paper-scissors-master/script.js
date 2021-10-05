'use strict'

const weapon = document.querySelector('.app-player');
const appDisplay = document.querySelector('.app');
const appHouseDisplay = document.querySelector('.app-house');
const score = document.querySelector('.score');
const rule = document.querySelector('.rule-modal');
const ruleBtn = document.querySelector('.rule');
const ruleCloseBtn = document.querySelector('.rule-modal-close')


class App {
    constructor(){
        this._score=0;
        this.availableWeapon = ['rock', 'paper', 'scissors'];
        this.weapon;
        this._weaponHTML = {
            rockHTML: '<div class="option-container option-container-rock"><div class="option rock"></div></div>',
            paperHTML: '<div class="option-container option-container-paper"><div class="option paper"></div></div>',
            scissorsHTML: '<div class="option-container option-container-scissors"><div class="option scissors"></div></div>'
        }
        this._selectWeapon();
        this._ruleDisplay();
    }

    _selectWeapon(){
        weapon.addEventListener('click', (e)=>{

            if (!e.target.closest('.app').classList.contains('app-player')) return;

            const clicked = e.target.closest('.option-container');
            let weaponHTML;
            if(!clicked) return;

            if(clicked.classList.contains('option-container-rock')) {
                this.weapon = 1;
                weaponHTML = this._weaponHTML.rockHTML;
                
            }
            if(clicked.classList.contains('option-container-paper')) {
                this.weapon = 2;
                weaponHTML = this._weaponHTML.paperHTML;
            }
            if(clicked.classList.contains('option-container-scissors')) {
                this.weapon = 3;
                weaponHTML = this._weaponHTML.scissorsHTML;
            }   
           
           this._appDisplayStage('houseTurn', weaponHTML);
           const houseWeapon = this._setHouseWeapon();
           const winner = this._findWinner(this.weapon, houseWeapon);
           this._displayResult(winner);
           this._updateScore(winner);
           this._playAgain();
        })
    }

    _setHouseWeapon(){
        const houseWeapon = this.availableWeapon[Math.floor(Math.random() * this.availableWeapon.length)];
        const houseWeaponHTML = `${houseWeapon}HTML`;
        const display = `<div>${this._weaponHTML[houseWeaponHTML]} <div class="description">house picked</div></div>`
        appDisplay.insertAdjacentHTML('beforeend', display);

        return houseWeapon;
    }
    _findWinner(playerWeapon,houseWeapon){
        
        // set number value to houseWeapon on its weapon
        if (houseWeapon === 'rock') houseWeapon = 1;
        if (houseWeapon === 'paper') houseWeapon = 2;
        if (houseWeapon === 'scissors') houseWeapon = 3;
        
        // Winner determination logic
        let winner;
        if(houseWeapon === playerWeapon) winner = 'drew';
        else if(Math.abs(playerWeapon - houseWeapon) < (this.availableWeapon.length-1))
        winner = (playerWeapon > houseWeapon) ? 'player' : 'house';
        else winner = (playerWeapon < houseWeapon) ? 'player' : 'house';
        
        

        return winner;
    }

    _displayResult(winner){

        let display;
        if (winner === 'drew') display = 'DREW';
        else display = winner === 'player' ? 'YOU WIN' : 'YOU LOSE';
        const result = document.createElement('div');
        result.classList.add('result-container', 'container');
        result.innerHTML = 
        `<span>${display}</span>
        <button class="play-again">PLAY AGAIN</button>`;
        document.querySelector('.rule-container').insertAdjacentElement('beforebegin', result);
    }

    _updateScore(winner){
        if(winner === 'player') this._score += 1;
        if(winner === 'house') this._score -= 1;
        score.innerText = this._score;
    }

    _playAgain(){
        const playAgainBtn = document.querySelector('.play-again');
        playAgainBtn.addEventListener('click', ()=>this._appDisplayStage('playerTurn'));
    }

    _appDisplayStage(stage, playerWeapon){

        const result = document.querySelector('.result-container');
        appDisplay.classList.toggle('app-player');
        appDisplay.classList.toggle('app-house');
        appDisplay.innerHTML='';
        if(result) result.remove();
        
        
        let display;
        display = stage === 'houseTurn' ?
             `<div>${playerWeapon} <div class="description">you picked</div></div>`:
             `<div class="option-container option-container-paper"><div class="option paper"></div></div>
             <div class="option-container option-container-scissors"><div class="option scissors"></div></div> 
             <div class="option-container option-container-rock"><div class="option rock"></div></div>`
        
        appDisplay.insertAdjacentHTML('afterbegin', display);
    
    }

    _ruleDisplay(){
        ruleBtn.addEventListener('click', ()=>rule.classList.remove('hidden'))
        ruleCloseBtn.addEventListener('click', ()=> rule.classList.add('hidden'))
    }

        

    
}
const app = new App();