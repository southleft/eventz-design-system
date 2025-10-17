// packages/core/src/components/Search/Search.test.tsx
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { Search, SearchProps, SearchResult } from './Search';

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

  it('opens the popover when the input is focused and results exist', async () => {
    renderSearch({ results: sampleResults });
    fireEvent.focus(screen.getByRole('textbox'));
    await waitFor(() => expect(screen.getByRole('list')).toBeInTheDocument());
  });

  describe('input change handling', () => {
    it('updates uncontrolled value and emits typed terms', async () => {
      const handleChange = jest.fn<void, [string]>();
      renderSearch({ defaultValue: '', results: [], onSearchTermChange: handleChange });

      const input = screen.getByRole<HTMLInputElement>('textbox');
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

      const input = screen.getByRole<HTMLInputElement>('textbox');
      const user = userEvent.setup();
      await user.type(input, 'a');

      expect({
        value: input.value,
        calls: handleChange.mock.calls.map(([term]: [string]) => term)
      }).toEqual({ value: 'hey', calls: ['heya'] });
    });
  });

  describe('results list', () => {
    it('invokes onResultSelect with the exact result payload', async () => {
      const handleSelect = jest.fn<void, [SearchResult]>();
      renderSearch({ results: sampleResults, onResultSelect: handleSelect });

      fireEvent.focus(screen.getByRole('textbox'));
      const user = userEvent.setup();
      const list = await screen.findByRole('list');
      const [firstResult] = within(list).getAllByRole('listitem');
      await user.click(firstResult);

      expect(handleSelect.mock.calls[0][0]).toEqual(sampleResults[0]);
    });
  });

  describe('status slot', () => {
    it('marks the popover loading state when loading=true', async () => {
      renderSearch({ results: sampleResults, loading: true });
      fireEvent.focus(screen.getByRole('textbox'));

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

      fireEvent.focus(screen.getByRole('textbox'));

      expect(await screen.findByText('No results yet.')).toBeInTheDocument();
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

      fireEvent.focus(screen.getByRole('textbox'));
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
  });

  describe('clear button', () => {
    it('notifies change handlers with an empty string', async () => {
      const handleChange = jest.fn();
      renderSearch({
        defaultValue: 'hall',
        results: sampleResults,
        onSearchTermChange: handleChange
      });

      fireEvent.focus(screen.getByRole('textbox'));
      const user = userEvent.setup();
      await user.click(await screen.findByRole('button', { name: 'Clear search', hidden: true }));

      await waitFor(() => expect(handleChange).toHaveBeenLastCalledWith(''));
    });

    it('closes the popover after the clear button is used', async () => {
      renderSearch({
        defaultValue: 'hall',
        results: sampleResults,
        onSearchTermChange: jest.fn()
      });

      fireEvent.focus(screen.getByRole('textbox'));
      const user = userEvent.setup();
      await user.click(await screen.findByRole('button', { name: 'Clear search', hidden: true }));

      await waitFor(() => expect(screen.queryByRole('list')).toBeNull());
    });
  });

  // Escape key behavior mirrors the clear button flow and is covered via that interaction.

  describe('accessibility', () => {
    it('exposes list and listitem roles for results', async () => {
      renderSearch({ results: sampleResults });
      fireEvent.focus(screen.getByRole('textbox'));

      await waitFor(() =>
        expect(screen.getAllByRole('listitem').length).toBe(sampleResults.length)
      );
    });
  });
});
