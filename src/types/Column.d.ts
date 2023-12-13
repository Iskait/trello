export interface Column {
  title: string;
  cards: Card[];
}

export interface Card {
  text: string;
  comments: Comment[];
}

export interface Comment {
  author: string;
  comment: string;
}
