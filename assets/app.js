
///Devloper javascript////
 const dev= document.getElementById('dev-info');
 const logo= document.getElementById('logo');
  
 dev.innerText="KBC-KAUN BANEGA CROREPATI Developed By VISHAL PRAJAPATI";


//Main javaScript

const startButton= document.getElementById('start-btn');
const nextButton= document.getElementById('next-btn');
const winprice = document.getElementById('ques-price')

const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-btn')
const winelement = document.getElementById('winning')

let shuffledQuestions, currentQuestionIndex

document.getElementById('timer').style.display="none";
var price=10000;
var winamnt=0;
var qno=1;

/////////////////////////////Audio Used in Game///////////////////////

const intro= new Audio();
intro.src="assets/intro.mp3";
const next= new Audio();
next.src="assets/next.mp3";
const clock= new Audio();
clock.src="assets/clock.mp3";
clock.id="myclock";
const lock= new Audio();
lock.src="assets/lock.mp3";
const wrongs= new Audio();
wrongs.src="assets/wrong.mp3";
const right= new Audio();
right.src="assets/correct.mp3";
const clap= new Audio();
clap.src="assets/clap.mp3";
const winner= new Audio();
winner.src="assets/7.mp3";
const bye= new Audio();
bye.src="assets/win.mp3";


/////////////////////////////Start Button///////////////////////

startButton.addEventListener('click',startGame)

/////////////////////////////Next Button Event///////////////////////

nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    if(price==1280000){
        price=2500000;
     
    }
   else if(price==20000000){
        price=35000000;
   }
    else{
        price=(price)*2;
    } 
    document.getElementById('ques-price').innerText="(Q.No."+ qno + ")"+ " Price: Rs. " + price ; 
    PlayNext()
    setNextQuestion()
})



 //---------------------------------------------------------------------------//

  ////////////////////////////All Functions ///////////////////////

////////////////////////////Intro Play And Countdown ///////////////////////
function PlayIntro() {
    document.getElementById('timer').style.display="block";
    function countdown(){
        var seconds= 30;
        function tick(){
            var counter = document.getElementById("timer");
            seconds--;
            counter.innerText = "0:" + (seconds < 10 ? "0" : "") + String(seconds);
    
            if (seconds > 0){
                setTimeout(tick, 1000);
            } else{
                 document.getElementById("counter").innerText="";
            }
        }
        tick();
    }
     countdown();
    intro.play();
}

////////////////////////////Next Button Sound ///////////////////////
function PlayNext() {
    if(!intro.paused){
        intro.pause();
        intro.currentTime=0;
    }
    if(!next.paused){
        next.pause();
        next.currentTime=0;
    }
    if(!clock.paused){
        clock.pause();
        clock.currentTime=0;
    }
    next.play();
    setTimeout(function () { clock.play();
    },3000);
}

////////////////////////////Winning Moment Functions ///////////////////////
function WinMoment(){
    winner.play();
    setTimeout(function () { clap.play();
    },3200);
    setTimeout(function () { bye.play();
    },3600);
}

function winnerBanner(){
    questionContainerElement.classList.add('hide')
    winelement.classList.remove('hide')
    document.getElementById('win-amount').value=winamnt; 
    document.getElementById('timer').style.display="none";
}





////////////////////////////Start Game ///////////////////////

function startGame(){  
    dev.classList.add('hide')
    logo.classList.add('hide')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

//////////////////////////// Set next Question ///////////////////////
function setNextQuestion(){
    resetState()
   showQuestion(shuffledQuestions[currentQuestionIndex])
}


function showQuestion(question){
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
      const button = document.createElement('button')
      button.innerText = answer.text
      button.classList.add('btn')
      if(answer.correct){
          button.dataset.correct = answer.correct
      }
      button.addEventListener('click',selectAnswer)
      answerButtonsElement.appendChild(button)
  })
}

function resetState(){
    nextButton.classList.add('hide')
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}


//////////////////////////// Select Options ///////////////////////

function selectAnswer(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    clock.pause();
    if(!intro.paused){
        intro.pause();
        intro.currentTime=0;
    }
    if(!next.paused){
        next.pause();
        next.currentTime=0;
    }
   
    lock.play();
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => (
        setStatusClass(button, button.dataset.correct)
    ))
    if(shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide')
    }else{
        clock.pause();
        WinMoment()
        setTimeout(winnerBanner,1500);
    }
    if(correct){
        qno++;
        if(qno>14){
            if(!clock.paused){
                clock.pause();
                clock.currentTime = 0;
            } 
            nextButton.classList.add('hide')
            WinMoment()
            setTimeout(winnerBanner,1500);
        }
        right.play();
        winamnt=price;
    }

 //------------//

    function wrong() {
        nextButton.classList.add('hide')
        questionContainerElement.classList.add('hide')
        winelement.classList.remove('hide')
        document.getElementById('win-amount').value=winamnt;
        document.getElementById('timer').style.display="none";
        if(!intro.paused){
            intro.pause();
            intro.currentTime=0;
        }
        if(!next.paused){
            next.pause();
            next.currentTime=0;
        }
        if(!clock.paused){
            clock.pause();
            clock.currentTime=0;
        }
        if(!lock.paused){
            lock.pause();
        }
        wrongs.play();
    }

    if(!correct){
        
        setTimeout(wrong,1000);
    }
}
//------------//

