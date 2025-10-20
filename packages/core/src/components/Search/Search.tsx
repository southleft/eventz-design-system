import * as React from 'react';
import { Popover } from 'radix-ui';
import {
  AnimatedCircularProgressIcon,
  ArtistIcon,
  CloseIcon,
  EventIcon,
  MapIcon,
  NewsmodeIcon,
  SearchIcon,
  StadiumIcon
} from '../../icons';
import { collapseWhitespace, composeClasses } from '../../utilities';
import { Input, InputProps } from '../Input';
import { Button } from '../Button';
import { MenuItem } from '../MenuItem';

const inputClasses = `min-w-480`;

const resultsClasses = `
  inline-flex flex-col justify-center p-4 rounded-sm border overflow-hidden
  border-color-border-subtle bg-color-background-default content-center -ml-[31px] mt-6
`;

const resultsStateClasses = `
  data-[is-loading=true]:h-48 data-[no-results=true]:h-48 data-[no-results=true]:items-center
`;

const statusClasses = `
  inline-block w-full text-center text-sm text-color-content-weak
`;

const viewAllRowClasses = `
  inline-flex w-full justify-end
`;

const closeIconClasses = `
inline-flex h-20 w-20 items-center justify-center rounded-full border-0 bg-background-none text-color-content-default hover:bg-color-background-default-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-comp-border-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-color-background-default
`;

type SearchResultType = 'venue' | 'article' | 'event' | 'artist' | 'guide';

type SearchBaseAttributes = Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'results'>;

export type SearchResult = {
  id: string;
  label: string;
  description?: string;
  href?: string;
  icon?: React.ReactNode;
  type?: SearchResultType | (string & {});
};

type InputPassthroughProps = Omit<
  InputProps,
  'value' | 'defaultValue' | 'startIcon' | 'endIcon'
