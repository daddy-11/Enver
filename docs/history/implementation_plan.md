# Implementation Plan - Real-time Collaboration Lounge

Remove the 2D Kumospace WASD virtual office and replace it with a high-fidelity, real-time collaboration space (Lounge Chat & Voice session panel) using the existing `useLounge` hook.

## User Review Required

> [!IMPORTANT]
> The tab layout is repurposed:
> - **Old `"kumo"` (Work/Lounge)** is replaced by `"lounge"` (**Operator Lounge** - the live real-time team chat & voice deck).
> - **Old `"lounge"` (Projects Area)** is renamed to `"projects"` (**Projects Area** - project boards and updates).
> 
> No structural data changes or database updates are required, as the `loungeRooms` and `loungeMessages` schemas and real-time Supabase integrations are already defined and configured.

## Proposed Changes

---

### UI & Core Dashboard

#### [MODIFY] [SanctuaryDashboard.tsx](file:///c:/Users/dbleg/OneDrive/Desktop/website/enveraitech-in/src/components/sections/SanctuaryDashboard.tsx)
- Repurpose `activeTab` states:
  - Default tab becomes `"lounge"`.
  - State definition is updated to include `"projects"` instead of `"kumo"`.
- Update Sidebar Navigation structure:
  - Repurpose `"kumo"` tab link to point to `"lounge"` (Label: "Operator Lounge", Icon: `Users`, Color: `#a855f7`).
  - Repurpose `"lounge"` tab link to point to `"projects"` (Label: "Projects Area", Icon: `FileText`, Color: `var(--orange)`).
- Replace the Kumospace rendering block (`activeTab === "kumo"`) with the new **Collaboration Lounge UI**:
  - **Connection HUD**: Displays tether connection state (`connected` from `useLounge`).
  - **Voice Deck**: Interactive panel allowing users to join the Google Meet call (`joinVoice` / `leaveVoice` / `inVoice`). Shows an active pulsing microphone visual when inside a voice session.
  - **Real-time Chat Feed**: Beautiful scrollable chat container displaying message history with user colors, custom avatars, and formatted time labels.
  - **Presence Sidebar**: Live list of active operators showing their name, avatar, and active voice status.
- Repurpose the `ProjectsArea` rendering block to display when `activeTab === "projects"`.

#### [DELETE] [VirtualOffice.tsx](file:///c:/Users/dbleg/OneDrive/Desktop/website/enveraitech-in/src/components/sections/VirtualOffice.tsx)
- Delete this file since the 2D WASD campus is removed.

#### [DELETE] [useMultiplayer.ts](file:///c:/Users/dbleg/OneDrive/Desktop/website/enveraitech-in/src/hooks/useMultiplayer.ts)
- Delete this file since it is only referenced by `VirtualOffice.tsx`.

## Verification Plan

### Automated Tests
- Build and run the Next.js development server:
  ```powershell
  cd enveraitech-in
  npm run dev
  ```
- Verify there are no TypeScript or compilation errors.

### Manual Verification
- Access the dashboard at `/dashboard`.
- Verify the landing view defaults to the new "Operator Lounge" rather than the Kumospace game.
- Test sending real-time chat messages to verify they are formatted correctly and scrolling operates smoothly.
- Test the "Join Voice Lounge" button to verify it links out to the meeting room.
- Verify that other pages (like Projects Area, Telemetry, and Atrea) load and function correctly.
