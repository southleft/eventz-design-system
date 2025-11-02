'use client';

import * as React from 'react';
import { Avatar } from 'radix-ui';
import { collapseWhitespace, composeClasses } from '../../../utilities';

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

const avatarsClasses = `flex items-center flex-row-reverse`;
const avatarClasses = `
  inline-flex select-none items-center justify-center overflow-hidden rounded-full align-middle
  w-24 lg:w-32 -mr-12 lg:-mr-18 border-color-border-inverse border
`;
const avatarImageClasses = `size-full rounded-[inherit] object-cover`;
const avatarFallbackClasses = `
  flex items-center justify-center overflow-hidden rounded-full bg-background-none text-base font-medium
  w-24 h-24 lg:w-32 lg:h-32 -mr-12 lg:-mr-18
`;
const messageClasses = `inline-flex gap-[4px] text-color-content-subtle text-sm ml-12 lg:ml-18`;
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
    const usersToShow = users.slice(0, avatarsToDisplay);
    const displayCount = Math.max(effectiveCount - usersToShow.length, 0);
    const abbreviatedCount = abbreviateCount(displayCount);

    void avatarsToDisplay;

    const rootClassName = collapseWhitespace(composeClasses(baseClass, className));
    const avatarsClassName = collapseWhitespace(composeClasses(avatarsClasses));
    const avatarClassName = collapseWhitespace(composeClasses(avatarClasses));
    const avatarImageClassName = collapseWhitespace(composeClasses(avatarImageClasses));
    const avatarFallbackClassName = collapseWhitespace(composeClasses(avatarFallbackClasses));
    const messageClassName = collapseWhitespace(composeClasses(messageClasses));
    const indicatorClassName = collapseWhitespace(composeClasses(indicatorClasses));
    const countClassName = collapseWhitespace(composeClasses(countClasses));
    const messageTextClassName = collapseWhitespace(composeClasses(messageTextClasses));

    return (
      <div {...rest} ref={ref} className={rootClassName}>
        <div className={avatarsClassName} data-slot="avatars">
          {usersToShow.reverse().map((user, index) => {
            const { name, imageUrl } = user;
            const trimmedName = name.trim();
            const trimmedImageUrl = imageUrl.trim();
            const key = `${trimmedName}-${trimmedImageUrl}-${index}`;

            return (
              <Avatar.Root key={key} className={avatarClassName} data-slot="avatar">
                <Avatar.Image
                  className={avatarImageClassName}
                  data-slot="avatarImage"
                  src={trimmedImageUrl}
                  alt={trimmedName}
                />
                <Avatar.Fallback
                  className={avatarFallbackClassName}
                  delayMs={600}
                  data-slot="avatarFallback"
                >
                  {trimmedName.charAt(0).toUpperCase()}
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
