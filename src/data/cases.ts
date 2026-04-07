export type QuestionType = 'mcq' | 'tf';

export interface MCQQuestion {
  id: string;
  type: 'mcq';
  text: string;
  options: [string, string, string, string];
  correctIndex: number;
  reference: string;
  explanation: string;
}

export interface TFQuestion {
  id: string;
  type: 'tf';
  text: string;
  correctAnswer: boolean;
  reference: string;
  explanation: string;
}

export type Question = MCQQuestion | TFQuestion;

export interface CaseData {
  id: string;
  number: number;
  title: string;
  regulation: string;
  color: string;
  icon: string;
  free: boolean;
  briefing: string;
  questions: Question[];
}

// Placeholder — questions will be populated after regulation research
export const cases: CaseData[] = [
  {
    id: 'fire',
    number: 1,
    title: 'The Alarm That Never Rang',
    regulation: 'RRO 2005',
    color: 'var(--color-fire)',
    icon: '🔥',
    free: true,
    briefing:
      'A fire alarm failed to activate during a real incident at a multi-tenanted office building. Two floors were evacuated by staff shouting warnings. The fire authority investigation revealed the alarm system had not been serviced in over 18 months, the fire risk assessment was three years out of date, and no fire drills had been conducted since the building changed ownership. You are the newly appointed responsible person. Review the evidence and answer the questions.',
    questions: [],
  },
  {
    id: 'water',
    number: 2,
    title: 'The Warm Water Mystery',
    regulation: 'ACoP L8 / HSG274',
    color: 'var(--color-water)',
    icon: '💧',
    free: false,
    briefing:
      'Residents in a sheltered housing scheme reported lukewarm water from their hot taps for several weeks. A routine Legionella risk assessment revealed the calorifier was storing water at 49°C — well below the safe threshold. Two sentinel outlets failed temperature checks. Emergency remedial action was required. You are the duty holder responsible for water hygiene. Investigate the failures.',
    questions: [],
  },
  {
    id: 'asbestos',
    number: 3,
    title: 'Found in the Ceiling',
    regulation: 'CAR 2012',
    color: 'var(--color-asbestos)',
    icon: '⚠️',
    free: false,
    briefing:
      'During a routine ceiling tile replacement in a 1970s office building, a maintenance contractor discovered suspected asbestos insulation board behind the tiles. Work was halted immediately and the area sealed off. The building\'s asbestos register had not been updated since 2014, and the contractor had not been shown it before starting work. You are the dutyholder. Determine what went wrong and what the law requires.',
    questions: [],
  },
  {
    id: 'electrical',
    number: 4,
    title: 'Sparks in the Staff Room',
    regulation: 'EAWR 1989',
    color: 'var(--color-electrical)',
    icon: '⚡',
    free: false,
    briefing:
      'A staff member received an electric shock from a faulty kettle in the break room of a managed office building. The subsequent investigation found no portable appliance testing records, an electrical installation last inspected in 2016, and several double-socket adapters daisy-chained together. The HSE issued an improvement notice. You are the responsible person. Assess the compliance failures.',
    questions: [],
  },
  {
    id: 'gas',
    number: 5,
    title: 'Something in the Air',
    regulation: 'Gas Safety Regs 1998',
    color: 'var(--color-gas)',
    icon: '🔧',
    free: false,
    briefing:
      'Occupants of a commercial kitchen reported persistent headaches and nausea over several days. A carbon monoxide alarm finally activated, reading 85 ppm. The gas supply was immediately isolated. Investigation revealed the commercial boiler flue had partially collapsed, and the last gas safety inspection was 22 months ago. You are the responsible person. Determine the compliance failures.',
    questions: [],
  },
  {
    id: 'cooling',
    number: 6,
    title: 'The Tower on the Roof',
    regulation: 'HSG274 Part 1',
    color: 'var(--color-cooling)',
    icon: '🌡️',
    free: false,
    briefing:
      'A cooling tower on a commercial building\'s roof was found to be operating without local authority notification. The building had recently changed hands, and the new facilities team were unaware of the cooling system on the roof. Quarterly Legionella sampling had lapsed, and the last recorded dip slide showed bacterial counts above action levels. You are the new duty holder. Assess the situation.',
    questions: [],
  },
];

export function getCaseById(id: string): CaseData | undefined {
  return cases.find((c) => c.id === id);
}

export function getRating(score: number): { label: string; icon: string; stars: number } {
  if (score >= 90) return { label: 'Expert Safety Officer', icon: '🏆', stars: 5 };
  if (score >= 70) return { label: 'Compliance Professional', icon: '⭐', stars: 4 };
  if (score >= 40) return { label: 'Safety Aware', icon: '👍', stars: 3 };
  return { label: 'Needs More Training', icon: '📚', stars: 1 };
}
