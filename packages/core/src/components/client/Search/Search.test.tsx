// packages/core/src/components/Search/Search.test.tsx
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { Search, SearchProps, SearchResult } from './Search';

if (typeof window !== 'undefined' && !('PointerEvent' in window)) {
  class FakePointerEvent extends Event {
    constructor(type: string, eventInitDict?: EventInit) {
      super(type, eventInitDict);
    }
  }
  Object.defineProperty(window, 'PointerEvent', {
    value: FakePointerEvent,
    writable: false,
    configurable: true
  });
}

const sampleResults: SearchResult[] = [
  { id: '1', label: 'Concert hall', description: 'Downtown event space', type: 'venue' },
  { id: '2', label: 'Summer concert', description: 'Outdoor festival', type: 'event' }
];

const renderSearch = (props: Partial<SearchProps> = {}) => {
  const { onSearchTermChange = jest.fn(), onResultSelect = jest.fn(), results = [] } = props;

  return render(
    <Search
      {...props}
      results={results}
      onSearchTermChange={onSearchTermChange}
      onResultSelect={onResultSelect}
    />
  );
};

describe('Search', () => {
  it('does not render the popover content by default', () => {
    renderSearch({ results: [] });
    expect(screen.queryByRole('list')).toBeNull();
  });

  it('defaults the native input type to "search"', () => {
    renderSearch({ results: [] });
    const input = screen.getByRole<HTMLInputElement>('searchbox');
    expect(input.getAttribute('type')).toBe('search');
  });

  it('opens the popover when the input is focused and results exist', async () => {
    renderSearch({ results: sampleResults });
    fireEvent.focus(screen.getByRole('searchbox'));
    await waitFor(() => expect(screen.getByRole('list')).toBeInTheDocument());
  });

  describe('input change handling', () => {
    it('updates uncontrolled value and emits typed terms', async () => {
      const handleChange = jest.fn<void, [string]>();
      renderSearch({ defaultValue: '', results: [], onSearchTermChange: handleChange });

      const input = screen.getByRole<HTMLInputElement>('searchbox');
      const user = userEvent.setup();
      await user.type(input, 'a');

      expect({
        value: input.value,
        calls: handleChange.mock.calls.map(([term]: [string]) => term)
      }).toEqual({ value: 'a', calls: ['a'] });
    });

    it('honors controlled value while emitting updated terms', async () => {
      const handleChange = jest.fn();
      renderSearch({ value: 'hey', results: [], onSearchTermChange: handleChange });

      const input = screen.getByRole<HTMLInputElement>('searchbox');
      const user = userEvent.setup();
      await user.type(input, 'a');

      expect({
        value: input.value,
        calls: handleChange.mock.calls.map(([term]: [string]) => term)
      }).toEqual({ value: 'hey', calls: ['heya'] });
    });

    it('clears the value when Escape is pressed', async () => {
      const handleChange = jest.fn<void, [string]>();
      renderSearch({ defaultValue: 'clear-me', results: [], onSearchTermChange: handleChange });

      const input = screen.getByRole<HTMLInputElement>('searchbox');
      fireEvent.keyDown(input, { key: 'Escape' });

      await waitFor(() => expect(handleChange).toHaveBeenLastCalledWith(''));
      expect(input.value).toBe('');
    });

    it('respects external keydown handlers that prevent default', () => {
      const handleChange = jest.fn<void, [string]>();
      const externalKeyDown = jest.fn((event: React.KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();
      });

      renderSearch({
        defaultValue: 'stay-put',
        results: [],
        onSearchTermChange: handleChange,
        InputProps: { onKeyDown: externalKeyDown }
      });

      const input = screen.getByRole<HTMLInputElement>('searchbox');
      fireEvent.keyDown(input, { key: 'Escape' });

      expect(externalKeyDown).toHaveBeenCalled();
      expect(handleChange).not.toHaveBeenCalled();
      expect(input.value).toBe('stay-put');
    });

    it('forwards the native onFocus from InputProps', () => {
      const onFocusSpy = jest.fn<void, [React.FocusEvent<HTMLInputElement>]>();
      renderSearch({ results: [], InputProps: { onFocus: onFocusSpy } });

      const input = screen.getByRole<HTMLInputElement>('searchbox');
      fireEvent.focus(input);

      expect(onFocusSpy).toHaveBeenCalledTimes(1);
      const focusArg = onFocusSpy.mock.calls[0][0];
      expect(focusArg).toHaveProperty('nativeEvent');
    });

    it('keeps the popover open after clearing when results remain', async () => {
      const handleChange = jest.fn<void, [string]>();
      renderSearch({
        defaultValue: 'close',
        results: sampleResults,
        onSearchTermChange: handleChange
      });

      const input = screen.getByRole<HTMLInputElement>('searchbox');
      fireEvent.focus(input);
      await screen.findByRole('list');

      const user = userEvent.setup();
      await user.keyboard('{Escape}');

      await waitFor(() => expect(screen.getByRole('list')).toBeInTheDocument());
      expect(screen.getByRole('list').getAttribute('data-open')).toBe('true');
    });

    it('forwards the native onChange from InputProps', async () => {
      const nativeOnChange = jest.fn();
      const handleChange = jest.fn<void, [string]>();

      renderSearch({
        defaultValue: '',
        results: [],
        onSearchTermChange: handleChange,
        InputProps: { onChange: nativeOnChange }
      });

      const input = screen.getByRole<HTMLInputElement>('searchbox');
      const user = userEvent.setup();
      await user.type(input, 'x');

      // The Search component should call both: the native handler and our onSearchTermChange
      expect(nativeOnChange).toHaveBeenCalled();
      expect(handleChange).toHaveBeenLastCalledWith('x');
    });
  });

  describe('results list', () => {
    it('invokes onResultSelect with the exact result payload', async () => {
      const handleSelect = jest.fn<void, [SearchResult]>();
      renderSearch({ results: sampleResults, onResultSelect: handleSelect });

      fireEvent.focus(screen.getByRole('searchbox'));
      const user = userEvent.setup();
      const list = await screen.findByRole('list');
      const [firstResult] = within(list).getAllByRole('listitem');
      await user.click(firstResult);

      expect(handleSelect.mock.calls[0][0]).toEqual(sampleResults[0]);
    });

    it('does not refocus the input when selecting a link result', async () => {
      const handleSelect = jest.fn<void, [SearchResult]>();
      const linkResults: SearchResult[] = [
        {
          id: 'link-1',
          label: 'Linked result',
          type: 'event',
          href: 'https://example.com'
        }
      ];

      renderSearch({ results: linkResults, onResultSelect: handleSelect });

      const input = screen.getByRole<HTMLInputElement>('searchbox');
      fireEvent.focus(input);

      const user = userEvent.setup();
      const linkItem = await screen.findByRole('listitem');
      linkItem.addEventListener('click', event => event.preventDefault());
      await user.click(linkItem);

      expect(handleSelect).toHaveBeenCalledWith(linkResults[0]);
      expect(document.activeElement).not.toBe(input);
    });

    it.each<[SearchResult['type'] | undefined, string]>([
      ['venue', '139.22-679.41'],
      ['article', '170.87-135.87'],
      ['artist', '720-563.48'],
      ['guide', '600-135.63'],
      [undefined, '576.23-240']
    ])('renders expected default media icon for type %s', async (type, expectedPath) => {
      const results: SearchResult[] = [
        { id: `icon-${type ?? 'default'}`, label: 'Type under test', type }
      ];

      renderSearch({ results, onResultSelect: jest.fn() });
      fireEvent.focus(screen.getByRole('searchbox'));

      const iconWrapper = await screen.findByTestId('menu-item-media-icon');
      const path = iconWrapper.querySelector('path');
      expect(path?.getAttribute('d')).toContain(expectedPath);
    });

    it('renders a provided result icon when supplied', async () => {
      const customIcon = <span data-testid="custom-result-icon">CI</span>;
      renderSearch({
        results: [{ id: 'with-icon', label: 'Custom icon result', icon: customIcon }]
      });

      fireEvent.focus(screen.getByRole('searchbox'));

      const firstItem = await screen.findByRole('listitem');
      expect(within(firstItem).getByTestId('custom-result-icon')).toBeInTheDocument();
    });
  });

  describe('status slot', () => {
    it('marks the popover loading state when loading=true', async () => {
      renderSearch({ results: sampleResults, loading: true });
      fireEvent.focus(screen.getByRole('searchbox'));

      await waitFor(() =>
        expect(screen.getByRole('list').getAttribute('data-is-loading')).toBe('true')
      );
    });

    it('shows the empty message when no results remain', async () => {
      renderSearch({
        defaultValue: 'venue',
        results: [],
        loading: false,
        noResultsMessage: 'No results yet.'
      });

      fireEvent.focus(screen.getByRole('searchbox'));

      expect(await screen.findByText('No results yet.')).toBeInTheDocument();
    });

    it('does not render results while loading, even if stale entries are present', async () => {
      renderSearch({
        defaultValue: 'con',
        results: [{ id: 'stale', label: 'Stale item', type: 'event' }],
        loading: true
      });

      fireEvent.focus(screen.getByRole('searchbox'));

      await waitFor(() => expect(screen.getByRole('list')).toBeInTheDocument());
      expect(screen.queryAllByRole('listitem').length).toBe(0);
    });
  });

  describe('view all button', () => {
    it('renders interpolated label and emits the current term on click', async () => {
      const handleViewAll = jest.fn<void, [string]>();
      renderSearch({
        defaultValue: 'cafe',
        results: sampleResults,
        onViewAllClick: handleViewAll
      });

      fireEvent.focus(screen.getByRole('searchbox'));
      const user = userEvent.setup();
      const button = await screen.findByRole('button', {
        name: 'View all listings matching cafe'
      });
      await user.click(button);

      expect({
        text: button.textContent,
        term: handleViewAll.mock.calls[0][0]
      }).toEqual({
        text: 'View all listings matching cafe',
        term: 'cafe'
      });
    });

    it('uses the provided viewAllLabel when supplied', async () => {
      renderSearch({
        defaultValue: 'parks',
        results: sampleResults,
        viewAllLabel: 'See everything for {searchTerm} now',
        onViewAllClick: jest.fn()
      });

      fireEvent.focus(screen.getByRole('searchbox'));
      expect(
        await screen.findByRole('button', { name: 'See everything for parks now' })
      ).toBeInTheDocument();
    });

    it('closes the popover after clicking', async () => {
      const handleViewAll = jest.fn<void, [string]>();
      renderSearch({
        defaultValue: 'venues',
        results: sampleResults,
        onViewAllClick: handleViewAll
      });

      fireEvent.focus(screen.getByRole('searchbox'));
      const user = userEvent.setup();
      const button = await screen.findByRole('button', {
        name: 'View all listings matching venues'
      });

      await user.click(button);

      await waitFor(() => expect(screen.queryByRole('list')).toBeNull());
      expect(handleViewAll).toHaveBeenCalledWith('venues');
    });

    // The immediate focus is suppressed by the component; subsequent focus behavior is covered elsewhere.
  });

  describe('clear button', () => {
    it('notifies change handlers with an empty string', async () => {
      const handleChange = jest.fn();
      renderSearch({
        defaultValue: 'hall',
        results: sampleResults,
        onSearchTermChange: handleChange
      });

      fireEvent.focus(screen.getByRole('searchbox'));
      const user = userEvent.setup();
      await user.click(await screen.findByRole('button', { name: 'Clear search', hidden: true }));

      await waitFor(() => expect(handleChange).toHaveBeenLastCalledWith(''));
      const input = screen.getByRole<HTMLInputElement>('searchbox');
      expect(input.value).toBe('');
    });

    it('closes the popover after the clear button is used', async () => {
      renderSearch({
        defaultValue: 'hall',
        results: sampleResults,
        onSearchTermChange: jest.fn()
      });

      fireEvent.focus(screen.getByRole('searchbox'));
      const user = userEvent.setup();
      await user.click(await screen.findByRole('button', { name: 'Clear search', hidden: true }));

      await waitFor(() => expect(screen.queryByRole('list')).toBeNull());
    });

    it('renders a custom close icon when provided', async () => {
      renderSearch({
        defaultValue: 'text',
        results: sampleResults,
        closeIcon: <span data-testid="custom-close-icon">CC</span>
      });

      fireEvent.focus(screen.getByRole('searchbox'));
      expect(await screen.findByTestId('custom-close-icon')).toBeInTheDocument();
    });
  });

  describe('input adornments', () => {
    it('renders a custom start icon when provided via InputProps', () => {
      renderSearch({
        results: [],
        InputProps: {
          startIcon: <span data-testid="custom-start-icon">CS</span>
        }
      });

      expect(screen.getByTestId('custom-start-icon')).toBeInTheDocument();
    });
  });

  describe('focus management', () => {
    it('keeps the popover open when moving focus into the results', async () => {
      renderSearch({ defaultValue: 'city', results: sampleResults });

      const input = screen.getByRole<HTMLInputElement>('searchbox');
      fireEvent.focus(input);
      const list = await screen.findByRole('list');
      const firstItem = within(list).getAllByRole('listitem')[0];

      fireEvent.blur(input, { relatedTarget: firstItem });

      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('closes the popover when focus leaves the component', async () => {
      renderSearch({ defaultValue: 'city', results: sampleResults });

      const input = screen.getByRole<HTMLInputElement>('searchbox');
      fireEvent.focus(input);
      await screen.findByRole('list');

      const outside = document.createElement('button');
      document.body.appendChild(outside);

      fireEvent.blur(input, { relatedTarget: outside });

      await waitFor(() => expect(screen.queryByRole('list')).toBeNull());

      document.body.removeChild(outside);
    });
  });

  it('forwards the native onBlur from InputProps when focus leaves the component', async () => {
    const onBlurSpy = jest.fn<void, [React.FocusEvent<HTMLInputElement>]>();
    renderSearch({
      defaultValue: 'city',
      results: sampleResults,
      InputProps: { onBlur: onBlurSpy }
    });

    const input = screen.getByRole<HTMLInputElement>('searchbox');
    fireEvent.focus(input);
    await screen.findByRole('list');

    const outside = document.createElement('button');
    document.body.appendChild(outside);

    fireEvent.blur(input, { relatedTarget: outside });

    await waitFor(() => expect(screen.queryByRole('list')).toBeNull());
    expect(onBlurSpy).toHaveBeenCalledTimes(1);
    const blurArg = onBlurSpy.mock.calls[0][0];
    expect(blurArg).toHaveProperty('nativeEvent');

    document.body.removeChild(outside);
  });

  // Escape key behavior mirrors the clear button flow and is covered via that interaction.

  describe('accessibility', () => {
    it('exposes list and listitem roles for results', async () => {
      renderSearch({ results: sampleResults });
      fireEvent.focus(screen.getByRole('searchbox'));

      await waitFor(() =>
        expect(screen.getAllByRole('listitem').length).toBe(sampleResults.length)
      );
    });
  });
});

describe('view all button', () => {
  it('invokes the callback with the current term', async () => {
    const handleViewAll = jest.fn<void, [string]>();
    renderSearch({
      defaultValue: 'punk',
      results: sampleResults,
      onViewAllClick: handleViewAll
    });

    fireEvent.focus(screen.getByRole('searchbox'));
    const button = await screen.findByRole('button', {
      name: 'View all listings matching punk'
    });
    await userEvent.click(button);

    expect(handleViewAll).toHaveBeenLastCalledWith('punk');
  });
});