> & {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

export interface SearchProps extends SearchBaseAttributes {
  value?: string;
  defaultValue?: string;
  onSearchTermChange: (term: string) => void;
  results: SearchResult[];
  onResultSelect: (result: SearchResult) => void;
  onViewAllClick?: (term: string) => void;
  placeholder?: string;
  loading?: boolean;
  noResultsMessage?: string;
  InputProps?: InputPassthroughProps;
  closeIcon?: React.ReactNode;
  viewAllLabel?: string;
}

const defaultViewAllLabel = 'View all listings matching {searchTerm}';

function getDefaultIconForType(type?: SearchResult['type']): React.ReactNode {
  switch (type) {
    case 'venue':
      return <StadiumIcon aria-hidden="true" />;
    case 'article':
      return <NewsmodeIcon aria-hidden="true" />;
    case 'artist':
      return <ArtistIcon aria-hidden="true" />;
    case 'guide':
      return <MapIcon aria-hidden="true" />;
    case 'event':
    default:
      return <EventIcon aria-hidden="true" />;
  }
}

export const Search = ({
  value,
  defaultValue,
  onSearchTermChange,
  results,
  onResultSelect,
  onViewAllClick,
  placeholder = 'Search…',
  loading = false,
  noResultsMessage,
  InputProps: inputPropsOverride,
  closeIcon,
  viewAllLabel = defaultViewAllLabel
}: SearchProps) => {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string>(defaultValue ?? '');

  const searchTerm = value ?? uncontrolledValue;
  const trimmedSearchTerm = searchTerm.trim();
  const trimmedNoResultsMessage = noResultsMessage?.trim() ?? '';
  const hasNoResultsMessage = trimmedNoResultsMessage.length > 0;
  const hasResults = results.length > 0;
  const hasSearchTerm = trimmedSearchTerm.length > 0;
  const shouldShowEmptyMessage = hasSearchTerm && !loading && !hasResults && hasNoResultsMessage;
  const shouldShowStatus = loading || shouldShowEmptyMessage;
  const showResults = !loading && hasResults;
  const showViewAll = showResults && Boolean(onViewAllClick);

  const [isFocused, setIsFocused] = React.useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const popoverContentRef = React.useRef<HTMLDivElement | null>(null);
  const suppressNextFocusOpenRef = React.useRef(false);

  const hasOpenReason = loading || hasResults || shouldShowEmptyMessage;
  const popoverOpen = isPopoverOpen && hasOpenReason;

  React.useEffect(() => {
    if (!hasOpenReason) {
      setIsPopoverOpen(false);
    }
  }, [hasOpenReason]);

  const {
    startIcon: inputStartIcon,
    endIcon: inputEndIcon,
    onFocus: inputOnFocus,
    onBlur: inputOnBlur,
    onChange: inputOnChange,
    onKeyDown: inputOnKeyDown,
    type: inputType = 'search',
    ...restInputProps
  } = inputPropsOverride ?? {};

  const inputClassName = collapseWhitespace(composeClasses(inputClasses));
  const resultsClassName = collapseWhitespace(composeClasses(resultsClasses, resultsStateClasses));
  const statusClassName = collapseWhitespace(composeClasses(statusClasses));
  const viewAllRowClassName = collapseWhitespace(composeClasses(viewAllRowClasses));
  const closeIconClassName = collapseWhitespace(composeClasses(closeIconClasses));

  const handleInputFocus = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (!suppressNextFocusOpenRef.current) {
        setIsPopoverOpen(true);
      }
      suppressNextFocusOpenRef.current = false;
      inputOnFocus?.(event);
    },
    [inputOnFocus]
  );

  const handleInputBlur = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      const nextEl = event.relatedTarget as HTMLElement | null;
      if (nextEl!.closest('[data-popover-content="true"]')) {
        return;
      }

      setIsFocused(false);
      setIsPopoverOpen(false);
      inputOnBlur?.(event);
    },
    [inputOnBlur]
  );

  const handleSearchTermChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value;

      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }

      suppressNextFocusOpenRef.current = false;
      setIsPopoverOpen(true);
      onSearchTermChange(nextValue);
      inputOnChange?.(event);
    },
    [inputOnChange, isControlled, onSearchTermChange]
  );

  const focusInput = React.useCallback(() => {
    inputRef.current!.focus();
  }, []);

  const clearSearch = React.useCallback(() => {
    // Reset the internal uncontrolled value (safe in controlled mode; the prop drives the input)
    setUncontrolledValue('');

    setIsFocused(false);
    setIsPopoverOpen(false);
    suppressNextFocusOpenRef.current = true;
    onSearchTermChange('');
    focusInput();
  }, [focusInput, onSearchTermChange]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      inputOnKeyDown?.(event);
      if (event.defaultPrevented) {
        return;
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        clearSearch();
      }
    },
    [clearSearch, inputOnKeyDown]
  );

  const handleClearClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      clearSearch();
    },
    [clearSearch]
  );

  const handleResultActivation = React.useCallback(
    (result: SearchResult) => {
      onResultSelect(result);
      setIsPopoverOpen(false);
      suppressNextFocusOpenRef.current = true;

      if (result.href) {
        setIsFocused(false);
        return;
      }

      setIsFocused(false);
      focusInput();
    },
    [focusInput, onResultSelect]
  );

  const handleViewAllClick = React.useCallback(() => {
    onViewAllClick!(searchTerm);
    setIsFocused(false);
    setIsPopoverOpen(false);
  }, [onViewAllClick, searchTerm]);

  const statusContent = loading ? (
    <AnimatedCircularProgressIcon aria-hidden="true" />
  ) : shouldShowEmptyMessage ? (
    trimmedNoResultsMessage
  ) : null;

  const renderedViewAllLabel = viewAllLabel.replace('{searchTerm}', searchTerm);

  const defaultStartIcon = inputStartIcon ?? <SearchIcon aria-hidden="true" />;

  const shouldRenderClearButton = searchTerm.length > 0;

  const endIconContent = shouldRenderClearButton ? (
    <button
      className={closeIconClassName}
      type="button"
      aria-label="Clear search"
      onClick={handleClearClick}
    >
      {
        (closeIcon ?? (
          <CloseIcon className="text-color-content-default" aria-hidden="true" />
        )) as React.ReactNode
      }
    </button>
  ) : (
    inputEndIcon
  );

  const renderMenuItem = (result: SearchResult): React.ReactNode => {
    const mediaIcon = result.icon ?? getDefaultIconForType(result.type);

    return (
      <MenuItem
        key={result.id}
        type="complex"
        option={result.label}
        borderBottom={false}
        supportingText={result.description}
        mediaIcon={mediaIcon}
        href={result.href}
        role="listitem"
        onClick={() => handleResultActivation(result)}
      />
    );
  };

  return (
    <Popover.Root open={popoverOpen}>
      <Popover.Anchor asChild className={inputClassName}>
        <Input
          {...restInputProps}
          ref={inputRef}
          value={searchTerm}
          placeholder={placeholder}
          type={inputType}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={handleSearchTermChange}
          onKeyDown={handleKeyDown}
          startIcon={defaultStartIcon}
          endIcon={endIconContent}
        />
      </Popover.Anchor>
      <Popover.Portal>
        <Popover.Content
          ref={popoverContentRef}
          className={resultsClassName}
          sideOffset={8}
          align="start"
          role="list"
          data-is-loading={loading ? 'true' : undefined}
          data-no-results={shouldShowEmptyMessage ? 'true' : undefined}
          data-focused={isFocused ? 'true' : undefined}
          data-open={popoverOpen ? 'true' : undefined}
          data-popover-content="true"
          onOpenAutoFocus={event => event.preventDefault()}
          style={{ minWidth: 'calc(var(--radix-popper-anchor-width) + var(--portal-extra-width))' }}
        >
          {showResults ? results.map(result => renderMenuItem(result)) : null}

          {shouldShowStatus ? (
            <div className={statusClassName} aria-live="polite" data-slot="status">
              {statusContent}
            </div>
          ) : null}

          {showViewAll ? (
            <div className={viewAllRowClassName}>
              <Button variant="secondary" onClick={handleViewAllClick}>
                {renderedViewAllLabel}
              </Button>
            </div>
          ) : null}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

Search.displayName = 'Search';
