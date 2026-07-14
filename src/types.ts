export interface MemeImage {
  id: string;
  title: string;
  url: string;
  alt: string;
  description: string;
  tags: string[];
  initialLikes: number;
}

export interface TimelineStep {
  phase: string;
  title: string;
  description: string;
  icon: string;
}

export interface RelatedMeme {
  id: string;
  title: string;
  path: string;
  description: string;
  emoji: string;
  color: string;
}

export interface SlangWord {
  word: string;
  definition: string;
  example: string;
  emoji: string;
  category: string;
  originYear: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  tag: string;
}

export interface AICatItem {
  id: string;
  title: string;
  url: string;
  alt: string;
  description: string;
  role: string;
  powerRating: number;
}
