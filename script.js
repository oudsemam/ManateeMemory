(function () {


    // Default Home Page
    const defaultPage = document.getElementsByTagName('body');





    // Read in level difficulty buttons and create variable to store selection
    const difficulty = document.querySelectorAll('.difficulty');
    let levelSelected = null;
    let numberOfCards = null;

    difficulty.forEach(level => level.addEventListener('click', (event) => {
        //if level has been picked already, undo previous color 
        if (levelSelected) {
            document.getElementById(`${levelSelected}`).classList.remove('buttonSelectBackground');

        }
        //Otherwise set background and read in difficulty level
        event.target.classList.add('buttonSelectBackground');
        levelSelected = event.target.id;

    }));

    // Set # of cards based on levelSelected 
    function setNumberOfCards() {
        switch (levelSelected) {
            case 'easy':
                numberOfCards = 6;
                break;
            case 'medium':
                numberOfCards = 12;
                break;
            case 'hard':
                numberOfCards = 18;
                break;
            default:
                numberOfCards = 6;
        };
    };


    //Array of icon names and placeholder for random order array
    const iconArray = ['gem', 'bolt', 'anchor', 'fish', 'crown', 'dragon', 'moon', 'heart', 'tree'];
    let randomIconArray = [];

    //Create random array of icon names based on numberOfCards
    function randomIcons() {
        if (randomIconArray.length > 0) {
            randomIconArray.length = 0;
        };

        //Add doubles of each icon until number of cards is met
        for (let i = 0; i < numberOfCards / 2; i++) {
            randomIconArray.push(iconArray[i]);
            randomIconArray.push(iconArray[i]);
        }

        //Randomly mix up the icons using a shuffle algorithm
        for (let i = 0; i < randomIconArray.length - 1; i++) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = randomIconArray[i];
            randomIconArray[i] = randomIconArray[j];
            randomIconArray[j] = temp;
        }
    }

    //deletes any existing cards in cardGrid area
    function clearCards() {
        let cards = document.querySelectorAll(".flip-card");
        if (cards.length > 0) {
            for (let card of cards) {
                // let childCard = cardGrid.firstChild;
                cardGrid.remove(card);
            }
        }
    }

    //function that starts the timer when the game starts
    let timer = document.querySelector("#timer");

    let minutesLabel = document.getElementById("minutes");
    let secondsLabel = document.getElementById("seconds");
    let totalSeconds = 0;

    const startTimer = () => {
        const setTime = () => {
            //I added this code in here (although not used yet) but maybe useful for when the game restarts.
            //    if (matches === numberOfCards) {
            //    clearInterval(refreshTimer);
            //   }
            ++totalSeconds;
            secondsLabel.innerHTML = pad(totalSeconds % 60);
            minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
        };

        let refreshTimer = setInterval(setTime, 1000);
        let pad = (val) => {
            let valString = val + "";
            if (valString.length < 2) {
                return "0" + valString;
            } else {
                return valString;
            }
        };
    };


    //Read in start button and section for cards to be created in
    const startGame = document.getElementById('start');
    const cardGrid = document.querySelector('.card-grid');
    const elementStart = document.querySelectorAll('.start-items');
    const gameControls = document.querySelectorAll('.game-controls');

    let click1 = null;
    let click2 = null;

    cardGrid.addEventListener("click", (event) => {
        // console.log(event)
        event.target.parentNode.style.transform = "rotateY(180deg)";

        if (!click1) {
            click1 = event.target.id;
        } else if (!click2) {
            click2 = event.target.id;
            //logic for if click 1 = click 2 .visibility-hidden
            // if not match then flip over after some time
        }
        console.log(click1);
        console.log(click2);


    })

    function matching() {
        matches++;
        clickedCards[0].classList.remove('open', 'show');
        clickedCards[0].classList.add('match', 'pulse');
        event.target.classList.remove('open', 'show');
        event.target.classList.add('match', 'pulse');
        clickedCards = [];
    }

    function notMatching() {
        setTimeout(function () {
            clickedCards[0].classList.remove('open', 'show');
            clickedCards[1].classList.remove('open', 'show');
            clickedCards = [];
        }, 600);

    }


    startGame.addEventListener('click', () => {
        //If cards exist then exit event
        let cards = document.querySelectorAll('.flip-card');
        if (cards.length > 0) {

        } else {
            //Show game-controls and hide start-items
            elementStart.forEach(element => {
                element.classList.add("display-none");
            });
            gameControls.forEach(element => {
                element.classList.remove("display-none");
            });

            //Call Number of Cards function
            setNumberOfCards();

            //Run random icon function to get new random array
            randomIcons();

            //Start timer when game is started
            startTimer();

            //Set initial # of matches at start
            let numberMatchesLeft = numberOfCards / 2;
            document.getElementById('matches-left').innerText = numberMatchesLeft;



            //Create a div for every card with the icon inside
            for (let i = 0; i < numberOfCards; i++) {
                let card = document.createElement('div');
                let cardInner = document.createElement('div');
                let cardFront = document.createElement('div');
                let cardBack = document.createElement('div');
                let icon = document.createElement('i');

                icon.classList.add('fas');
                icon.classList.add(`fa-${randomIconArray[i]}`);
                cardFront.id = randomIconArray[i];

                cardInner.classList.add('flip-card-inner');
                cardFront.classList.add('flip-card-front');
                cardBack.classList.add('flip-card-back');
                card.classList.add('flip-card');

                cardBack.append(icon);
                cardInner.append(cardFront);
                cardInner.append(cardBack);
                card.append(cardInner);
                cardGrid.append(card);
            }
        }



    });

})();