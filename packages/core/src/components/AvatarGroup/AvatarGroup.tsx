import * as React from 'react';
import { Avatar } from 'radix-ui';
import { composeClasses } from '../../utilities';

type AvatarUser = {
  name: string;
  imageUrl: string;
};

type NativeDivProps = React.HTMLAttributes<HTMLDivElement>;

export interface AvatarGroupProps extends Omit<NativeDivProps, 'children'> {
  indicator?: string;
  count?: number;
  message?: string;
  showMessage?: boolean;
  avatarsToDisplay?: number;
  users: ReadonlyArray<AvatarUser>;
}

const baseClass = `flex gap-8 items-center`;

const avatarsClasses = `flex items-center`;
const avatarClasses = `inline-flex select-none items-center justify-center overflow-hidden rounded-full align-middle size-sm lg:size-lg -mr-12 lg:-mr-18`;
const avatarImageClasses = `size-full rounded-[inherit] object-cover`;
const avatarFallbackClasses = `leading-1 flex size-full items-center justify-center bg-color-border-inverse text-base font-medium`;
const messageClasses = `flex gap-4 text-color-content-subtle text-sm`;
const indicatorClasses = ``;
const countClasses = ``;
const messageTextClasses = ``;

const abbreviateCount = (value: number): string => {
  if (value < 1_000) {
    return String(value);
  }

  if (value < 1_000_000) {
    return `${Math.round(value / 1_000)}k`;
  }

  if (value < 1_000_000_000) {
    return `${Math.round(value / 1_000_000)}m`;
  }

  return `${Math.round(value / 1_000_000_000)}b`;
};

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      indicator = '+',
      count: countProp,
      message: messageProp = 'others interested',
      showMessage = true,
      avatarsToDisplay = 4,
      users,
      className,
      ...rest
    },
    ref
  ) => {
    const trimmedIndicator = indicator.trim();
    const trimmedMessage = messageProp.trim();
    const effectiveCount = typeof countProp === 'number' ? countProp : users.length;
    const displayCount = Math.max(effectiveCount - users.length, 0);
    const abbreviatedCount = abbreviateCount(displayCount);

    void avatarsToDisplay;

    const rootClassName = composeClasses(baseClass, className);
    const avatarsClassName = composeClasses(avatarsClasses);
    const avatarClassName = composeClasses(avatarClasses);
    const avatarImageClassName = composeClasses(avatarImageClasses);
    const avatarFallbackClassName = composeClasses(avatarFallbackClasses);
    const messageClassName = composeClasses(messageClasses);
    const indicatorClassName = composeClasses(indicatorClasses);
    const countClassName = composeClasses(countClasses);
    const messageTextClassName = composeClasses(messageTextClasses);

    return (
      <div {...rest} ref={ref} className={rootClassName}>
        <div className={avatarsClassName} data-slot="avatars">
          {users.map((user, index) => {
            const { name, imageUrl } = user;
            const key = `${name}-${imageUrl}-${index}`;

            return (
              <Avatar.Root key={key} className={avatarClassName} data-slot="avatar">
                <Avatar.Image
                  className={avatarImageClassName}
                  data-slot="avatarImage"
                  src={imageUrl}
                  alt={name}
                />
                <Avatar.Fallback className={avatarFallbackClassName} data-slot="avatarFallback">
                  {name.charAt(0).toUpperCase() || ''}
                </Avatar.Fallback>
              </Avatar.Root>
            );
          })}
        </div>

        {showMessage ? (
          <div className={messageClassName} data-slot="message">
            <span className={indicatorClassName} data-slot="indicator">
              {trimmedIndicator}
            </span>
            <span className={countClassName} data-slot="count">
              {abbreviatedCount}
            </span>
            <span className={messageTextClassName} data-slot="messageText">
              {trimmedMessage}
            </span>
          </div>
        ) : null}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';
