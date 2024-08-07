import React, { useContext, useRef } from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react';
import { UserContext } from '../../context/UserContext';
import { IconBadge } from '../../../storybook/icon-badge/IconBadge';
import { ThemeIcons } from '../../../storybook/theme-icons/ThemeIcons';

export const UserMenu: React.FC = () => {
  const { username, factions } = useContext(UserContext);
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

  const renderFaction = (faction: string) => {
    switch (faction) {
      case 'Alliance':
        return (
          <span className="flex items-center text-blue-alliance mt-1">
            <img
              src="https://cdn3.emoji.gg/emojis/7890_alliance_wow.png"
              alt="Alliance"
              style={{ width: '16px', height: '16px' }}
            />
            Alliance
          </span>
        );
      case 'Horde':
        return (
          <span className="flex items-center text-red-horde mt-1">
            <img
              src="https://cdn3.emoji.gg/emojis/2665_horde_wow.png"
              alt="Horde"
              style={{ width: '16px', height: '16px' }}
            />
            Horde
          </span>
        );
      default:
        return;
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
                <span className="max-w-[350px] truncate font-semibold">
                  {factions.length === 1 ? (
                    renderFaction(factions[0])
                  ) : (
                    <span className="flex items-center">
                      {renderFaction('Alliance')} &nbsp; {renderFaction('Horde')}
                    </span>
                  )}
                </span>
              </div>
            </DropdownItem>
          </DropdownSection>
          <DropdownSection showDivider={true}>
            <DropdownItem
              key={'info'}
              aria-label={'Player info'}
              startContent={<ThemeIcons.IdCard className="size-5" />}>
              Player info
            </DropdownItem>
          </DropdownSection>
          <DropdownSection showDivider={true}>
            <DropdownItem
              key={'info'}
              aria-label={'Player info'}
              startContent={<ThemeIcons.UserCheck className="size-5" />}>
              Characters
            </DropdownItem>
          </DropdownSection>
          <DropdownSection>
            <DropdownItem
              key={'logout'}
              aria-label={'Logout'}
              startContent={<ThemeIcons.Logout className="size-5" />}>
              Log out
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
      <form
        action="http://localhost:4000/api/auth/logout"
        method="post"
        ref={ref}
        className="hidden"
      />
    </>
  );
};