import React from 'react';
import { MultiSelect } from 'react-multi-select-component';
import Input from 'components/common/Input';
import TextArea from 'components/common/TextArea';
import { useFormStore } from 'state/form.store';
import { ISelectOption } from 'interfaces/common.interface';

const NewProject = () => {
  const {
    projectName,
    description,
    unconfirmedMembers,
    techStacks,
    updateForm,
  } = useFormStore();

  // TODO
  const memberOptions = [
    { _id: '62bfdec105e77a670957d0dc', email: 'rommel667@gmail.com' },
    { _id: '62bfdf0505e77a670957d0e7', email: 'rommel668@gmail.com' },
  ].map((colleague: any) => {
    return { label: colleague.email, value: colleague._id };
  });

  const techStackOptions: ISelectOption[] = [
    { label: 'React', value: 'React' },
    { label: 'Vue', value: 'Vue' },
    { label: 'Angular', value: 'Angular' },
  ];

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateForm({ [event.target.name]: event.target.value });
  };

  return (
    <form className="mt-8 space-y-6">
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="">
        <p className="text-sm text-gray-500">Members</p>
        <MultiSelect
          options={memberOptions}
          value={unconfirmedMembers}
          onChange={(items: any) => updateForm({ unconfirmedMembers: items })}
          labelledBy="In Charge"
          className="z-20 overflow-y-visible mb-5"
        />

        <p className="text-sm text-gray-500">TechStacks</p>
        <MultiSelect
          options={techStackOptions}
          value={techStacks}
          onChange={(items: any) => updateForm({ techStacks: items })}
          labelledBy="In Charge"
          className="z-20 overflow-y-visible"
        />

        <Input
          value={projectName}
          onChange={onChangeInput}
          label="Project Name"
          id="projectName"
          name="projectName"
          type="text"
          autoComplete="text"
          placeholder="Project Name"
        />

        <TextArea
          rows={8}
          value={description}
          onChange={onChangeInput}
          label="Project Description"
          id="description"
          name="description"
          type="text"
          autoComplete="text"
          placeholder="Project Description"
        />
      </div>
    </form>
  );
};

export default NewProject;
