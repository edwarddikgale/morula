import React, { useState } from 'react';
import { AgilePattern } from '../types';

interface AgilePatternFormProps {
  pattern?: AgilePattern; // If editing an existing pattern
  onSubmit: (pattern: AgilePattern) => void; // Callback to handle form submission
  onCancel: () => void;
}

const AgilePatternForm: React.FC<AgilePatternFormProps> = ({ pattern, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(pattern?.title || '');
  const [key, setKey] = useState(pattern?.key || 'unknown');
  const [eventType, setEventType] = useState(pattern?.eventType || 'other');
  const [description, setDescription] = useState(pattern?.description || '');
  const [type, setType] = useState<'anti-pattern' | 'design-pattern'>(pattern?.type || 'design-pattern');
  const [tags, setTags] = useState(pattern?.tags.join(', ') || '');
  const [artifact, setArtifact] = useState(pattern?.artifact || 'product-backlog');
  const [agilePrinciples, setAgilePrinciples] = useState(pattern?.agilePrinciples.join(', ') || '');
  const [scrumValues, setScrumValues] = useState(pattern?.scrumValues.join(', ') || '');
  const [scrumPillars, setScrumPillars] = useState(pattern?.scrumPillars.join(', ') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPattern: AgilePattern = {
      id: pattern?.id || Date.now().toString(),
      title,
      key,
      eventType,
      description,
      type,
      tags: tags.split(',').map(tag => tag.trim()),
      artifact,
      agilePrinciples: agilePrinciples.split(',').map(principle => principle.trim()),
      scrumValues: scrumValues.split(',').map(value => value.trim()),
      scrumPillars: scrumPillars.split(',').map(pillar => pillar.trim()),
      selected: true,
      subject: pattern?.subject || ''
    };
    onSubmit(newPattern);
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4">
      <h4>{pattern ? 'Edit Agile Pattern' : 'Create Agile Pattern'}</h4>

      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Type</label>
        <select
          className="form-select"
          value={type}
          onChange={(e) => setType(e.target.value as 'anti-pattern' | 'design-pattern')}
        >
          <option value="anti-pattern">Anti-Pattern</option>
          <option value="design-pattern">Design Pattern</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Tags (comma-separated)</label>
        <input
          type="text"
          className="form-control"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Artifact</label>
        <select
          className="form-select"
          value={artifact}
          onChange={(e) => setArtifact(e.target.value as 'product-backlog' | 'sprint-backlog' | 'increment')}
        >
          <option value="product-backlog">Product Backlog</option>
          <option value="sprint-backlog">Sprint Backlog</option>
          <option value="increment">Increment</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Agile Principles (comma-separated)</label>
        <input
          type="text"
          className="form-control"
          value={agilePrinciples}
          onChange={(e) => setAgilePrinciples(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Scrum Values (comma-separated)</label>
        <input
          type="text"
          className="form-control"
          value={scrumValues}
          onChange={(e) => setScrumValues(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Scrum Pillars (comma-separated)</label>
        <input
          type="text"
          className="form-control"
          value={scrumPillars}
          onChange={(e) => setScrumPillars(e.target.value)}
        />
      </div>

      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-primary">
          {pattern ? 'Update Agile Pattern' : 'Create Agile Pattern'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AgilePatternForm;
