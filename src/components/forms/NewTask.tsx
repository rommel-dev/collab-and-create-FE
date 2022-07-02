import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { MultiSelect } from 'react-multi-select-component';
import TextArea from 'components/common/TextArea';
import { IUser } from 'interfaces/user.interface';
import { useFormStore } from 'state/form.store';
import { GET_PROJECTS } from 'api/gql/project/project.query';
import { IProject } from 'interfaces/project.interface';
import { useQuery } from '@apollo/client';

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
  const { projectId } = useParams();
  const [selected, setSelected] = useState<any>([]);
  const [options, setOptions] = useState([]);
  const { description, updateForm, inCharge } = useFormStore();

  const { data } = useQuery(GET_PROJECTS);

  useEffect(() => {
    if (data) {
      const projectMembers = data?.getProjects.find(
        (project: IProject) => project._id === projectId
      ).confirmedMembers;
      const members = projectMembers?.map((member: IUser) => {
        return {
          label: <Label photo={member.photo} name={member.name} />,
          value: member._id,
        };
      });
      setOptions(members);
    }
  }, [data]);

  const onChangeMembers = (items: any) => {
    setSelected([
      ...items.map((item: any) => ({
        label: item.label.props ? item.label.props.name : item.label,
        value: item.value,
      })),
    ]);
    updateForm({ inCharge: items });
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
            updateForm({ description: e.target.value })
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
