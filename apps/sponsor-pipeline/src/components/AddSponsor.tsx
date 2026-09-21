import { useState } from 'react';
import { Dialog } from '@core/components/client/Dialog';
import { Button } from '@core/components/client/Button';
import { Input } from '@core/components/client/Input';
import { Select } from '@core/components/client/Select';
import { Textarea } from '@core/components/client/Textarea';
import { Heading } from '@core/components/server/Heading';
import { AddIcon } from '@core/icons';
import { OWNERS, TIERS } from '../data/sponsors';
import type { Sponsor, Tier } from '../data/types';

export function AddSponsor({ onAdd }: { onAdd: (s: Sponsor) => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [tier, setTier] = useState<Tier>('Silver');
  const [owner, setOwner] = useState<string>(OWNERS[0]);
  const [note, setNote] = useState('');
  const [touched, setTouched] = useState(false);

  const nameError = touched && !name.trim() ? 'Enter the sponsor name.' : undefined;

  const reset = () => {
    setName('');
    setContact('');
    setNote('');
    setTouched(false);
  };

  const submit = () => {
    setTouched(true);
    if (!name.trim()) return;
    onAdd({
      id: `s-${Date.now()}`,
      name: name.trim(),
      contact: contact.trim() || 'No contact yet',
      tier,
      stage: 'Prospect',
      value: TIERS.find(t => t.tier === tier)!.price,
      contract: 'Not started',
      payment: 'Not invoiced',
      lastActivityDaysAgo: 0,
      nextAction: { label: 'Send intro email and tier deck', dueInDays: 2, owner, waitingOn: 'us' },
      note: note.trim() || undefined
    });
    reset();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={o => {
        setOpen(o);
        if (!o) reset();
      }}
      size="sm"
      trigger={<Button startIcon={<AddIcon />}>Add sponsor</Button>}
    >
      <form
        className="flex flex-col gap-4"
        onSubmit={e => {
          e.preventDefault();
          submit();
        }}
        noValidate
      >
        <Heading as="h2" size="2xl" noMargin>
          Add sponsor
        </Heading>
        <Input label="Sponsor name" value={name} onChange={e => setName(e.target.value)} error={nameError} required />
        <Input label="Primary contact" value={contact} onChange={e => setContact(e.target.value)} />
        <Select
          value={tier}
          onValueChange={v => setTier(v as Tier)}
          InputProps={{ label: 'Tier', hint: 'Sets the default deal value.' }}
          options={TIERS.map(t => ({ option: t.tier, supportingText: `$${t.price.toLocaleString()}` }))}
        />
        <Select
          value={owner}
          onValueChange={setOwner}
          InputProps={{ label: 'Owner' }}
          options={OWNERS.map(o => ({ option: o }))}
        />
        <Textarea label="Note" value={note} onChange={e => setNote(e.target.value)} />
        <div className="flex gap-3">
          <Button type="submit">Add to pipeline</Button>
        </div>
      </form>
    </Dialog>
  );
}
