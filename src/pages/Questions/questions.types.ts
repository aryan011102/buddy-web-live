export type QuestionColor = 'pink' | 'grey' | 'blue';

export interface QuestionBubbleData {
  id: string;
  text: string;
  color: QuestionColor;
  x: number; 
  y: number; 
  tail?: 'left' | 'right';
}
