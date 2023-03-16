var dealerSum = 0;
var player1Sum = 0;
var player2Sum = 0;

var dealerAceCount = 0;
var player1AceCount = 0;
var player2AceCount = 0;

var hidden;
var deck;

var canHit1 = true;
var canHit2 = true;

window.onload = function(){
    buildDeck();
    shuffleDeck();
    startGame();
}

document.getElementById("play-again").addEventListener("click",()=>{
    window.location.reload();
    //
})

function buildDeck()
{
    let values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
    let types = ["C","D","H","S",];
    deck = [];

    for(let i = 0; i < types.length; i++)
    {
        for(let j = 0; j < values.length; j++)
        {
            deck.push(values[j] + "-" + types[i]);
        }
    }

    //console.log(deck)
}

function shuffleDeck()
{
    for(let i = 0; i < deck.length; i++)
    {
       let j = Math.floor(Math.random() * deck.length);
       let temp = deck[i];
       deck[i] = deck[j];
       deck[j] = temp;
    }
    console.log(deck)
}

function startGame()
{
    hidden = deck.pop();
    dealerSum += getValue(hidden);

    dealerAceCount += checkAce(hidden);
    //console.log(hidden)
    //console.log(dealerSum)

    while(dealerSum < 17)
    {
        let cardImg = document.createElement("img");
        let card = deck.pop();

        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }

    console.log(dealerSum)

    for(let i = 0; i < 2; i++)
    {
        let cardImg = document.createElement("img");
        let card = deck.pop();

        cardImg.src = "./cards/" + card + ".png";
        player1Sum += getValue(card);
        player1AceCount += checkAce(card);
        document.getElementById("player1-cards").append(cardImg);
    }

    console.log(player1Sum)

    for(let i = 0; i < 2; i++)
    {
        let cardImg = document.createElement("img");
        let card = deck.pop();

        cardImg.src = "./cards/" + card + ".png";
        player2Sum += getValue(card);
        player2AceCount += checkAce(card);
        document.getElementById("player2-cards").append(cardImg);
    }

    console.log(player2Sum)

    document.getElementById("hit1").addEventListener("click", hit1)
    document.getElementById("hit2").addEventListener("click", hit2)

    document.getElementById("stay1").addEventListener("click", stay1)
    document.getElementById("stay2").addEventListener("click", stay2)

    document.getElementById("end-game").addEventListener("click", endGame)
    // document.getElementById("stay").addEventListener("click", stay)

}

