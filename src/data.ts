import { MemeImage, TimelineStep, RelatedMeme, SlangWord, FAQItem, AICatItem } from './types';

// Import local generated image assets
import heroImg from './assets/images/bussin_cat_hero_1784000454163.jpg';
import eatingImg from './assets/images/bussin_cat_eating_1784000463374.jpg';
import happyImg from './assets/images/bussin_cat_happy_1784000471507.jpg';
import danceImg from './assets/images/bussin_cat_dance_1784000481649.jpg';
import dripImg from './assets/images/bussin_cat_drip_1784000490110.jpg';
import reactionImg from './assets/images/bussin_cat_reaction_1784000498795.jpg';

// Import new batch of generated assets
import sushiImg from './assets/images/bussin_cat_sushi_1784014262420.jpg';
import streetwearImg from './assets/images/bussin_cat_streetwear_1784014272286.jpg';
import shockedImg from './assets/images/bussin_cat_shocked_1784014280443.jpg';
import celebrateImg from './assets/images/bussin_cat_celebrate_1784014292267.jpg';

// Import AI generated assets
import cyberpunkImg from './assets/images/bussin_cat_cyberpunk_1784011804897.jpg';
import astronautImg from './assets/images/bussin_cat_astronaut_1784011822642.jpg';
import chefImg from './assets/images/bussin_cat_chef_1784011832991.jpg';
import gamingImg from './assets/images/bussin_cat_gaming_1784011842129.jpg';
import wizardImg from './assets/images/bussin_cat_wizard_1784021901417.jpg';
import detectiveImg from './assets/images/bussin_cat_detective_1784021911129.jpg';
import gymImg from './assets/images/bussin_cat_gym_1784021922403.jpg';

export { heroImg };

export const MEME_GALLERY: MemeImage[] = [
  {
    id: 'bussin-cat-eating',
    title: 'Bussin Cat Eating Fish',
    url: eatingImg,
    alt: 'bussin cat eating fish meme showing ultimate satisfaction',
    description: 'Bussin Cat enjoying a delicious, grilled fish fillet. The eyes say it all—pure cosmic bliss!',
    tags: ['Satisfied', 'Foodie', 'Cute', 'NomNom'],
    initialLikes: 1420
  },
  {
    id: 'bussin-cat-sushi',
    title: 'Sushi Feast Feline',
    url: sushiImg,
    alt: 'fluffy kitten eating giant sushi roll in absolute bliss',
    description: 'This little foodie took one bite of a supreme tuna roll and reached nirvana. Straight bussin!',
    tags: ['Satisfied', 'Foodie', 'Cute', 'NomNom'],
    initialLikes: 1250
  },
  {
    id: 'bussin-cat-happy',
    title: 'Bussin Cat Overjoyed',
    url: happyImg,
    alt: 'bussin cat ecstatic and happy reaction meme',
    description: 'An extremely happy cat looking at the camera with wide dilated pupils of satisfaction.',
    tags: ['Ecstatic', 'Wholesome', 'Vibes', 'Happy'],
    initialLikes: 982
  },
  {
    id: 'bussin-cat-dance',
    title: 'Bussin Cat Celebrating',
    url: danceImg,
    alt: 'bussin cat doing a happy dance celebration meme',
    description: 'A dancing cat surrounded by party lights and colorful confetti. Absolute peak energy.',
    tags: ['Dance', 'Party', 'Victory', 'Hype'],
    initialLikes: 1105
  },
  {
    id: 'bussin-cat-celebrate',
    title: 'Victory Disco Dance',
    url: celebrateImg,
    alt: 'joyful dancing cat under party strobe lights with flying confetti',
    description: 'When the weekend arrives or the food bowl gets refilled. We are vibing and dancing all night!',
    tags: ['Dance', 'Party', 'Victory', 'Hype', 'Happy', 'Ecstatic', 'Vibes', 'Wholesome'],
    initialLikes: 1530
  },
  {
    id: 'bussin-cat-drip',
    title: 'Bussin Cat with Drip',
    url: dripImg,
    alt: 'bussin cat wearing sunglasses and gold chain drip meme',
    description: 'Bussin Cat rocking pixelated gold-rim sunglasses and a thick gold chain. Total confidence.',
    tags: ['Drip', 'Swag', 'Cool', 'Sunglasses'],
    initialLikes: 1789
  },
  {
    id: 'bussin-cat-streetwear',
    title: 'Streetwear Swag Champion',
    url: streetwearImg,
    alt: 'ultra cool cat posing in streetwear hoodie and sunglasses on street',
    description: 'Dressed in a tiny designer hoodie and sleek micro-shades, this feline owns the streets.',
    tags: ['Drip', 'Swag', 'Cool', 'Sunglasses'],
    initialLikes: 1620
  },
  {
    id: 'bussin-cat-reaction',
    title: 'Bussin Cat Mind Blown',
    url: reactionImg,
    alt: 'bussin cat hyper-expressive shock reaction meme with star eyes',
    description: 'A hyper-expressive reaction face. The sheer happiness is so intense it causes a cosmic explosion.',
    tags: ['Shocked', 'Satisfied', 'MindBlown', 'Relatable'],
    initialLikes: 2314
  },
  {
    id: 'bussin-cat-shocked',
    title: 'Unbelievable Revelation',
    url: shockedImg,
    alt: 'hilarious shocked cat face with wide opened eyes looking at camera',
    description: 'The exact expression when you find out they opened a fresh can of wet food in the kitchen.',
    tags: ['Shocked', 'MindBlown', 'Relatable'],
    initialLikes: 1890
  },
  {
    id: 'bussin-cat-wizard',
    title: 'Arcane Wizard Cat',
    url: wizardImg,
    alt: 'magical wizard orange cat with a glowing staff and star hat',
    description: 'Brewing some straight-bussin high-mana tuna potions in his cozy library tower.',
    tags: ['Ecstatic', 'Vibes', 'Happy', 'MindBlown'],
    initialLikes: 2150
  },
  {
    id: 'bussin-cat-detective',
    title: 'Inspector Sherlock Feline',
    url: detectiveImg,
    alt: 'cute fluffy orange detective cat with trench coat and magnifying glass',
    description: 'On the search for who took the last wet food packet. Mystery solved: it was straight bussin.',
    tags: ['Cool', 'Relatable', 'Cute'],
    initialLikes: 1945
  },
  {
    id: 'bussin-cat-gym',
    title: 'Gym Buff Champion',
    url: gymImg,
    alt: 'funny fitness orange cat lifting tiny barbells inside neon gym',
    description: 'Hitting the gym with absolute dedication. Pumping iron, chasing laser lights, and gaining maximum muscle.',
    tags: ['Hype', 'Victory', 'Swag', 'Relatable'],
    initialLikes: 2540
  }
];

