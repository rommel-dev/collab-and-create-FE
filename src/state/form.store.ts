import { ISelectOption } from 'interfaces/common.interface';
import create from 'zustand';

interface Form {
  teamName: string;
  members: ISelectOption[];
  projectName: string;
  description: string;
  unconfirmMembers: ISelectOption[];
  techStacks: ISelectOption[];
  columnName: string;
  projectId: string;
  inCharge: ISelectOption[];
  columnId: string;
  updateForm: (payload: any) => void;
  resetForm: () => void;
}

const initialState = {
  teamName: '',
  members: [],
  projectName: '',
  description: '',
  unconfirmMembers: [],
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