function endGame()
{
    var message= "";

    for(let i = 0; i < dealerAceCount; i++)
    {
        dealerSum = reduceAce(dealerSum,dealerAceCount);
    }
    for(let i = 0; i < player1AceCount; i++)
    {
        player1Sum = reduceAce(player1Sum,player1AceCount);
    }
    for(let i = 0; i < player2AceCount; i++)
    {
        player2Sum = reduceAce(player2Sum,player2AceCount);
    }

    if(canHit1 == false && canHit2 == false)
    {
        document.getElementById("hidden").src = "./cards/" + hidden + ".png";
        
        if(dealerSum > 21 && player1Sum > 21 && player2Sum < 22)
        {
            message = "Player 2 win!"
        }
        else if(dealerSum > 21 && player1Sum < 22 && player2Sum > 21)
        {
            message = "Player 1 win!"
        }
        else if(dealerSum < 22 && player1Sum > 21 && player2Sum > 21)
        {
            message = "Dealer win!"
        }
        else if(dealerSum > 21 && player1Sum < 22 && player2Sum < 22 && player1Sum > player2Sum)
        {
            message = "Player 1 win!"
        }
        else if(dealerSum > 21 && player1Sum < 22 && player2Sum < 22 && player1Sum < player2Sum)
        {
            message = "Player 2 win!"
        }
        else if(player1Sum > 21 && dealerSum < 22 && player2Sum < 22 && dealerSum > player2Sum)
        {
            message = "Dealer win!"
        }
        else if(player1Sum > 21 && dealerSum < 22 && player2Sum < 22 && dealerSum < player2Sum)
        {
            message = "Player 2 win!"
        }
        else if(player2Sum > 21 && dealerSum < 22 && player1Sum < 22 && dealerSum < player1Sum)
        {
            message = "Player 1 win!"
        }
        else if(player2Sum > 21 && dealerSum < 22 && player1Sum < 22 && dealerSum > player1Sum)
        {
            message = "Dealer win!"
        }
        else if(dealerSum > 21 && player2Sum < 22 && player1Sum < 22 && player2Sum > player1Sum)
        {
            message = "Player 2 win!"
        }
        else if(dealerSum > 21 && player2Sum < 22 && player1Sum < 22 && player2Sum < player1Sum)
        {
            message = "Player 1 win!"
        }
        else if(dealerSum < 22 && player2Sum < 22 && player1Sum < 22 && player2Sum < player1Sum && player1Sum > dealerSum)
        {
            message = "Player 1 win!"
        }
        else if(dealerSum < 22 && player2Sum < 22 && player1Sum < 22 && player2Sum > player1Sum && player2Sum > dealerSum)
        {
            message = "Player 2 win!"
        }
        else if(dealerSum < 22 && player2Sum < 22 && player1Sum < 22 && dealerSum > player1Sum && player2Sum < dealerSum)
        {
            message = "Dealer win!"
        }
        else if(player1Sum == player2Sum && player1Sum < dealerSum)
        {
            message = "Dealer win!"
        }
        else if(player1Sum == player2Sum && player1Sum > dealerSum)
        {
            message = "Tie!"
        }
        else if(player1Sum == dealerSum && player1Sum > player2Sum)
        {
            message = "Tie!"
        }
        else if(player1Sum == dealerSum && player1Sum < player2Sum)
        {
            message = "Player 2 win!"
        }
        else if(player2Sum == dealerSum && player2Sum < player1Sum)
        {
            message = "Player 1 win!"
        }
        else if(player2Sum == dealerSum && player2Sum > player1Sum)
        {
            message = "Tie!"
        }
        else if(player1Sum > 21 && player2Sum > 21 && dealerSum > 21)
        {
            message = "Tie!"
        }

        document.getElementById("results").innerText = message

        document.getElementById("dealer-sum").innerText = dealerSum;
        document.getElementById("player1-sum").innerText = player1Sum;
        document.getElementById("player2-sum").innerText = player2Sum;
    }
    
}

function hit1()
{
    if(!canHit1)
    {
        return;
    }
    let cardImg = document.createElement("img");
    let card = deck.pop();

    cardImg.src = "./cards/" + card + ".png";
    player1Sum += getValue(card);
    player1AceCount += checkAce(card);
    document.getElementById("player1-cards").append(cardImg);

    if(reduceAce(player1Sum, player1AceCount) > 22)
    {
        canHit1 = false;
    }
}

function stay1()
{
    canHit1 = false
}

function hit2()
{
    if(!canHit2)
    {
        return;
    }
    let cardImg = document.createElement("img");
    let card = deck.pop();

    cardImg.src = "./cards/" + card + ".png";
    player2Sum += getValue(card);
    player2AceCount += checkAce(card);
    document.getElementById("player2-cards").append(cardImg);

    if(reduceAce(player2Sum, player2AceCount) > 22)
    {
        canHit2 = false;
    }
}

function stay2()
{
    canHit2 = false
}

function getValue(card)
{
    let data = card.split("-");
    let value = data[0];

    if(isNaN(value))
    {
        if(value == "A")
        {
            return 11;
        } 
        return 10;
    }

    return parseInt(value);
}

function checkAce(card)
{
    if(card[0] == "A")
    {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount)
{
    if(playerSum > 21 && playerAceCount > 0)
    {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}