export const TIMELINE: TimelineStep[] = [
  {
    phase: 'Phase 1: TikTok Rise',
    title: 'TikTok Slang "Bussin" Explodes',
    description: 'The AAVE term "bussin" (originating from culinary delight) goes viral globally on TikTok, used to describe unbelievably delicious food and extremely satisfying moments.',
    icon: '📱'
  },
  {
    phase: 'Phase 2: The Fusion',
    title: 'Internet Blends Cat Memes & slang',
    description: 'Meme creators combine the phrase "bussin" with hilarious expressions of cats eating, stretching, or looking deeply satisfied, birthing the cohesive concept of "Bussin Cat".',
    icon: '🐱'
  },
  {
    phase: 'Phase 3: Pop Icon Status',
    title: 'Bussin Cat Becomes Reaction Royalty',
    description: 'Bussin Cat becomes a staple reaction template on Discord, X (Twitter), and Reddit for wholesome, highly satisfying, or incredibly cool ("drip") responses.',
    icon: '🏆'
  }
];

export const RELATED_MEMES: RelatedMeme[] = [
  {
    id: 'rizz-cat',
    title: 'Rizz Cat',
    path: '/rizz-cat',
    description: 'The smooth-talking, ultra-charismatic cat with a charming smirk.',
    emoji: '😏',
    color: 'from-amber-400 to-orange-500'
  },
  {
    id: 'sigma-cat',
    title: 'Sigma Cat',
    path: '/sigma-cat',
    description: 'The independent, focused feline who respects the daily grind.',
    emoji: '🗿',
    color: 'from-zinc-600 to-zinc-900'
  },
  {
    id: 'vibing-cat',
    title: 'Vibing Cat',
    path: '/vibing-cat',
    description: 'Bobbing its head rhythmically to any music, in total harmony.',
    emoji: '🎧',
    color: 'from-indigo-400 to-purple-600'
  },
  {
    id: 'goofy-cat',
    title: 'Goofy Cat',
    path: '/goofy-cat',
    description: 'A hilarious compilation of cats doing silly, logic-defying stunts.',
    emoji: '🤪',
    color: 'from-emerald-400 to-teal-600'
  }
];