////////////////////////////Set Status  ///////////////////////

function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
    }
    else{
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}




////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////QUESTIONS////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////


const questions = [

    {
        question:' सन् 1922 में चौरी – चौरा कांड के बाद महात्मा गाँधी ने किस आन्दोलन को स्थगित कर दिया था ? ',
        answers:[
            {text:'असहयोग आंदोलन ', correct: true},
            {text:'नमक सत्याग्रह ', correct: false},
            {text:'खिलाफत आंदोलन ', correct: false},
            {text:'भारत छोड़ो आंदोलन', correct: false},
        ]
    },

    {
        question:'  महान चिकित्सक चरक किसके दरबार में थे ?  ',
        answers:[
            {text:'अशोक ', correct: false},
            {text:'अजातशत्रु ', correct: false},
            {text:'कनिष्क ', correct: true},
            {text:'अकबर', correct: false},
        ]
    },
    {
        question:'नाथुला दर्रा किस भारतीय राज्य में स्थित है ? ',
        answers:[
            {text:'सिक्किम  ', correct: true},
            {text:'अरूणाचल प्रदेश  ', correct: false},
            {text:'उत्तराखंड', correct: false},
            {text:'असम ', correct: false},
        ]
    },
    {
        question:'पानीपत का तीसरा युद्ध किसके बीच हुआ था?  ',
        answers:[
            {text:'बाबर और इब्राहिम लोदी  ', correct: false},
            {text:'बाबर और राणा सांगा ', correct: false},
            {text:'अफगानों और मराठों', correct: false},
            {text:'मराठों और अहमद शाह ', correct: true},
        ]
    },
    {
        question:'निम्नलिखित में से किस भारतीय राज्य की सीमा चीन, नेपाल और भूटान से मिलती है ? ',
        answers:[
            {text:'अरूणाचल प्रदेश', correct: false},
            {text:'पश्चिम बंगाल ', correct: false},
            {text:'उत्तर प्रदेश ', correct: false},
            {text:'सिक्किम ', correct: true},
        ]
    },
    {
        question:'होपमैन कप का संबंध किस खेल से है ? ',
        answers:[
            {text:'टेनिस ', correct: true},
            {text:'क्रिकेट  ', correct: false},
            {text:'हॉकी ', correct: false},
            {text:'फुटबॉल ', correct: false},
        ]
    },
    
    {
        question:'भारत की खोज किसने की ?',
        answers:[
            {text:'फाहियान', correct: false},
            {text:'अलबेरूनी', correct: false},
            {text:'वास्कोडिगामा', correct: true},
            {text:'इब्नबतुता', correct: false},
        ]
    },
    {
        question:'भारत की मानक समय रेखा कौन सी है ? ',
        answers:[
            {text:'82.5 डिग्री पूर्वी देशांतर रेखा', correct: true},
            {text:'82.5 डिग्री उत्तरी देशांतर रेखा', correct: false},
            {text:'82.5 डिग्री पश्चिमी देशांतर रेखा', correct: false},
            {text:'22.5 डिग्री पूर्वी देशांतर रेखा', correct: false},
        ]
    },
    {
        question:'अर्जुन पुरस्कार की शुरुआत किस वर्ष हुई ? ',
        answers:[
            {text:'1947', correct: false},
            {text:'1961', correct: true},
            {text:'1949', correct: false},
            {text:'1945', correct: false},
        ]
    },
    {
        question:'तम्बाकू पर पूर्ण प्रतिबन्ध लगाने वाला विश्व का पहला देश कौनसा है ?',
        answers:[
            {text:'जापान', correct: false},
            {text:'चीन', correct: false},
            {text:'अमेरिका', correct: false},
            {text:'भूटान', correct: true},
        ]
    },
    {
        question:'राष्ट्रीय मतदाता दिवस प्रत्येक वर्ष किस दिन मनाया जाता है ?',
        answers:[
            {text:'24 जनवरी', correct: false},
            {text:'22 जनवरी', correct: false},
            {text:'23 जनवरी', correct: false},
            {text:'25 जनवरी', correct: true},
        ]
    },
    {
        question:'ईस्ट इंडिया कम्पनी ने भारत में अपना पहला कारखाना कहाँ खोला था ? ',
        answers:[
            {text:'सूरत', correct: true},
            {text:'कोलकाता', correct: false},
            {text:'मैसूर', correct: false},
            {text:'बैंगलुरु', correct: false},
        ]
    },
    {
        question:'‘ बुली ‘ शब्द का प्ररोग किस खेल में किया जाता है ? ',
        answers:[
            {text:'क्रिकेट', correct: false},
            {text:'फुटबॉल', correct: false},
            {text:'हॉकी', correct: true},
            {text:'बास्केटबॉल', correct: false},
        ]
    },
    {
        question:'निम्नलिखित में से किस शहर को झीलों की नगरी कहते हैं ?',
        answers:[
            {text:'जयपुर', correct: false},
            {text:'नैनीताल', correct: false},
            {text:'उदयपुर', correct: true},
            {text:'वाराणसी', correct: false},
        ]
    },
    {
        question:'वेदों में सबसे प्राचीन वेद कौन सा है ? ',
        answers:[
            {text:'ऋग्वेद', correct: true},
            {text:'सामवेद', correct: false},
            {text:'यजुर्वेद', correct: false},
            {text:'अथर्ववेद', correct: false},
        ]
    },
    {
        question:'भाभा परमाणु अनुसन्धान केंद्र कहाँ स्थित है ? ',
        answers:[
            {text:'नई दिल्ली', correct: false},
            {text:'बैंगलुरु', correct: false},
            {text:'कोलकाता', correct: false},
            {text:'ट्राम्बे, मुंबई', correct: true},
        ]
    },
    {
        question:'भारत की पहली महिला I.P.S. अधिकारी ? ',
        answers:[
            {text:'सरोजिनी नायडू', correct: false},
            {text:'किरण बेदी', correct: true},
            {text:'आनंदीबाई जोशी', correct: false},
            {text:'अंजुम आरा', correct: false},
        ]
    },
    {
        question:'‘ चाइनामैन ‘ शब्द का प्रयोग किस खेल में होता है ?  ',
        answers:[
            {text:'कबड्डी', correct: false},
            {text:'पोलो', correct: false},
            {text:'हॉकी', correct: false},
            {text:'क्रिकेट', correct: true},
        ]
    },
    {
        question:'पटना का प्राचीन नाम क्या था ?  ',
        answers:[
            {text:'हस्तिनापुर', correct: false},
            {text:'सीलोन', correct: false},
            {text:'पाटलिपुत्र', correct: true},
            {text:'वैशाली', correct: false},
        ]
    },
    {
        question:'निम्नलिखित में से किस भारतीय राज्य की राजभाषा अंग्रेजी है ?',
        answers:[
            {text:'सिक्किम', correct: false},
            {text:'नागालैंड', correct: true},
            {text:'मणिपुर', correct: false},
            {text:'केरल', correct: false},
        ]
    },
    {
        question:'किस मुगल शासक ने ” दीन – ए – इलाही ” धर्म चलाया था ? ',
        answers:[
            {text:'बाबर', correct: false},
            {text:'अकबर', correct: true},
            {text:'हुमायूं', correct: false},
            {text:'शाहजहां', correct: false},
        ]
    },

    {
        question:'डूरंड कप का संबंध किस खेल से है ? ',
        answers:[
            {text:'हॉकी', correct: false},
            {text:'क्रिकेट', correct: false},
            {text:'जूडो', correct: false},
            {text:'फुटबॉल', correct: true},
        ]
    },
    {
        question:'‘ अभिज्ञान शाकुन्तलम ‘ के लेखक कौन थे ? ',
        answers:[
            {text:'कालिदास', correct: true},
            {text:'मुंशी प्रेमचंद', correct: false},
            {text:'रविंद्रनाथ टैगोर', correct: false},
            {text:'जयशंकर प्रसाद', correct:false},
        ]
    },
    {
        question:'भारत के पहले कानून मंत्री कौन थे ?  ',
        answers:[
            {text:'डॉ. सर्वपल्ली राधाकृष्णन', correct: false},
            {text:'डॉ. भीमराव अम्बेडकर', correct: true},
            {text:'सरदार बल्लभ भाई पटेल', correct: false},
            {text:'अबुल कलाम आजाद', correct: false},
        ]
    },
    {
        question:'सम्राट अशोक ने किस युद्ध के बाद बोद्ध धर्म अपना लिया था ? ',
        answers:[
            {text:'कलिंग युद्ध', correct: true},
            {text:'हल्दीघाटी का युद्ध', correct:false},
            {text:'चौसा का युद्ध', correct: false},
            {text:'इनमें से कोई नहीं', correct: false},
        ]
    },
    {
        question:'दुनिया की सबसे लंबी नदी कौन सी है? ',
        answers:[
            {text:'अमेजन नदी', correct: false},
            {text:'नील नदी', correct: true},
            {text:'मिसीसिपी नदी', correct: false},
            {text:'यांग्तझी नदी', correct: false},
        ]
    },
    {
        question:'कौनसा खनिज हृदय की धड़कन को नियंत्रित करता है ?  ',
        answers:[
            {text:'एल्युमिनियम', correct: false},
            {text:'तांबा', correct: false},
            {text:'जस्ता', correct: false},
            {text:'पोटेशियम', correct: true},
        ]
    },
    {
        question:'ATM का पूर्ण रूप क्या है ?  ',
        answers:[
            {text:'Automatic Taliking Machine', correct: false},
            {text:'Automated Teller Machine', correct: true},
            {text:'All Time Money', correct: false},
            {text:'Automative Teller Machine', correct: false},
        ]
    },
    {
        question:'दुनिया में सबसे बड़ा जीवित पक्षी कौनसा है ?',
        answers:[
            {text:'शुतुरमुर्ग', correct: true},
            {text:'हमिंग बर्ड', correct: false},
            {text:'बाज', correct: false},
            {text:'गिद्ध', correct: false},
        ]
    },

    {
        question:'मलेरिया की दवा ‘ कुनैन ‘ किस पौधे से प्राप्त होती है ?',
        answers:[
            {text:'यूकेलिप्टस', correct: false},
            {text:'पीपल', correct: false},
            {text:'सिनकोना', correct: true},
            {text:'उपरोक्त सभी', correct: false},
        ]
    },
    {
        question:'सालारजंग म्यूजियम किस शहर में स्थित है ?',
        answers:[
            {text:'हैदराबाद', correct: true},
            {text:'जयपुर', correct: false},
            {text:'बैंगलुरू', correct: false},
            {text:'श्रीरंगपट्टनम', correct: false},
        ]
    },

    {
        question:'यदि भारत का राष्ट्रपति इस्तीफा देना चाहे तो वह अपना इस्तीफा किसे सौंपेगा ?',
        answers:[
            {text:'प्रधानमंत्री को ', correct: false},
            {text:'लोकसभा अध्यक्ष को ', correct: false},
            {text:'उपराष्ट्रपति को ', correct: true},
            {text:'सर्वोच्च न्यायालय के न्यायाधीश को', correct: false},
        ]
    },
    {
        question:' भगवान महावीर जैन का जन्म कहाँ हुआ था ?  ',
        answers:[
            {text:'वैशाली ', correct: true},
            {text:'पावापुरी ', correct: false},
            {text:'लुम्बिनी ', correct: false},
            {text:'राजगृह', correct: false},
        ]
    },
    {
        question:' प्रोटोन की खोज किसने की थी ?  ',
        answers:[
            {text:'रदरफोर्ड', correct: true},
            {text:'चैडविक ', correct: false},
            {text:'गोलडस्टीन  ', correct: false},
            {text:'अल्बर्ट आइंस्टीन', correct: false},
        ]
    },

    {
        question:' भारत का प्रथम परमाणु बिजलीघर स्थापित किया गया था ?  ',
        answers:[
            {text:'उदयपुर में ', correct: false},
            {text:'हैदराबाद में ', correct: false},
            {text:'तारापुर में ', correct: true},
            {text:'रांची में', correct: false},
        ]
    },

    {
        question:' शान्तिनिकेतन की स्थापना किसने की थी ? ',
        answers:[
            {text:'कालिदास ', correct: false},
            {text:'स्वामी विवेकानंद ', correct: false},
            {text:'सुभाष चंद्र बोस ', correct: false},
            {text:'रविंद्रनाथ टैगोर', correct: true},
        ]
    },
    {
        question:' गौतम बुद्ध द्वारा देह त्याग की घटना को बोद्ध धर्म में क्या कहा गया  है ?',
        answers:[
            {text:'मुक्ति', correct: false},
            {text:'निर्वाण  ', correct: false},
            {text:'महाभिनिष्क्रमण ', correct: false},
            {text:'महापरिनिर्वाण ', correct: true},
        ]
    },
    {
        question:' भारत का सबसे लम्बा राष्ट्रीय राजमार्ग कौन सा है ? ',
        answers:[
            {text:'NH – 22', correct: false},
            {text:'NH – 7', correct: true},
            {text:'NH – 1 ', correct: false},
            {text:'NH – 10 ', correct: false},
        ]
    },
    {
        question:' म्यांमार की मुद्रा क्या है ? ',
        answers:[
            {text:'टका ', correct: false},
            {text:'यांग ', correct: false},
            {text:'क्यात  ', correct: true},
            {text:'रूबल ', correct: false},
        ]
    },
    
]