import { Switch } from '@headlessui/react';
import useDarkMode from 'hooks/useDarkMode';

const Toggle = () => {
  const [theme, toggleTheme] = useDarkMode();

  return (
    <Switch checked={theme === 'dark'} onChange={toggleTheme} className={`${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}>
      <span className="sr-only">Enable notifications</span>
      <span className={`${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white`} />
    </Switch>
  );
};

export default Toggle;
