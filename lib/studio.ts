import { DraftingCompass, HardHat, KeyRound, MessagesSquare } from 'lucide-react'

/* ------------------------------------------------------------------ *
 * How a commission runs, told from the client's side.
 *
 * The home page lists the same four stages as things we do. This is the
 * other half of each one: what lands on your desk when it ends, and what
 * you keep if you decide to stop there. Every stage is quoted and
 * invoiced on its own, which is what makes the exit line honest.
 * ------------------------------------------------------------------ */

export type JourneyStage = {
  icon: typeof KeyRound
  title: string
  duration: string
  copy: string
  /** What you are handed at the end of the stage. */
  deliverable: string
  /** What you walk away with if you stop right there. */
  exit: string
}

export const journey: JourneyStage[] = [
  {
    icon: MessagesSquare,
    title: 'We listen, then argue a bit',
    duration: 'Week one',
    copy: 'A long conversation about the site, the money and the people who will live with the result. We will disagree with something you have already decided, and say why, and then write it all down.',
    deliverable: 'A written brief and an honest first cost range',
    exit: 'you keep the brief, and it is worth taking to anyone',
  },
  {
    icon: DraftingCompass,
    title: 'We model far too many options',
    duration: 'Weeks two to four',
    copy: 'Parametric massing, daylight and airflow tested across hundreds of variations before anything is fixed. Most get thrown away. The three worth showing you arrive with the reasons attached.',
    deliverable: 'Three schemes, modelled, priced and compared',
    exit: 'you keep the drawings and the daylight study',
  },
  {
    icon: HardHat,
    title: 'We detail it with the makers',
    duration: 'Weeks five to fourteen',
    copy: 'Joints, tolerances and materials resolved with the people who will actually build them, because the details that fail in year eight are always the ones drawn generically and improvised on site.',
    deliverable: 'A full technical package and two real tenders',
    exit: 'you keep the package and can build it with anyone',
  },
  {
    icon: KeyRound,
    title: 'We stay until the last snag',
    duration: 'On site, then a year',
    copy: 'On site through construction, at handover with a maintenance plan written for whoever will actually use it, and back twelve months later with sensors to measure what we predicted.',
    deliverable: 'Keys, a four-page maintenance plan, a year-one report',
    exit: 'nothing to stop: this stage is the one you were paying for',
  },
]
