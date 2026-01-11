// // src/data/config.js
const config = {
  //ayeee mer saey
  girlfriendName: "Acela",

  teaser: {
    title: "I made something small... for us",
    subtitle: "A place for our memories to breathe",
    buttonText: "Open",
    dodgeTimes: 2,
  },

  discover: {
    heading: "Find our little moments",
    subheading: "Tap the floating icons. Each one hides a piece of us.",
    nextText: "Next",
    items: [
      {
        id: "icecream",
        icon: "🍦",
        title: "The ice that melted the boiling heart",
        message:
          "I almost let you go home without meeting… then I panicked, bought you ice cream, and chased you back. You were mad, didn’t get on my motobike, went to class… and the ice cream helped cool your heart. We talked. And I felt lucky just sitting there with you.",
      },
      {
        id: "hug",
        icon: "🫂",
        title: "Our first hug (must’ve been the wind)",
        message:
          "Quietest classroom ever(11f). Goodbye time. No planning. No thinking. We hugged instinctively prolly the wind pushed us together. I went home with the biggest smile on my face… and honestly, I still carry that🤫",
      },
      {
        id: "kiss",
        icon: "🫦",
        title: "Our first deep kiss",
        message:
          "That long, deep kiss… and hugs as the birds flews intersectively... the best. It felt like the whole world got softer for a moment. I replay it when I miss you and want it.",
      },
      {
        id: "ldr",
        icon: "🎡",
        title: "Our Latest Hangout",
        message:
          "We went back to that place we once visited with friends—this time it was *us*. Walking, admiring the world, taking so many pics and videos together. Then a big kiss because our friends were calling… and you got a piggy ride. Everyone was in a hurry, so we ran and laughing like kids. That day is my warmest blanket.",
      },
    ],
  },

  puzzle: {
    heading: "Bring my hearts back to you(inside the box)",
    subheading:
      "Drag the all the heart's color into the area.",
    nextText: "Next",
    hearts: ["💙", "❤️", "🩷", "💛"],
    snapRadius: 140, // extra forgiving
  },

  letter: {
    headingLocked: "A locked love letter ✉️",
    hint: "Unlock it by clicking 5 hearts OR typing your name correctly.",
    typedPlaceholder: "Type her name here…",
    finalLine: "Happy 2nd Anniversary",

    photos: [
        { src: "/photos/01.jpg", alt: "Us 1" },
        { src: "/photos/02.jpg", alt: "Us 2" },
        { src: "/photos/03.jpg", alt: "Us 3" },
        { src: "/photos/04.jpg", alt: "Us 4" },
        { src: "/photos/05.jpg", alt: "Us 5" },
        { src: "/photos/06.jpg", alt: "Us 7" },
        { src: "/photos/07.jpg", alt: "Us 7" },
    ],

    content: [
      "Dear Bae,",
      "",
      "Instead of replying oun, I made this little page for you because I wanted you to feel something, not just read something.",
      "Something fun. Something soft. Something that belongs to us.",
      "Though I know oun pong wonder, or khg right now",
      "",
      "I still remember the day I almost let you go home without meeting.",
      "So I rethought everything, grabbed ice cream, and chased you back by my own desire.",
      "You were mad (highkey cute), you didn’t get on my motobike, and you went back to class…",
      "but when I gave you the ice cream, your boiling heart started to calm.",
      "We talked, and the world felt quiet in the best way.",
      "",
      "And then at the end… we hugged. No planning. Just instinct.",
      "must’ve been the wind.)",
      "I went home with the biggest smile on my face—and I swear that smile still lives in me.",
      "",
      "I also can’t forget our first long deep kiss.",
      "The best, no word can describes. The kind of moment that makes distance feel temporary.",
      "",
      "And our latest hangout… going back to that place from before, but this time it was *us*.",
      "Walking, admiring the beauty of the world, taking pics and videos like we were collecting proof that we’re real.",
      "Then a big kiss because our friends were calling, and I gave you a piggy ride—",
      "and because everyone was so hurry, we all ran and laughed so hard.",
      "",
      "Now we’re back to LDR, but you’re still with me.",
      "In my head, in my heart, in the way I smile for no reason.",
      "",
      "Happy Anniversary, my naugthy girl.",
      "I love you softly, loudly, and always.",
      "",
      "— Yours always",
    ],
  },
};

export default config;
