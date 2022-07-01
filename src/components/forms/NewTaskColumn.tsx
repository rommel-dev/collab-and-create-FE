import Input from 'components/common/Input';
import React, { useEffect } from 'react';

import { useFormStore } from 'state/form.store';

const NewTaskColumn = () => {
  const { columnName, updateForm } = useFormStore();

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateForm({ [event.target.name]: event.target.value });
  };

  return (
    <form className="mt-8 space-y-6">
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="">
        <Input
          value={columnName}
          onChange={onChangeInput}
          label="Column Name"
          id="columnName"
          name="columnName"
          type="text"
          autoComplete="text"
          placeholder="Column Name"
        />
      </div>
    </form>
  );
};

export default NewTaskColumn;
