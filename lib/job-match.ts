export interface JobMatchBreakdownItem {
  label: string;
  score: number;
}

export interface JobMatchGap {
  requirement: string;
  note: string;
}

export interface JobMatchEvidence {
  bullet: string;
  source: string;
}

export interface JobMatchResult {
  overall_score: number;
  summary: string;
  breakdown: JobMatchBreakdownItem[];
  matched: string[];
  gaps: JobMatchGap[];
  evidence: JobMatchEvidence[];
}

export interface JobMatchErrorResponse {
  error: string;
}
