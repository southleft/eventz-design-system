import '@testing-library/jest-dom';
import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { RenderResult } from '@testing-library/react';
import { InfoPopover } from './InfoPopover';

describe('InfoPopover', () => {
  it('renders a trigger button with the provided aria-label', () => {
    const view: RenderResult = render(
      <InfoPopover ariaLabel="Learn more">Popover content</InfoPopover>
    );
    expect(screen.getByRole('button', { name: 'Learn more' })).toBeInTheDocument();
    view.unmount();
  });

  it('renders the trigger as a type="button"', () => {
    const view: RenderResult = render(
      <InfoPopover ariaLabel="Inspect type">Check trigger type</InfoPopover>
    );
    const trigger = screen.getByRole('button', { name: 'Inspect type' });
    expect(trigger).toHaveAttribute('type', 'button');
    view.unmount();
  });

  it('reveals content when the trigger is clicked', async () => {
    const user = userEvent.setup();
    const view: RenderResult = render(
      <InfoPopover ariaLabel="More info" side="right" sideOffset={12}>
        Helpful guidance lives here.
      </InfoPopover>
    );
    await user.click(screen.getByRole('button', { name: 'More info' }));
    expect(await screen.findByText('Helpful guidance lives here.')).toBeVisible();
    view.unmount();
  });

  it('closes on Escape and restores focus to the trigger', async () => {
    const user = userEvent.setup();
    const view: RenderResult = render(
      <InfoPopover ariaLabel="Help text">Content to dismiss</InfoPopover>
    );
    const trigger = screen.getByRole('button', { name: 'Help text' });
    await user.click(trigger);
    await screen.findByText('Content to dismiss');
    await user.keyboard('{Escape}');
    await waitFor(() => {
      const result = {
        content: screen.queryByText('Content to dismiss'),
        active: document.activeElement
      };
      expect(result).toEqual({ content: null, active: trigger });
    });
    view.unmount();
  });

  it('invokes onOpenChange(true) when opening', async () => {
    const handleOpenChange = jest.fn<void, [boolean]>();
    const user = userEvent.setup();
    const view: RenderResult = render(
      <InfoPopover ariaLabel="Open change" onOpenChange={handleOpenChange}>
        Toggle me
      </InfoPopover>
    );
    const trigger = screen.getByRole('button', { name: 'Open change' });
    await user.click(trigger);
    await screen.findByText('Toggle me');
    await waitFor(() => {
      expect(handleOpenChange).toHaveBeenLastCalledWith(true);
    });
    view.unmount();
  });

  it('invokes onOpenChange(false) when closing with Escape', async () => {
    const handleOpenChange = jest.fn<void, [boolean]>();
    const user = userEvent.setup();
    const view: RenderResult = render(
      <InfoPopover ariaLabel="Open change" onOpenChange={handleOpenChange}>
        Toggle me
      </InfoPopover>
    );
    const trigger = screen.getByRole('button', { name: 'Open change' });
    await user.click(trigger);
    await screen.findByText('Toggle me');
    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(handleOpenChange).toHaveBeenLastCalledWith(false);
    });
    view.unmount();
  });

  it('applies the provided contentId to the content element', async () => {
    const user = userEvent.setup();
    const view: RenderResult = render(
      <InfoPopover ariaLabel="Has id" contentId="custom-info-id">
        Content with custom id
      </InfoPopover>
    );
    await user.click(screen.getByRole('button', { name: 'Has id' }));
    const content = await screen.findByText('Content with custom id');
    expect(content).toHaveAttribute('id', 'custom-info-id');
    view.unmount();
  });

  it('marks the trigger icon as decorative', () => {
    const view: RenderResult = render(
      <InfoPopover ariaLabel="Inspect icon">Icon only popover</InfoPopover>
    );
    const trigger = screen.getByRole('button', { name: 'Inspect icon' });
    const icon = trigger.querySelector('svg') as SVGSVGElement;
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    view.unmount();
  });

  it('applies the focus ring token classes to the trigger', () => {
    const view: RenderResult = render(
      <InfoPopover ariaLabel="Focus check">Focus ring popover</InfoPopover>
    );
    const trigger = screen.getByRole('button', { name: 'Focus check' });
    expect(trigger.className).toMatch(/focus-visible:ring-comp-border-focus-ring/);
    view.unmount();
  });

  it('uses default placement props when none are provided', async () => {
    const user = userEvent.setup();
    const view: RenderResult = render(
      <InfoPopover ariaLabel="Placement">Default placement content</InfoPopover>
    );
    await user.click(screen.getByRole('button', { name: 'Placement' }));
    const content = await screen.findByText('Default placement content');
    expect(content.getAttribute('data-side')).toBe('top');
    view.unmount();
  });
});
