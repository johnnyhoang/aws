import { QuizQuestion } from '../types';
import { CLF_QUESTIONS } from './quizzes/clfQuestions';
import { SAA_QUESTIONS } from './quizzes/saaQuestions';
import { SOA_QUESTIONS } from './quizzes/soaQuestions';
import { DVA_QUESTIONS } from './quizzes/dvaQuestions';
import { SAP_QUESTIONS } from './quizzes/sapQuestions';
import { HIGHER_ED_QUESTIONS } from './quizzes/higherEdQuestions';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  ...CLF_QUESTIONS,
  ...SAA_QUESTIONS,
  ...SOA_QUESTIONS,
  ...DVA_QUESTIONS,
  ...SAP_QUESTIONS,
  ...HIGHER_ED_QUESTIONS
];
