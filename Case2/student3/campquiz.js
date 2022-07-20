const Questions = [
    {
        question:"What is a good safety item to keep beside your campfire?",
        optA:"A stick to poke the fire.",
        optB:"A bowl of marshmallows.",
        optC:"A bucket of water.",
        optD:"A bunch of weiners.",
        correct:"optC"
    },

    {
        question:"Besides food, what is an important thing to always take camping with you?",
        optA:"Your favourite shirt.",
        optB:"A good book.",
        optC:"Your sketchbook to draw the wildlife you see.",
        optD:"A first aid kit.",
        correct:"optD"
    },

    {
        question:"What shoud you always wear if you go out in a canoe or a kayak while camping?",
        optA:"A hat.",
        optB:"A waterproof camera tied around your neck.",
        optC:"A life jacket.",
        optD:"Your bathing suit.",
        correct:"optC"
    },

    {
        question:"Which piece of equipment might feature a 'bathtub floor'?",
        optA:"An RV.",
        optB:"A tent.",
        optC:"Sleeping bag.",
        optD:"Portable sink.",
        correct:"optB"
    },

    {
        question:"A 'three-season' tent is good for all but which season? ",
        optA:"Winter.",
        optB:"Summer.",
        optC:"Fall.",
        optD:"Spring.",
        correct:"optA"
    },

    {
        question:"Which knot is most useful for correctly pitching a tent?",
        optA:"Bowline.",
        optB:"Butterfly.",
        optC:"Half-hitch.",
        optD:"Taut-line.",
        correct:"optD"
    },

    {
        question:"On a topographical map, contour lines connect ____________.",
        optA:"Points of interest.",
        optB:"Points of equal elevation.",
        optC:"Points of trail access.",
        optD:"Points of equal latitude.",
        correct:"optB"
    },

    {
        question:"What is the yummy treat made with graham crackers, chocolate and marshmallows that you roast over the campfire?",
        optA:"Smores.",
        optB:"Cracker-mallows.",
        optC:"Fiery sweets.",
        optD:"Campfire sugar sweets.",
        correct:"optA"
    },

    {
        question:"What is the purpose of a guy rope?",
        optA:"To catch a hot guy.",
        optB:"To cross the river.",
        optC:"To hang food out of reach of animals.",
        optD:"To stabilize a tent.",
        correct:"optD"
    },
    
    {
        question:"Why does a sleeping pad's R value matter?",
        optA:"It determines the stretchiness",
        optB:"It determines how easily it floats.",
        optC:"It determines your level of insulation.",
        optD:"It determines how waterproof it is",
        correct:"optC"
    }
]


let questionnum = 1 ;
let playerScore = 0 ;
let wrongtry = 0 ;
let indexnum = 0 ;
var time=60;
var redirect = "campquiz.html";
let quizsummary="";
let numstring="";



function Nextquestion(index) {
    let currentQuestion = Questions[index]
    document.getElementById("question").innerHTML = questionnum
    document.getElementById("score").innerHTML = playerScore
    document.getElementById("displayquestion").innerHTML = currentQuestion.question;
    document.getElementById("opt1label").innerHTML = currentQuestion.optA;
    document.getElementById("opt2label").innerHTML = currentQuestion.optB;
    document.getElementById("opt3label").innerHTML = currentQuestion.optC;
    document.getElementById("opt4label").innerHTML = currentQuestion.optD;

}

function checkAnswer() {
    let currentQuestion = Questions[indexnum] 
    let currentQuestionAnswer = currentQuestion.correct
    let options = document.getElementsByName("option"); 
    let correct = null
 
    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correct = option.labels[0].id
        }
    })

    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('optioncbox').style.display = "flex"
    }

    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correct).style.backgroundColor = "#628563";
            playerScore=playerScore+2;
            indexnum++ ;
            document.getElementById("mainpage").style.backgroundColor = "#628563"
            setTimeout(() => {
                questionnum++;
            }, 1000)
            numstring=indexnum.toString();
            quizsummary=quizsummary+numstring+". correct<br/>";
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabel = option.labels[0].id
            document.getElementById(wrongLabel).style.backgroundColor = "#991f17"
            document.getElementById(correct).style.backgroundColor = "#628563"
            document.getElementById("mainpage").style.backgroundColor = "#991f17"
            playerScore--;
            wrongtry++ ;
            indexnum++;
            setTimeout(() => {
                questionnum++
            }, 1000)
            numstring=indexnum.toString();
            numstring=indexnum.toString();
            quizsummary=quizsummary+numstring+". wrong<br/>";
        }
    })
}

function handlenextQ() {
    checkAnswer() 
    unCheckRadioButtons()
    setTimeout(() => {
        if (indexnum <= 9) {
            Nextquestion(indexnum)
        }
        else {
            handleEnd()
        }
        resetOption()
    }, 1000);
}

function resetOption() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

function handleEnd() {
    let comment = null
    let commentColor = null

    if (playerScore <= 6) {
        comment = "You lack camping knowledge."
        commentColor = "#991f17"
        document.getElementById("mainpage").style.backgroundColor = "#991f17"


    }
    else if (playerScore >= 7 && playerScore < 12) {
        comment = "You could improve your camping knowledge further."
        commentColor = "#db8121"
        document.getElementById("mainpage").style.backgroundColor = "#db8121"

    }
    else if (playerScore >= 12) {
        comment = "You have a good knowledge of camping."
        commentColor = "#628563"
        document.getElementById("mainpage").style.backgroundColor = "#628563"

    }

    document.getElementById('QSummary').innerHTML=quizsummary;
    document.getElementById('comment').innerHTML = comment;
    document.getElementById('comment').style.color = commentColor;
    document.getElementById('totscore').innerHTML = playerScore;
    document.getElementById('timetaken').innerHTML=(60-time);
    document.getElementById('displaycontainer').style.display = "flex";

}

function closeScore() {
    questionnum = 1;
    playerScore = 0;
    wrongtry = 0;
    indexnum = 0;
    Nextquestion(indexnum);
    document.getElementById('displaycontainer').style.display = "none";
}

//function to close warning modal
function closeOption() {
    countDown();
    document.getElementById('optioncontainer').style.display = "none";
}



function countDown(){
if(time > 0){
    time--;;
    timer.innerHTML = "This quiz will end in "+time+" seconds.";
    setTimeout("countDown()", 1000);
    if(indexnum>=10){
        return;
    }
}else{
    handleEnd();
    setTimeout(function()
    {
        window.location.href = redirect;

    }, 5000);
}
}




