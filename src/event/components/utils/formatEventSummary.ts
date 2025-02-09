// src/utils/formatEventSummary.ts

import { Impediment, SummaryPoint, ScrumEventSummaryResponse } from '../types';

/**
 * Formats the event summary data into hypertext with headings, paragraphs, and lists.
 * 
 * @param data - The ScrumEventSummaryResponse containing summary and impediments.
 * @returns A string of formatted hypertext.
 */
export const formatEventSummary = (data: ScrumEventSummaryResponse): string => {
  let formattedHtml = '';

  // Format summary section
  if (data.summary && data.summary.length > 0) {
    formattedHtml += '<h5>Notes Summary</h5>';
    data.summary.forEach((point: SummaryPoint) => {
      formattedHtml += `<h6>${point.title}</h6>`;
      if (point.points && point.points.length > 0) {
        formattedHtml += '<ul>';
        point.points.forEach((p) => {
          formattedHtml += `<li>${p}</li>`;
        });
        formattedHtml += '</ul>';
      }
    });
  }

  // Format impediments section
  if (data.impediments && data.impediments.length > 0) {
    formattedHtml += '<h5>Impediments</h5>';
    data.impediments.forEach((impediment: Impediment) => {
        formattedHtml += `<h6>${impediment.title}</h6>`;
        formattedHtml += `<p><strong>Type:</strong> ${impediment.type}</p>`;
        formattedHtml += `<p>${impediment.description}</p>`;
    });
  }

  return formattedHtml;
}
