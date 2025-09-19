export interface Text2imageResponse {
  task_id: string;
  task_status: string;
  results: {
    orig_prompt: string;
    actual_prompt: string;
    url: string;
  }[];
  task_metrics: {
    TOTAL: number;
    SUCCEEDED: number;
    FAILED: number;
  };
}

export interface WorksItem {
  id: string;
  task_id: string;
  actual_prompt: string;
  orig_prompt: string;
  url: string;
  size: {
    value: string;
    width: number;
    height: number;
  };
  style: {
    value: string;
    image: string;
  };
  seed: number;
}

export interface Image2imageResponse {
  choices: {
    finish_reason: string;
    message: {
      content: {
        image: string;
      }[];
      role: string;
    };
  }[];
}