export const SLANG_DICTIONARY: SlangWord[] = [
  {
    word: 'bussin',
    definition: 'Extremely good, delicious, high quality, or exceptionally satisfying.',
    example: 'This grilled salmon is absolute peak, it is straight bussin!',
    emoji: '🔥',
    category: 'Culinary / Overall Excellence',
    originYear: '2020 (Global TikTok peak)'
  },
  {
    word: 'rizz',
    definition: 'Romantic charisma, charm, or the natural ability to attract and captivate others.',
    example: 'Rizz Cat just gave me that half-smirk look; he has insane rizz.',
    emoji: '😏',
    category: 'Social Charisma',
    originYear: '2022'
  },
  {
    word: 'gyatt',
    definition: 'An exclamation of shock, surprise, or amazement (originally "Gee yit").',
    example: 'Gyatt! Look at the size of that mega fish that cat is eating!',
    emoji: '😮',
    category: 'Exclamation',
    originYear: '2021'
  },
  {
    word: 'skibidi',
    definition: 'An ultra-versatile qualifier, often indicating chaotic, silly, or bad vibes, though sometimes used ironically for cool situations.',
    example: 'That goofy cat is doing the skibidi dance on top of the counter.',
    emoji: '🚽',
    category: 'Silly Slang',
    originYear: '2023'
  },
  {
    word: 'sigma',
    definition: 'An independent, highly focused, successful leader who operates outside traditional hierarchies ("lone wolf").',
    example: 'Sigma Cat does not care about other cats playing; he is on his own salmon grind.',
    emoji: '🗿',
    category: 'Personality Trait',
    originYear: '2021'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'What does "Bussin" actually mean?',
    answer: 'It is a popular internet slang word meaning extremely good, superb, or highly delicious. It is most frequently used to describe high-quality food, but has grown to represent any unbelievably satisfying state.',
    tag: 'Meaning'
  },
  {
    question: 'Is "Bussin" a real word or just online slang?',
    answer: 'While primarily popularized as online slang on platforms like TikTok and YouTube, the term has roots in African American Vernacular English (AAVE) long before it became an internet-wide phenomenon.',
    tag: 'Origin'
  },
  {
    question: 'Why is Bussin Cat so popular on the internet?',
    answer: 'Cats are naturally expressive creatures when they eat or feel happy. Combining their hilarious reaction faces with dramatic Gen Z slang created the perfect wholesome humor loop that resonates on Discord, Reddit, and X.',
    tag: 'Culture'
  },
  {
    question: 'Who created the original Bussin Cat meme?',
    answer: 'There is no single creator. It is a decentralized, crowdsourced meme that emerged when multiple independent users started overlaying TikTok audio transcripts and modern slang captions onto famous happy cat photos.',
    tag: 'Credits'
  },
  {
    question: 'Can I download and use Bussin Cat images?',
    answer: 'Yes! All the wiki images and templates in our gallery can be saved as WebP/JPEG, copied directly to clipboard, or customized on our interactive live canvas free of charge.',
    tag: 'Usage'
  }
];

export const AI_BUSSIN_CATS: AICatItem[] = [
  {
    id: 'cyberpunk-cat',
    title: 'Cyberpunk Cyber-Bussin Cat',
    url: cyberpunkImg,
    alt: 'futuristic cyberpunk orange cat with neon glowing visor glasses',
    description: 'Equipped with synthetic fish enhancers, this street-smart feline experiences virtual-reality flavor simulations that are straight bussin!',
    role: 'Synthwave Hacker Feline',
    powerRating: 99
  },
  {
    id: 'astronaut-cat',
    title: 'Cosmic Astro-Bussin Cat',
    url: astronautImg,
    alt: 'cute fluffy cat wearing spacesuit inside starship cabins looking out at earth',
    description: 'Floating in zero gravity, eating space-purified freeze-dried tuna, this brave astronaut is looking down at Earth with cosmic satisfaction.',
    role: 'Zero-G Salmon Explorer',
    powerRating: 95
  },
  {
    id: 'chef-cat',
    title: 'Gourmet Chef-Bussin Cat',
    url: chefImg,
    alt: 'professional kitten wearing white chef hat tasting steaming hot soup',
    description: 'Master of culinary feline excellence. He does not just eat food; he designs the most delicious, Michelin-star quality dishes that are 100% bussin.',
    role: 'Culinary Feline Legend',
    powerRating: 98
  },
  {
    id: 'gaming-cat',
    title: 'Ultimate Pro Gamer-Bussin Cat',
    url: gamingImg,
    alt: 'gaming cat wearing cat-ear headset sitting in rgb gaming chair smiling ecstatic',
    description: 'A dedicated pro player who just clinched a flawless 1v5 victory in Feline Warfare, celebrating in his custom RGB cockpit. Maximum hype!',
    role: 'RGB Cockpit Champion',
    powerRating: 97
  },
  {
    id: 'wizard-cat',
    title: 'Arcane Wizard-Bussin Cat',
    url: wizardImg,
    alt: 'magical wizard orange cat with a glowing staff and star hat',
    description: 'Brewing mystical high-mana spells and cosmic tuna potions that raise your energy levels instantly.',
    role: 'Tenth-Circle Archmage',
    powerRating: 96
  },
  {
    id: 'detective-cat',
    title: 'Detective Sherlock-Bussin Cat',
    url: detectiveImg,
    alt: 'cute fluffy orange detective cat with trench coat and magnifying glass',
    description: 'Cracking down on underground treat smugglers. He knows exactly where the premium tuna went.',
    role: 'Chief Feline Sleuth',
    powerRating: 94
  },
  {
    id: 'gym-cat',
    title: 'Powerlifter Gym-Bussin Cat',
    url: gymImg,
    alt: 'funny fitness orange cat lifting tiny barbells inside neon gym',
    description: 'Pumping iron on the scratching post and leading the heavy-lifting feline revolution. No days off!',
    role: 'Heavyweight Salmon lifter',
    powerRating: 95
  }
];

