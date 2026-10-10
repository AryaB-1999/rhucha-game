export const ASSETS = [
  '/assets/1.jpeg',
  '/assets/11.jpg',
  '/assets/12.jpg',
  '/assets/123.jpg',
  '/assets/14.jpg',
  '/assets/15.jpg',
  '/assets/16.jpg',
  '/assets/17.jpg',
  '/assets/2.jpeg',
  '/assets/3.jpeg',
  '/assets/4.jpeg',
  '/assets/5.jpeg',
  '/assets/6.jpeg',
  '/assets/7.jpeg',
  '/assets/Old-Photo-1.jpg',
  '/assets/Old-Photo-2.jpg',
  '/assets/Sign.jpeg'
];

export type TriviaQuestion = {
  q: string;
  options: string[];
  a: string;
};

export const STAGES = [
  {
    id: 1,
    type: 'memory',
    title: 'Stage 1: Fragmented Memories',
    description: 'Find the matching pairs of your favorite things.',
    items: ['Aventurine', 'Boothill', 'Dr. Ratio', 'Sunday', 'Rinne', 'Shidou', 'Isagi', 'BillyKid'],
    timeLimit: null
  },
  {
    id: 2,
    type: 'trivia',
    title: 'Stage 2: Scholars & Dreamers (HSR & Genshin)',
    description: 'Answer these questions about the characters you love.',
    questions: [
      { q: "Dr. Ratio often carries what object to signify his scholarly and somewhat condescending nature?", options: ["A book of equations", "A piece of chalk", "A marble statue", "An owl"], a: "A piece of chalk" },
      { q: "What is Sunday's ultimate tragic goal in Penacony?", options: ["To destroy the IPC", "To become an Aeon", "To create a dream of perfect order without suffering", "To resurrect Robin"], a: "To create a dream of perfect order without suffering" },
      { q: "Who is the legendary, currently absent Grand Master of the Knights of Favonius?", options: ["Jean", "Diluc", "Varka", "Kaeya"], a: "Varka" }
    ],
    timeLimit: null
  },
  {
    id: 3,
    type: 'scramble',
    title: 'Stage 3: Twisted Names',
    description: 'Unscramble the names of these beloved characters.',
    words: ['AVENTURINE', 'SUNDAY', 'VARKA', 'ANAXA'],
    timeLimit: null
  },
  {
    id: 4,
    type: 'trivia',
    title: 'Stage 4: Blue Lock & ZZZ',
    description: 'Prove your knowledge!',
    questions: [
      { q: "What is Yoichi Isagi's primary weapon on the field?", options: ["Spatial Awareness", "Incredible Speed", "Physical Strength", "Perfect Dribbling"], a: "Spatial Awareness" },
      { q: "Ryusei Shidou's explosive and aggressive playstyle makes him...", options: ["A team player", "The Zlatan of Blue Lock", "A defensive genius", "A timid striker"], a: "The Zlatan of Blue Lock" },
      { q: "In Zenless Zone Zero, Billy Kid is an eccentric cyborg who idolizes which show?", options: ["Starlight Knight", "Ranger Robo", "Galaxy Guardian", "New Eridu Heroes"], a: "Starlight Knight" }
    ],
    timeLimit: null
  },
  {
    id: 5,
    type: 'match',
    title: 'Stage 5: Bound by Fate',
    description: 'Match the character to their tragic or defining lore.',
    pairs: {
      'Kakavasha (Aventurine)': 'Sole survivor of the Sigonian Avgins',
      'Sunday': 'Wished for a paradise without suffering via the Order',
      'Rinne Amagi': 'Left his village and burden behind for idols',
      'Billy Kid': 'Starlight Knight fanatic and cyborg gunslinger'
    },
    timeLimit: null
  },
  {
    id: 6,
    type: 'trivia',
    title: 'Stage 6: Stars & Space (HSR & ES)',
    description: 'Trivia about Honkai Starrail and Ensemble Stars.',
    questions: [
      { q: "Aventurine's defining trait, born from his tragic luck, is his willingness to...", options: ["Bet it all on a gamble", "Hide from his enemies", "Seek out the Aeons", "Become an Emanator"], a: "Bet it all on a gamble" },
      { q: "Rinne Amagi is the chaotic and reckless leader of which Ensemble Stars unit?", options: ["ALKALOID", "Crazy:B", "UNDEAD", "Knights"], a: "Crazy:B" },
      { q: "What does Boothill canonically replace his swear words with?", options: ["Beep, Boop", "Fudge, Darn", "Muddle-fudger, Fork", "Censor noises"], a: "Muddle-fudger, Fork" }
    ],
    timeLimit: null
  },
  {
    id: 7,
    type: 'code',
    title: 'Stage 7: The Vault',
    description: 'Crack the 4-digit code using the lore.',
    hints: [
      "Digit 1: Number of Starlight Knights Billy Kid idolizes (1).",
      "Digit 2: Number of members in Crazy:B.",
      "Digit 3: The stage number you are currently on.",
      "Digit 4: Number of times Isagi gave up (Hint: None)."
    ],
    answer: "1470",
    timeLimit: null
  },
  {
    id: 8,
    type: 'trivia',
    title: 'Stage 8: The Ultimate Test',
    description: 'A mix of everything you love.',
    questions: [
      { q: "Zenless Zone Zero takes place in the last remaining city called...", options: ["New Eridu", "Kivotos", "Belobog", "Teyvat"], a: "New Eridu" },
      { q: "Dr. Ratio often wears what on his head when he is disappointed?", options: ["A paper bag", "An alabaster head", "A crown", "Nothing"], a: "An alabaster head" },
      { q: "Why does Aventurine wear his signature sunglasses?", options: ["To look cool", "To hide the barcode on his neck", "He is blind", "To scan enemies"], a: "To hide the barcode on his neck" }
    ],
    timeLimit: null
  },
  {
    id: 9,
    type: 'scramble',
    title: 'Stage 9: The Pressure Room',
    description: 'Unscramble words under time pressure!',
    words: ['BOOTHILL', 'RATIO', 'SHIDOU', 'ISAGI', 'RINNE'],
    timeLimit: 60
  },
  {
    id: 10,
    type: 'trivia',
    title: 'Stage 10: The Final Exam',
    description: 'Rapid fire trivia! You have 30 seconds to answer all 4!',
    questions: [
      { q: "Isagi's ego revolves around devouring...", options: ["His teammates' light", "The ball", "The referee", "His own ego"], a: "His teammates' light" },
      { q: "What is Boothill's path in HSR?", options: ["Hunt", "Erudition", "Destruction", "Nihility"], a: "Hunt" },
      { q: "In ZZZ, what is the name of the protagonist sibling duo?", options: ["Aether & Lumine", "Caelus & Stelle", "Wise & Belle", "Rover"], a: "Wise & Belle" },
      { q: "What is Varka's title in Genshin Impact?", options: ["Knight of Boreas", "Darknight Hero", "Lion of the South", "Grand Master"], a: "Grand Master" }
    ],
    timeLimit: 30
  }
];
