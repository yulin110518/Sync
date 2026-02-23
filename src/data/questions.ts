export type Difficulty = '初级' | '中级' | '高级';

export interface Question {
  id: string;
  sentence: string; // Use "______" for blanks
  options: string[];
  correctAnswer: string;
  grammarPoint: string;
  difficulty: Difficulty;
  explanation: {
    rule: string;
    example: string;
    commonMistake: string;
  };
}

export const questions: Question[] = [
  {
    id: '1',
    sentence: "______ tired, she still finished the report.",
    options: ["Although", "Because", "Unless", "If"],
    correctAnswer: "Although",
    grammarPoint: "让步状语从句",
    difficulty: "中级",
    explanation: {
      rule: "Although 引导让步状语从句，表示“尽管”。注意 Although 不能与 but 连用。",
      example: "Although it was cold, he went swimming.",
      commonMistake: "错误：Although it was cold, but he went swimming."
    }
  },
  {
    id: '2',
    sentence: "The boy ______ is wearing a red cap is my brother.",
    options: ["who", "which", "whose", "whom"],
    correctAnswer: "who",
    grammarPoint: "定语从句",
    difficulty: "初级",
    explanation: {
      rule: "who 引导定语从句，先行词为人且在从句中作主语。",
      example: "The man who lives next door is a doctor.",
      commonMistake: "错误：The boy which is wearing... (which 用于物)"
    }
  },
  {
    id: '3',
    sentence: "I don't know ______ he will come or not.",
    options: ["if", "whether", "that", "what"],
    correctAnswer: "whether",
    grammarPoint: "宾语从句",
    difficulty: "初级",
    explanation: {
      rule: "whether...or not 是固定搭配，表示“是否”。",
      example: "I wonder whether it will rain or not.",
      commonMistake: "错误：I don't know that he will come or not."
    }
  },
  {
    id: '4',
    sentence: "He spoke slowly ______ everyone could understand him.",
    options: ["so that", "in order to", "because", "as if"],
    correctAnswer: "so that",
    grammarPoint: "目的状语从句",
    difficulty: "初级",
    explanation: {
      rule: "so that 引导目的状语从句，意为“以便”。",
      example: "Speak louder so that I can hear you.",
      commonMistake: "错误：He spoke slowly in order to everyone... (in order to 后接动词原形)"
    }
  },
  {
    id: '5',
    sentence: "I will go to the park if it ______ tomorrow.",
    options: ["doesn't rain", "won't rain", "isn't raining", "didn't rain"],
    correctAnswer: "doesn't rain",
    grammarPoint: "条件状语从句",
    difficulty: "初级",
    explanation: {
      rule: "if 引导的条件状语从句遵循“主将从现”原则。",
      example: "If you come, we will be happy.",
      commonMistake: "错误：If it will rain tomorrow..."
    }
  },
  {
    id: '6',
    sentence: "The movie was ______ interesting that I watched it twice.",
    options: ["so", "such", "very", "too"],
    correctAnswer: "so",
    grammarPoint: "结果状语从句",
    difficulty: "中级",
    explanation: {
      rule: "so + 形容词/副词 + that... 引导结果状语从句。",
      example: "He was so tired that he fell asleep quickly.",
      commonMistake: "错误：The movie was such interesting that..."
    }
  },
  {
    id: '7',
    sentence: "He didn't go to bed ______ he finished his work.",
    options: ["until", "after", "when", "while"],
    correctAnswer: "until",
    grammarPoint: "时间状语从句",
    difficulty: "中级",
    explanation: {
      rule: "not...until... 意为“直到...才...”。",
      example: "I didn't leave until it stopped raining.",
      commonMistake: "错误：He didn't go to bed when he finished... (语义不通)"
    }
  },
  {
    id: '8',
    sentence: "______ you study, the better grades you will get.",
    options: ["The harder", "Harder", "Hardest", "The hardest"],
    correctAnswer: "The harder",
    grammarPoint: "比较等级",
    difficulty: "中级",
    explanation: {
      rule: "the + 比较级, the + 比较级 意为“越...就越...”。",
      example: "The more you read, the more you know.",
      commonMistake: "错误：More you study, better grades..."
    }
  },
  {
    id: '9',
    sentence: "Work hard, ______ you will succeed.",
    options: ["and", "or", "but", "so"],
    correctAnswer: "and",
    grammarPoint: "祈使句搭配",
    difficulty: "初级",
    explanation: {
      rule: "祈使句 + and + 陈述句（一般将来时），表示“如果...就...”。",
      example: "Hurry up, and you will catch the bus.",
      commonMistake: "错误：Work hard, or you will succeed. (or 表示“否则”)"
    }
  },
  {
    id: '10',
    sentence: "Can you tell me ______ the problem?",
    options: ["how to solve", "how solving", "to solve how", "how solve"],
    correctAnswer: "how to solve",
    grammarPoint: "疑问词+不定式",
    difficulty: "中级",
    explanation: {
      rule: "疑问词（how, what, where等）+ 不定式（to do）可在句中作宾语。",
      example: "I don't know what to do next.",
      commonMistake: "错误：Can you tell me how solve the problem?"
    }
  }
];

