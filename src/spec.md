# Specification

## Summary
**Goal:** Make resume preview update live while editing and remove the manual “Submit to Preview” flow.

**Planned changes:**
- Remove the “Submit to Preview” button from the Resume Editor page, including removing the related Send icon usage and any instructional/help text that mentions submitting to see preview updates.
- Update the Resume Editor preview panel to render directly from the current in-progress (draft) resume data so it updates immediately as the user types across all sections, including repeatable sections.
- Ensure changing the selected resume font updates the preview immediately.
- Keep the existing skills/certifications editing behavior (local textarea while typing) while ensuring the preview reflects the stored draft updates (e.g., on blur and via keyword insertion).
- Update the Full Preview & Download (/preview) page to display the same current in-progress resume data as the editor preview, and ensure PDF downloads reflect that current data.
- Refactor/remove any state/store logic that relies on a separate “submitted resume” snapshot (including any submit-and-reset behavior) so preview rendering is driven by the draft/in-progress data, while keeping persisted data loading and rehydration working.

**User-visible outcome:** The resume preview updates automatically as the user edits any section (no submit step), and the /preview page and downloaded PDF always match the latest in-progress edits.
