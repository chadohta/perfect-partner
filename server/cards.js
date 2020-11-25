module.exports = { getWhiteCard, getRedCard }

// returns a random number between zero and max
function getRandomInt(max) { 
    return Math.floor(Math.random() * Math.floor(max));
}

// returns ONE white card (string)
function getWhiteCard(whiteCardsDrawnSet) { 
    let rand = getRandomInt(whiteCards.length);
    while (whiteCardsDrawnSet.has(rand)) { 
        rand = getRandomInt(whiteCards.length);
    }
    whiteCardsDrawnSet.add(rand);
    return whiteCards[rand];
}

// returns ONE red card (string)
function getRedCard(redCardsDrawnSet) { 
    let rand = getRandomInt(redCards.length);
    while (redCardsDrawnSet.has(rand)) { 
        rand = getRandomInt(redCards.length);
    }
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
    // "generous",
    "can fly",
    "funniest person in the world",
    // "a famous musician",
    // "a photographer",
    // "an organic farmer",
    "a supermodel", 
    "a rocket scientist",
    "a millionaire yoga instructer",
    "an olympic gymnist",
    "down right respectful",
    "your parents love them",
    // "CUSTOM CARD",
    // "loves to laugh",
    "loves to cuddle",
    // "owns a goose that lays designer clothing",
    "the best smelling person in the world",
    "you will always smell good when you're with them",
    "a hot barista",
    "the president",
    "actor/actress you really like",
    // "a famous artist",
    "the most attractive personality you have ever seen",
    "never lies to you",
    "makes you feel secure",
    "world champion poker player",
    "royalty",
    // "famous fashion designer",
    "professional chef; cooks for you anytime",
    "a brain surgeon",
    // "CUSTOM CARD",
    "owns an adorable coffee shop",
    "spontaneous and fun",
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
    // "owns in vineyard",
    // "CUSTOM CARD",
    "the most physically attractive person you have ever seen",
    "owns a penthouse suite in your favorite city",
    "you will never gain weight while you're with them",
    "gives great massages",
    "owns a time machine",
    "a superhero",
    "a really really nice person",
    "trustworthy",
    "you will not age while you date them",
    // "CUSTOM CARD",
    "genius level IQ",
    // "a famous movie star",
    "owns your favorite sports team",
    "completely blind to all of your flaws",
    // "owns a magic (flying) carpet",
    // "generous",
    "shares all the same hobbies as you",
    // "owns ________",
    "front row tickets to every concert",
    "supports you in anything and everything",
    "most patient person",
    // "reliable",
    "calls you daddy",
    "is hung",
]

// red cards players can draw
const redCards = [
    "is dating two other people",
    "only calls you by her ex's name",
    "is planning to kill you",
    "is $500k in debt",
    "laughs non-stop during sex",
    "doesn't understand your jokes",
    "incapable of all emotion",
    "think you're ugly",
    "they slept with one of your parents",
    // "always covered in ants",
    "super super racist",
    // "voted for trump",
    "CUSTOM CARD",
    "zero percent sexually attracted to you",
    "a death row inmate",
    "owes the government 1 million",
    "is wanted in a foreign country",
    // "keeps talking about someone who looks just like you, only better",
    "only speaks in sarcasm",
    "is 13 years old",
    // "really stupid",
    "a porn star",
    "only talks about themselves",
    "you're allergic to them",
    "won't stop talking about their ex",
    "lives in a house with 8 dudes",
    "won't allow you to have wifi in the house",
    "never pays for anything",
    "CUSTOM CARD",
    "always speaks with a heavy fake accent",
    "only communicates with you via text message",
    "will kill you eventually, but it could be 60 years from now",
    "they only call you dude",
    "creates a mild scene every time you're out in public together",
    // "tries to pay for things with monopoly money",
    "live streams everything you do together",
    "continuosly asks if your best friend is 'down'",
    "kicks every animal they see",
    "underage",
    "will never stop using tinder",
    "really hates children",
    "never stops talking in a baby voice",
    "strapped to a time bomb, but there's no timer",
    "incapable of asking a question",
    "CUSTOM CARD",
    "never washes their hands",
    "addicted to drugs",
    "is actually an AI robot",
]