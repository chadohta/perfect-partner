module.exports = { getWhiteCard, getRedCard };

// returns a random number between zero and max
function getRandomInt(max) { 
    return Math.floor(Math.random() * Math.floor(max));
}

// returns one white card
function getWhiteCard(whiteCardsDrawnSet) { 
    let rand = getRandomInt(whiteCards.length);
    while (whiteCardsDrawnSet.has(rand)) { 
        rand = getRandomInt(whiteCards.length);
    };
    whiteCardsDrawnSet.add(rand);
    return whiteCards[rand];
}

// returns one red card
function getRedCard(redCardsDrawnSet) { 
    let rand = getRandomInt(redCards.length);
    while (redCardsDrawnSet.has(rand)) { 
        rand = getRandomInt(redCards.length);
    }; 
    redCardsDrawnSet.add(rand);
    return redCards[rand];
}

// white cards players can draw
const whiteCards = [
    "CUSTOM CARD",
    "most loyal person in the world",
    "will always love you",
    "most attractive person on earth",
    "owns a private island",
    "is a movie star",
    "can fly",
    "funniest person in the world",
    "a supermodel", 
    "a rocket scientist",
    "a millionaire yoga instructer",
    "an olympic gymnist",
    "down right respectful",
    "your parents love them",
    "loves to cuddle",
    "the best smelling person in the world",
    "you will always smell good when you're with them",
    "a hot barista",
    "the president",
    "actor/actress you really like",
    "the most attractive personality you have ever seen",
    "never lies to you",
    "makes you feel secure",
    "world champion poker player",
    "royalty",
    "professional chef; cooks for you anytime",
    "a brain surgeon",
    "owns an adorable coffee shop",
    "spontaneous and fun",
    "calls you daddy",
    "cooks all your favorite foods for you",
    "knows the three finger special",
    "will grant you three wishes",
    "has a PhD in nuclear engineering",
    "has the voice of an angel",
    "writes you love songs",
    "has beautiful eyes",
    "loves video games",
    "animal shelter volunteer",
    "loves to travel",
    "you never have to work while you date them",
    "the most physically attractive person you have ever seen",
    "owns a penthouse suite in your favorite city",
    "you will never gain weight while you're with them",
    "gives great massages",
    "owns a time machine",
    "a superhero",
    "is hung",
    "a really really nice person",
    "trustworthy",
    "you will not age while you date them",
    "genius level IQ",
    "owns your favorite sports team",
    "completely blind to all of your flaws",
    "shares all the same hobbies as you",
    "front row tickets to every concert",
    "supports you in anything and everything",
    "most patient person",
    "very very cute",
    "calls you 'baby girl'",
]

// red cards players can draw
const redCards = [
    "CUSTOM CARD",
    "is dating two other people",
    "only calls you by her ex's name",
    "is planning to kill you",
    "is $500k in debt",
    "laughs non-stop during sex",
    "doesn't understand your jokes",
    "incapable of all emotion",
    "think you're ugly",
    "they slept with one of your parents",
    "super super racist",
    "zero percent sexually attracted to you",
    "a death row inmate",
    "owes the government 1 million",
    "is wanted in a foreign country",
    "keeps talking about someone who looks just like you, only better",
    "only speaks in sarcasm",
    "is 13 years old",
    "a porn star",
    "only talks about themselves",
    "you're allergic to them",
    "won't stop talking about their ex",
    "lives in a house with 8 dudes",
    "has an only fans",
    "is a sugar baby",
    "won't allow you to have wifi in the house",
    "never pays for anything",
    "always speaks with a heavy fake accent",
    "only communicates with you via text message",
    "will kill you eventually, but it could be 60 years from now",
    "they only call you dude",
    "creates a mild scene every time you're out in public together",
    "live streams everything you do together",
    "continuosly asks if your best friend is 'down'",
    "kicks every animal they see",
    "underage",
    "will never stop using tinder",
    "really hates children",
    "never stops talking in a baby voice",
    "strapped to a time bomb, but there's no timer",
    "incapable of asking a question",
    "never washes their hands",
    "addicted to drugs",
    "is actually an AI robot",
]