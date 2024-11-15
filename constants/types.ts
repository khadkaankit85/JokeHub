// navigation/types.ts
export type RootStackParamList = {
  jokepage: { category: string; id: number; globalCategory: string };
  home: undefined;
  jokelist: {
    category: string;
  };
};

export interface Joke {
  body: string;
  category: string;
  id: number;
  title: string;
}
