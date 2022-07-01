import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { MultiSelect } from 'react-multi-select-component';
import TextArea from 'components/common/TextArea';
import { IUser } from 'interfaces/user.interface';
import { useFormStore } from 'state/form.store';
import { client } from 'index';
import { GET_PROJECTS } from 'api/gql/project/project.query';
import { IProject } from 'interfaces/project.interface';

const Label = ({ photo, name }: any) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <img
        className="h-6 w-6 rounded-full object-cover"
        src={photo}
        alt="member"
      />
      <p className="text-sm font-semibold text-gray-700">{name}</p>
    </div>
  );
};

const NewTask = () => {
  const params = useParams();
  const { description, updateForm, inCharge } = useFormStore();

  const data = client.readQuery({
    query: GET_PROJECTS,
  });

  const [selected, setSelected] = useState<any>([]);

  const projectMembers = data.getProjects.find(
    (project: IProject) => project._id === params.projectId
  ).confirmedMembers;

  const options = projectMembers.map((member: IUser) => {
    return {
      label: <Label photo={member.photo} name={member.name} />,
      value: member._id,
    };
  });

  const onChangeMembers = (items: any) => {
    setSelected([
      ...items.map((item: any) => ({
        label: item.label.props ? item.label.props.name : item.label,
        value: item.value,
      })),
    ]);
    updateForm({ members: items });
  };

  return (
    <form className="mt-8 space-y-6">
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <MultiSelect
          options={options}
          value={selected}
          onChange={onChangeMembers}
          labelledBy="In Charge"
          className="z-50 overflow-y-visible"
        />
        <TextArea
          rows={12}
          value={description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateForm(e.target.value)
          }
          label="Task Description"
          id="description"
          name="description"
          type=""
          autoComplete="text"
          placeholder="Task Description"
        />
      </div>
    </form>
  );
};

export default NewTask;
