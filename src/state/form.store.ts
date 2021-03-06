import { ISelectOption } from 'interfaces/common.interface';
import create from 'zustand';

interface Form {
  loading: boolean;
  teamName: string;
  members: ISelectOption[];
  projectName: string;
  description: string;
  unconfirmedMembers: ISelectOption[];
  techStacks: ISelectOption[];
  columnName: string;
  projectId: string;
  inCharge: ISelectOption[];
  columnId: string;
  updateForm: (payload: any) => void;
  resetForm: () => void;
}

const initialState = {
  loading: false,
  teamName: '',
  members: [],
  projectName: '',
  description: '',
  unconfirmedMembers: [],
  techStacks: [],
  columnName: '',
  projectId: '',
  inCharge: [],
  columnId: '',
};

export const useFormStore = create<Form>((set: any) => ({
  ...initialState,
  updateForm: (payload) =>
    set((state: any) => ({
      ...state,
      ...payload,
    })),
  resetForm: () =>
    set((state: any) => ({
      ...state,
      ...initialState,
    })),
}));
