import React, { useContext, useRef } from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react';
import { UserContext } from '../../context/UserContext';
import { IconBadge } from '../../../storybook/icon-badge/IconBadge';
import { ThemeIcons } from '../../../storybook/theme-icons/ThemeIcons';

export const UserMenu: React.FC = () => {
  const { username } = useContext(UserContext);
  const ref = useRef<HTMLFormElement>(null);

  const onAction = (key: React.Key) => {
    switch (key) {
      case 'logout':
        ref?.current?.submit();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Dropdown
        classNames={{ base: 'min-w-[200px]', content: 'bg-card' }}
        radius={'sm'}>
        <DropdownTrigger>
          <Button
            color="default"
            variant={'ghost'}
            isIconOnly={true}
            startContent={<ThemeIcons.User className={'size-5'} />}
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label={'utilizator-menu'}
          onAction={onAction}>
          <DropdownSection showDivider={true}>
            <DropdownItem
              key={'title'}
              aria-label={'Title'}
              startContent={<IconBadge icon={ThemeIcons.User} />}
              isReadOnly={true}>
              <div className="flex flex-col">
                <span className="max-w-[350px] truncate font-semibold">
                  {username}
                </span>
              </div>
            </DropdownItem>
          </DropdownSection>
          <DropdownSection showDivider={true}>
            <DropdownItem
              key={'identitate'}
              aria-label={'Date personale'}
              startContent={<ThemeIcons.IdCard className="size-5" />}>
              Date personale
            </DropdownItem>

            <DropdownItem
              key={'identificare-electronica'}
              aria-label={'Identificare electronică'}
              startContent={<ThemeIcons.Certificate className="size-5" />}>
              Identificare electronică
            </DropdownItem>
          </DropdownSection>
          <DropdownSection>
            <DropdownItem
              key={'logout'}
              aria-label={'Logout'}
              startContent={<ThemeIcons.Logout className="size-5" />}>
              Delogare
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
      <form
        action="/logout"
        method="post"
        ref={ref}
        className="hidden"
      />
    </>
  );
};
